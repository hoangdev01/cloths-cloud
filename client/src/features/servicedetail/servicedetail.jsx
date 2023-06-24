import React, { useEffect, useState, useContext } from 'react';
import ImageSlider from '../servicedetail/slide/index.jsx';
import { SliderDataDefault } from './slide/slidedata.jsx';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { RiGuideFill, RiLeafLine } from 'react-icons/ri';
import { BiMinus } from 'react-icons/bi';
import { BiPlus } from 'react-icons/bi';
import { MdCheckCircle } from 'react-icons/md';
import style from './style.css';
import CartApi from '../../api/cartApi.js';
import FBComment from '../../components/social/FbComment.jsx';
import serviceAPI from '../../api/serviceApi.js';
import { Card, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { virtual_url, mediaUrl } from '../../api/constants.js';

import {
  Box,
  Container,
  Stack,
  Text,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Flex,
} from '@chakra-ui/react';
import { InputNumber, message } from 'antd';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const { Dragger } = Upload;

const handleMouseDown = e => {
  e.preventDefault(); // Ngăn chặn việc chọn văn bản
};

const handleFocus = e => {
  e.target.blur(); // Xóa focus khỏi button để ngăn chặn việc chọn văn bản
};

const ServiceDetail = () => {
  const slug = useParams().slug;
  const [id, setId] = useState('');
  const [service, setService] = useState();
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState();
  const [colors, setColors] = useState([]);
  const [slideData, setSlideData] = useState([]);
  const [sizes, setSizes] = useState([]);

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [amount, setAmount] = useState(0);
  const [selectAmount, setSelectAmount] = useState(0);
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSelectAmountChange = newValue => {
    setSelectAmount(newValue);
  };
  const [cart, setCart] = useState([]);

  const handleUpload = async (info, onSuccess, onError) => {
    const image = service.images.find(image => image.is_avatar);
    if (!image) {
      message.warning('This product has no pictures yet');
      return;
    }
    const formData = new FormData();
    formData.append('file', info);
    formData.append('cloth', image.name);
    formData.append('serviceId', service.id);
    console.log(info);

    try {
      serviceAPI.mergeImage(formData).then(res => {
        message.success('Image sent, result will send for you soon!');
        onSuccess();
      });
      console.log('formData');
    } catch (error) {
      onError(error);
    }
  };

  const draggerProps = {
    name: 'file',
    multiple: false,
    showUploadList: false,
    method: 'post',
  };

  useEffect(() => {
    serviceAPI
      .getService(slug)
      .then(res => {
        const service = res.data.service;
        setId(service.id);
        setService(service);
        setName(service.name);
        setPrice(service.price);
        setDescription(service.description);
        setTitle(service.title);
        // setGuide(service.guide);
        const listSlideData = service.images.map(img => ({
          image: `${mediaUrl}/${img.name}`,
        }));
        const listSizeData = service.instances.map(instance => instance.size);
        const listColorData = service.instances.map(instance => instance.color);
        setSlideData(!listSlideData.length ? SliderDataDefault : listSlideData);
        // console.log(listSlideData);
        setSizes([...new Set(listSizeData)] || []);
        setColors([...new Set(listColorData)] || []);

        calculateTotalAge();
      })
      .catch(err => {
        console.log(err);
      });
    CartApi.getAll().then(res => {
      setCart(res.data.listCart);
    });
  }, [selectedSize, selectedColor]);

  const handleSizeSelection = size => {
    setSelectedSize(size == selectedSize ? null : size);
  };

  const handleColorSelection = color => {
    setSelectedColor(color == selectedColor ? null : color);
  };

  let [show, setShow] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    serviceAPI
      .getService(slug)
      .then(res => {
        const service = res.data.service;
        setId(service.id);
        setService(service);
        setName(service.name);
        setPrice(service.price);
        setDescription(service.description);
        setTitle(service.title);
        // setGuide(service.guide);
        const listSlideData = service.images.map(img => ({
          image: `${mediaUrl}/${img.name}`,
        }));
        const listSizeData = service.instances.map(instance => instance.size);
        const listColorData = service.instances.map(instance => instance.color);
        setSlideData(!listSlideData.length ? SliderDataDefault : listSlideData);
        // console.log(listSlideData);
        setSizes([...new Set(listSizeData)] || []);
        setColors([...new Set(listColorData)] || []);
        setAmount(
          service.instances.reduce((sum, item) => {
            return sum + (item.amount || 0);
          }, 0)
        );
      })
      .catch(err => {
        console.log(err);
      });
    CartApi.getAll().then(res => {
      setCart(res.data.listCart);
    });
  }, []);

  const calculateTotalAge = () => {
    if (!service || !service.instances) {
      setAmount(0);
      return;
    }
    const total = service.instances.reduce((sum, item) => {
      // Kiểm tra nếu gender và address đều không null
      if (selectedSize !== null && selectedColor !== null) {
        if (item.size === selectedSize && item.color === selectedColor) {
          return sum + (item.amount || 0);
        }
      }
      // Kiểm tra nếu chỉ gender null
      else if (selectedSize === null && selectedColor !== null) {
        if (item.color === selectedColor) {
          return sum + (item.amount || 0);
        }
      }
      // Kiểm tra nếu chỉ address null
      else if (selectedSize !== null && selectedColor === null) {
        if (item.size === selectedSize) {
          return sum + (item.amount || 0);
        }
      }
      // Kiểm tra nếu cả gender và address đều null
      else {
        return sum + (item.amount || 0);
      }

      return sum;
    }, 0);

    setAmount(total);
  };

  const handleClick = () => {
    if (!amount) {
      message.warning('The product is no longer available or may not exist');
      setShow(false);
      return;
    }

    if (!selectedColor || !selectedSize) {
      message.warning('Please select Category');
      setShow(false);
      return;
    }

    if (!selectAmount) {
      message.warning('Please select product quantity');
      setShow(false);
      return;
    }

    if (selectAmount > amount) {
      message.warning(
        'The product does not meet the quantity you have selected'
      );
      setShow(false);
      return;
    }

    const instance = service
      ? service.instances.find(
          instance =>
            instance.color === selectedColor && instance.size === selectedSize
        )
      : null;

    let instanceInCart = null;

    if (cart) {
      for (let item of cart) {
        instanceInCart =
          item.instance &&
          item.instance.id == instance.id &&
          item.instance.color == selectedColor &&
          item.instance.size == selectedSize
            ? item
            : null;
        if (instanceInCart) break;
      }
    }

    if (instanceInCart && amount < selectAmount + instanceInCart.amount) {
      message.warning('The selected product exceeds the available quantity');
      setShow(false);
      return;
    }

    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const formatNumber = value => `${value}`;

  const parseNumber = value => parseInt(value, 10);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate('/sign-in');
      return;
    }

    const instance = service
      ? service.instances.find(
          instance =>
            instance.color === selectedColor && instance.size === selectedSize
        )
      : null;

    const cartService = {
      amount: selectAmount,
      instanceId: instance.id,
    };

    CartApi.addCart(cartService)
      .then(response => {
        if (response.data.success) {
          message.success('Added service to cart');
          CartApi.getAll().then(res => {
            setCart(res.data.listCart);
          });
        } else message.error('Add service to cart fail');
      })
      .catch(err => {
        console.log(err);
      });
    setShow(false);
  };
  const colorModeValue = useColorModeValue('yellow.500', 'yellow.300');

  return (
    <Container maxW={'7xl'}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        pt={{ base: 0, md: 0 }}
      >
        <Flex>
          <ImageSlider slides={slideData}> </ImageSlider>
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={'header'}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
            >
              {name}
            </Heading>
            <br></br>
            <Text
              color={useColorModeValue('gray.900', 'gray.400')}
              fontWeight={300}
              fontSize={'2xl'}
            >
              {price
                ? price.toLocaleString('it-IT', {
                    style: 'currency',
                    currency: 'USD',
                  })
                : price}
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={'column'}
            divider={
              <StackDivider
                borderColor={useColorModeValue('gray.200', 'gray.600')}
              />
            }
          >
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text
                color={useColorModeValue('gray.500', 'gray.400')}
                fontSize={'2xl'}
                fontWeight={'300'}
                width={'100%'}
                textAlign="justify"
              >
                {title}
              </Text>
              <Text fontSize={'lg'} width={'100%'}>
                {description}
              </Text>
            </VStack>
            <Box display="flex" flexDirection="row">
              {sizes.length != 0 ? (
                <Box flexBasis="50%">
                  <Text
                    fontSize={{ base: '16px', lg: '18px' }}
                    color={colorModeValue}
                    fontWeight={'500'}
                    textTransform={'uppercase'}
                    mb={'4'}
                  >
                    Size
                  </Text>

                  <Box display="flex" flexDirection="row">
                    {sizes.map(size => (
                      <Box
                        key={size}
                        width="40px"
                        height="40px"
                        backgroundColor={
                          selectedSize === size ? 'midnightblue' : 'white'
                        }
                        color={selectedSize === size ? 'white' : 'midnightblue'}
                        border={
                          selectedSize === size
                            ? '0px'
                            : '1px solid midnightblue'
                        }
                        borderRadius="md"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        cursor="pointer"
                        onClick={() => handleSizeSelection(size)}
                        onMouseDown={handleMouseDown}
                        onFocus={handleFocus}
                        marginRight="10px"
                        _hover={{
                          transform: 'scale(1.1)',
                          transition: 'transform 0.1s',
                        }}
                      >
                        <span>{size}</span>
                      </Box>
                    ))}
                  </Box>
                </Box>
              ) : null}
              {colors.length != 0 ? (
                <Box flexBasis="50%" isOpen={colors != []}>
                  <Text
                    fontSize={{ base: '16px', lg: '18px' }}
                    color={colorModeValue}
                    fontWeight={'500'}
                    textTransform={'uppercase'}
                    mb={'4'}
                  >
                    Color
                  </Text>

                  <Box display="flex" flexDirection="row">
                    {colors.map(color => (
                      <Box
                        key={color}
                        width="40px"
                        height="40px"
                        backgroundColor={
                          selectedColor === color ? 'midnightblue' : 'white'
                        }
                        color={
                          selectedColor === color ? 'white' : 'midnightblue'
                        }
                        border={
                          selectedColor === color
                            ? '0px'
                            : '1px solid midnightblue'
                        }
                        borderRadius="md"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        cursor="pointer"
                        onClick={() => handleColorSelection(color)}
                        onMouseDown={handleMouseDown}
                        onFocus={handleFocus}
                        marginRight="10px"
                        _hover={{
                          transform: 'scale(1.1)',
                          transition: 'transform 0.1s',
                        }}
                      >
                        <span>{color}</span>
                      </Box>
                    ))}
                  </Box>
                </Box>
              ) : null}
            </Box>
          </Stack>

          <Box display="flex" flexDirection="row">
            <InputNumber
              name="select-amount"
              h={'10px'}
              max={amount}
              min={0}
              flexBasis={'70%'}
              formatter={formatNumber}
              parser={parseNumber}
              onChange={handleSelectAmountChange}
              placeholder="Choose"
            ></InputNumber>
            &emsp;
            <i lineHeight="100%"></i>
            <Text fontStyle="italic" lineHeight="2">
              {amount} products are available
            </Text>
          </Box>

          <Button
            rounded={'none'}
            w={'full'}
            mt={8}
            size={'lg'}
            py={'7'}
            bg={'midnightblue'}
            color={useColorModeValue('white', 'gray.900')}
            textTransform={'uppercase'}
            _hover={{
              transform: 'translateY(2px)',
              boxShadow: 'lg',
            }}
            onClick={handleClick}
          >
            Add to cart
          </Button>
        </Stack>
      </SimpleGrid>
      <Card
        title="Virtual try on"
        extra={<a href="#">More</a>}
        style={{ width: '40%' }}
      >
        <Dragger {...draggerProps} beforeUpload={handleUpload}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload a suggesting image
          </p>
          <p className="ant-upload-hint">
            Support to search for products by suggested images uploaded
          </p>
        </Dragger>
      </Card>
      <Modal isOpen={show} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>CONFIRM</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text
              fontSize={{ base: '18px', lg: '20px' }}
              fontWeight={'500'}
              mb={'4'}
            >
              Confirm add <b>{selectAmount}</b> products to cart
            </Text>
            {selectedSize ? (
              <Box marginTop={'20px'}>
                <Text
                  fontSize={{ base: '16px', lg: '18px' }}
                  fontWeight={'500'}
                  mb={'4'}
                >
                  Size: <b>{selectedSize ? selectedSize : ''}</b>
                </Text>
              </Box>
            ) : null}
            {selectedColor ? (
              <Box isOpen="selectedColor" marginTop={'20px'}>
                <Text
                  fontSize={{ base: '16px', lg: '18px' }}
                  fontWeight={'500'}
                  mb={'4'}
                >
                  Color: <b>{selectedColor ? selectedColor : ''}</b>
                </Text>
              </Box>
            ) : null}
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={handleClose}>
              Close
            </Button>
            <Button colorScheme="blue" onClick={handleAddToCart}>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <FBComment></FBComment>
    </Container>
  );
};

export default ServiceDetail;
