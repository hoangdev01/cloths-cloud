import {
  Box,
  Text,
  Container,
  Modal,
  ModalOverlay,
  ModalContent,
  Spinner,
  IconButton,
  Icon,
  Flex,
  Tooltip,
  Image,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Services from './services';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import { ai_url, url } from './../../api/constants';
import serviceAPI from '../../api/serviceApi';
import { truncate } from 'lodash';
import { RepeatIcon } from '@chakra-ui/icons';

const { Dragger } = Upload;

function ServiceList(props) {
  const [list, setList] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [isClicked, setIsClicked] = useState(1);
  const [searchImage, setSearchImage] = useState(false);

  const handleClick = () => {
    setIsRotating(true);
    setIsLoading(false);
    setIsClicked(isClicked + 1);
    serviceAPI.getServiceList('cloth').then(res => {
      setList(res.data.serviceList);
      setCategoryId(res.data.categoryId);
    });
    setSearchImage(false);

    setTimeout(() => {
      setIsRotating(false);
    }, 500);
  };

  useEffect(() => {
    serviceAPI.getServiceList('cloth').then(res => {
      const list = res.data.serviceList;
      setList(res.data.serviceList);
      setCategoryId(res.data.categoryId);
    });
  }, []);

  const draggerProps = {
    name: 'file',
    multiple: false, // Chỉnh multiple thành false để chuyển sang single upload
    action: `${ai_url}/recommend`,
    showUploadList: false,
    method: 'post',
    onChange(info) {
      console.log('on change');
      console.log(ai_url);
      setIsLoading(true);
      // Xử lý logic khi upload
      const { status, originFileObj } = info.file;
      setSearchImage(URL.createObjectURL(originFileObj));
      if (status !== 'uploading') {
        console.log('abc');
      }
      if (status === 'done') {
        if (info.file.response.success) {
          serviceAPI
            .getRecommendService({
              listRecommendImg: info.file.response.listRecommendImg,
              categoryId: categoryId,
            })
            .then(res => {
              if (res.data.success) {
                setList(res.data.serviceList);
              } else {
                alert('Product not found');
                serviceAPI.getServiceList('cloth').then(res => {
                  const list = res.data.serviceList;
                  setList(res.data.serviceList);
                  setCategoryId(res.data.categoryId);
                });
              }
            });
        } else if (info.file.response.success == false) {
          message.error(`${info.file.response.message}`);
        }
        setIsLoading(false);
      } else if (status === 'error') {
        console.log('fail');
        setIsLoading(false);
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      setIsLoading(true);
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  return (
    <Container maxW={'100%'} pt={'20px'} pb={'90px'}>
      <Box w={'full'} display={'flex'}>
        {/* left */}
        <Box px={'15px'} maxW={'30%'} width={'full'}>
          <Box rounded={'15px'} px={'20px'} py={'42px'} bgColor={'#edf2f7'}>
            <Flex align="center">
              <Text
                fontWeight={'700'}
                fontSize={'20px'}
                mb={'22px'}
                color={'midnightblue'}
                w={'90%'}
              >
                Search Service
              </Text>
              <Tooltip
                label="Reset Filter"
                aria-label="Reset Button"
                placement="left"
                _hover={{
                  background: 'transparent',
                }}
              >
                <IconButton
                  onClick={handleClick}
                  icon={
                    <RepeatIcon
                      title="Reset"
                      transform={
                        isRotating
                          ? `rotate(${0 - isClicked * 180}deg)`
                          : `rotate(${0 - isClicked * 180}deg)`
                      }
                      transition="transform 0.2s ease-in-out"
                      boxSize={6}
                      _focusVisible={{
                        outline: 'none',
                        'box-shadow': 'none',
                      }}
                      _hover={{
                        backgroundColor: 'transparent',
                      }}
                      _active={{
                        backgroundColor: 'transparent',
                      }}
                    />
                  }
                  marginBottom={'20px'}
                  aria-label="Rotate Arrow"
                />
              </Tooltip>
            </Flex>
            {searchImage ? (
              <Image
                rounded="lg"
                width="100%"
                height="200px"
                objectFit="contain"
                src={searchImage}
                draggable="false"
                loading="lazy"
                cursor="pointer"
                _hover={{ transform: 'scale(1.1)' }}
                transition="transform 0.1s ease"
              />
            ) : null}
            <Dragger
              {...draggerProps}
              style={{ display: searchImage ? 'none' : 'block' }}
            >
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
          </Box>
        </Box>

        <Box maxW={'66.66666%'} w={'full'}>
          {isLoading ? (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
              marginLeft={'30px'}
            />
          ) : (
            <Services list={list} />
          )}
        </Box>
      </Box>
    </Container>
  );
}

export default ServiceList;
