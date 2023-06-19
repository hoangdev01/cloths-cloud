import React, { useEffect, useState, useContext, useMemo } from 'react';
import {
  Box,
  Container,
  Flex,
  HStack,
  Input,
  StackDivider,
  Text,
  VStack,
  Fade,
  useOutsideClick,
  Badge,
  MenuItem,
  Image,
  Menu,
  MenuButton,
  Button,
  MenuList,
  Center,
  Stack,
  Heading,
} from '@chakra-ui/react';
import FBChat from '../social/FbChat';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo.png';

import { BsSearch } from 'react-icons/bs';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { AiOutlineBell } from 'react-icons/ai';
import { FaRegUser } from 'react-icons/fa';
import { AuthContext } from '../../contexts/AuthContext';
import { url } from '../../api/constants';
import { LOCAL_STORAGE_ACCESS_TOKEN_NAME } from '../../contexts/constants';
import notificationApi from '../../api/notificationApi';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  RadiusBottomleftOutlined,
  RadiusBottomrightOutlined,
  RadiusUpleftOutlined,
  RadiusUprightOutlined,
  SmileOutlined,
} from '@ant-design/icons';
import { Modal, Divider, Space, notification } from 'antd';
import { outputUrl, mediaUrl } from '../../api/constants';
import image from '../../assets/cloth.jpg';

const MenuBar = [
  {
    name: 'Cloth',
    path: '/cloth-list',
  },
];
const openNotification = () => {
  notification.open({
    message: (
      <>
        <span style={{ fontWeight: 'bold' }}>
          You just received a new notification
        </span>
      </>
    ),
    description: 'Click on the notification icon for detailed information.',
    onClick: () => {
      console.log('Notification Clicked!');
    },
    placement: 'bottomRight',
    icon: <SmileOutlined style={{ color: '#108ee9' }} />,
  });
};

const Header = () => {
  const notificationEntry = {
    name: null,
    description: null,
    createdAt: null,
    serviceId: null,
    image: null,
    service: null,
  };
  const isAdminUrl = window.location?.pathname?.startsWith('/admin');

  const [showMenu, setShowMenu] = useState(0);
  const [optionUser, setOptionUser] = useState(false);
  const [listNotification, setListNotification] = useState([]);
  const [currentNotification, setCurrentNotification] =
    useState(notificationEntry);
  const [isModalNotificationVisisible, setIsModalNotificationVisisible] =
    useState(false);
  const [unRead, setUnRead] = useState(0);
  const ref = React.useRef();

  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);

  const ScrollShowMenu = () => {
    window.scrollY >= 70 ? setShowMenu(true) : setShowMenu(false);
  };

  const formatDate = dateString => {
    const date = new Date(dateString);

    // Extract date components
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const month = date.toLocaleString('en-US', { month: 'long' });
    const day = date.getDate();
    const year = date.getFullYear();

    // Format the date string
    const formattedDate = `${formatTime(
      hours,
      minutes,
      seconds
    )} ${month} ${day}, ${year}`;
    return formattedDate;
  };
  const handleNotificationClick = item => {
    setCurrentNotification(item);
    notificationApi.update(item.id).then(res => {
      if (res.data.success)
        notificationApi.getAll().then(res => {
          if (res.data.success) {
            setListNotification(res.data.listNotification);
            setUnRead(res.data.unRead);
          }
        });
    });

    setIsModalNotificationVisisible(true);
  };

  const handleNotificationOk = () => {
    setIsModalNotificationVisisible(false);
  };

  const handleNotificationCancel = () => {
    setIsModalNotificationVisisible(false);
  };

  const formatTime = (hours, minutes, seconds) => {
    // Helper function to format time with leading zeros
    const padZero = value => (value < 10 ? `0${value}` : value);

    // Format the time string
    const formattedTime = `${padZero(hours)}:${padZero(minutes)}:${padZero(
      seconds
    )}`;
    return formattedTime;
  };
  useOutsideClick({
    ref: ref,
    handler: () => setOptionUser(false),
  });

  useEffect(() => {
    window.addEventListener('scroll', ScrollShowMenu);
  });

  function handleClick(event) {
    event.preventDefault();
  }

  useEffect(() => {
    notificationApi.getAll().then(res => {
      if (res.data.success) {
        res.data.listNotification.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setListNotification(res.data.listNotification);
        setUnRead(res.data.unRead);
      }
    });
    const eventSource = new EventSource(
      `${url}/notifications/${localStorage[LOCAL_STORAGE_ACCESS_TOKEN_NAME]}`
    );

    eventSource.onmessage = event => {
      notificationApi.getAll().then(res => {
        if (res.data.success) {
          res.data.listNotification.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
          setListNotification(res.data.listNotification);
          setUnRead(res.data.unRead);
          openNotification();
        }
      });
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const getDefaultImage = listImage => {
    return listImage.find(image => image.is_avatar)
      ? `${mediaUrl}/${listImage.find(image => image.is_avatar).name}`
      : image;
  };

  return (
    <>
      <Modal
        title={currentNotification.name}
        visible={isModalNotificationVisisible}
        onOk={handleNotificationOk}
        onCancel={handleNotificationCancel}
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        {currentNotification.tag == 'fail' ? (
          <>
            <br />
            <Heading fontSize={'2xl'} fontFamily={'body'} textAlign={'center'}>
              {currentNotification.description}, please try again
            </Heading>
            <br />
            <hr />
            <br />
            <span style={{ fontWeight: 'bold', fontStyle: 'italic' }}>
              Service reference:
            </span>
          </>
        ) : null}
        <Center py={6}>
          <Stack
            borderWidth="1px"
            borderRadius="lg"
            w={{ sm: '90%', md: '90%' }}
            height={{ sm: '150px', md: '8rem' }}
            direction={{ base: 'column', md: 'row' }}
            bg={'white'}
            padding={4}
          >
            <Flex flex={1}>
              <a
                href={
                  currentNotification?.service
                    ? `/cloth-detail/${currentNotification?.service?.slug}`
                    : ''
                }
                onClick={() => {
                  window.location.reload();
                }}
              >
                <Image
                  objectFit="contain"
                  boxSize="100%"
                  marginLeft={'50%'}
                  src={
                    currentNotification?.service
                      ? getDefaultImage(currentNotification.service.images)
                      : image
                  }
                  cursor="pointer"
                  _hover={{ transform: 'scale(1.1)' }}
                  transition="transform 0.1s ease"
                />
              </a>
            </Flex>
            <Stack
              flex={2}
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              p={1}
              pt={2}
            >
              <Heading fontSize={'2xl'} fontFamily={'body'}>
                {currentNotification?.service?.name || 'no data'}
              </Heading>
              <Text fontWeight={600} color={'gray.500'} size="sm" mb={4}>
                {currentNotification?.service?.description || 'no data'}
              </Text>
            </Stack>
          </Stack>
        </Center>

        {currentNotification.tag == 'success' ? (
          <>
            <hr />
            <br />
            <Heading fontSize={'2xl'} fontFamily={'body'} textAlign={'center'}>
              Try on result
            </Heading>
            <br />
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Image
                rounded="lg"
                width="300px"
                height="300px"
                objectFit="contain"
                src={
                  currentNotification.image
                    ? `${outputUrl}/${currentNotification.image}`
                    : ''
                }
                draggable="false"
                loading="lazy"
                cursor="pointer"
              />
            </div>
          </>
        ) : null}

        <br />
        <br />
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '10px',
          }}
        >
          <small style={{ fontStyle: 'italic' }}>
            {formatDate(currentNotification.createdAt)}
          </small>
        </div>
      </Modal>
      <Container
        maxW={'full'}
        centerContent
        p={0}
        position={'relative'}
        display={isAdminUrl ? 'none' : 'block'}
      >
        <VStack
          divider={<StackDivider borderColor="gray.300" />}
          w={'full'}
          spacing={0}
          inset={0}
          zIndex={1}
          h={'170px'}
        >
          <Box
            py={showMenu ? '0px' : '12px'}
            w={'full'}
            display={'flex'}
            justifyContent={'center'}
            bgColor={showMenu ? 'white' : 'var(--primary-color)'}
            position={showMenu ? 'fixed' : 'unset'}
            top={showMenu ? '0px' : '-84px'}
            boxShadow={
              showMenu ? '0 10px 50px 0 rgb(46 56 220 / 20%)' : 'unset'
            }
            transition={'all 0.3s ease'}
            zIndex={999}
            background={'midnightblue'}
          >
            <Box
              maxW={'1200px'}
              w={'full'}
              color={'white'}
              fontSize={'15px'}
              fontFamily={'sans-serif'}
              p={'10px'}
              shadow={showMenu ? 'sm' : 'unset'}
            >
              <Flex
                display={'flex'}
                alignItems={'center'}
                mx={'-15px'}
                px={'10px'}
              >
                <Box maxW={'185px'} px={'15px'} flex={1} w={'full'}>
                  <Link to={'/'}>
                    <Box
                      // style={{ backgroundImage: `url(${logo})` }}
                      style={{ backgroundImage: `url(${logo})` }}
                      // h={'38px'}
                      // w={'165px'}
                      h={'75px'}
                      w={'100px'}
                      bgSize={'cover'}
                      bgPosition={'center'}
                      bgRepeat={'no-repeat'}
                    ></Box>
                  </Link>
                </Box>

                <Box px={'15px'} flex={1}>
                  <HStack
                    justifyContent={'center'}
                    color={'black'}
                    fontWeight={'bold'}
                    fontSize={'16px'}
                    spacing={0}
                  >
                    {MenuBar.map((menu, index) => (
                      <Link
                        to={menu.path}
                        key={index}
                        _hover={{ textDecoration: 'unset' }}
                      >
                        <Box
                          transition={'all 0.2s ease-in-out'}
                          px={'20px'}
                          py={'10px'}
                          key={index}
                          cursor={'pointer'}
                          _hover={{
                            color: 'midnightblue',
                            backgroundColor: 'white',
                          }}
                          rounded={'15px'}
                          color={'white'}
                        >
                          {menu.name}
                        </Box>
                      </Link>
                    ))}
                  </HStack>
                </Box>

                <Box minW={'185px'} px={'15px'}>
                  <Box ml={'auto'} display={'flex'}>
                    <Menu closeOnSelect={false}>
                      <MenuButton>
                        <Box
                          shadow={'0 16px 32px 0 rgba(7, 28, 31, 0.1)'}
                          bgColor={'white'}
                          color={'#071c1f'}
                          minW={'25px'}
                          h={'50px'}
                          w={'50px'}
                          transition={'all 0.3s linear'}
                          cursor={'pointer'}
                          display={'flex'}
                          alignItems={'center'}
                          justifyContent={'center'}
                          rounded={'100%'}
                          _hover={{
                            // color: 'white',
                            backgroundColor: '#d0d3d6',
                          }}
                          position="relative"
                          as={Button}
                        >
                          <AiOutlineBell size={26} />
                          {unRead ? (
                            <Badge
                              position="absolute"
                              top="-6px"
                              right="-6px"
                              bg="red"
                              color="white"
                              borderRadius="50%"
                              fontSize="xs"
                              fontWeight="bold"
                              px={2}
                              py={1}
                              isOpen={unRead != 0}
                            >
                              {unRead}
                            </Badge>
                          ) : null}
                        </Box>
                      </MenuButton>
                      <MenuList color={'black'} minW="300px">
                        <Box maxH="200px" overflowY="auto">
                          {listNotification.length > 0
                            ? listNotification.map(item => (
                                <>
                                  <MenuItem
                                    minH="56px" // Tăng chiều cao
                                    display="flex"
                                    alignItems="center"
                                    _hover={{ bg: 'gray.300' }} // Background xám khi hover
                                    bg={
                                      !item.status ? 'gray.200' : 'transparent'
                                    }
                                    onClick={() =>
                                      handleNotificationClick(item)
                                    }
                                  >
                                    <span>
                                      <strong>{item.description}</strong>
                                      <br />
                                      <small style={{ fontStyle: 'italic' }}>
                                        {formatDate(item.createdAt)}
                                      </small>
                                    </span>
                                    {item.tag == 'fail' ? (
                                      <CloseCircleOutlined
                                        size={50}
                                        style={{
                                          fontSize: '24px',
                                          color: 'red',
                                          marginLeft: 'auto',
                                        }}
                                      />
                                    ) : (
                                      <CheckCircleOutlined
                                        size={50}
                                        style={{
                                          fontSize: '24px',
                                          color: 'green',
                                          marginLeft: 'auto',
                                        }}
                                      />
                                    )}
                                  </MenuItem>
                                  <hr />
                                </>
                              ))
                            : null}
                        </Box>
                      </MenuList>
                    </Menu>
                    <Box position={'relative'}>
                      <Box
                        mx={'15px'}
                        position={'relative'}
                        color={'#071c1f'}
                        shadow={'0 16px 32px 0 rgba(7, 28, 31, 0.1)'}
                      >
                        <Input
                          type={'text'}
                          h={'50px'}
                          pr={'50px'}
                          border={'1px'}
                          rounded={'10px'}
                          mt={'0px !important'}
                          mb={'0px !important'}
                          placeholder={'Search here...'}
                          bg={'white'}
                          color={'#5C727D'}
                          _placeholder={{
                            color: '#5C727D',
                          }}
                        />
                        <Box
                          color={'#071c1f'}
                          position={'absolute'}
                          top={'50%'}
                          transform={'translateY(-50%)'}
                          right={'10px'}
                        >
                          <BsSearch size={19} />
                        </Box>
                      </Box>
                    </Box>
                    <Box
                      shadow={'0 16px 32px 0 rgba(7, 28, 31, 0.1)'}
                      position={'relative'}
                      bgColor={'white'}
                      color={'#071c1f'}
                      minW={'25px'}
                      h={'50px'}
                      w={'50px'}
                      mr={'10px'}
                      transition={
                        'all .2s cubic-bezier(.5,0,0,1.25),opacity .15s ease-out'
                      }
                      cursor={'pointer'}
                      display={'flex'}
                      alignItems={'center'}
                      justifyContent={'center'}
                      rounded={'10px'}
                      _hover={{
                        color: 'white',
                        backgroundColor: 'var(--hover-color)',
                      }}
                      onClick={() => setOptionUser(!optionUser)}
                      ref={ref}
                      onMouseDown={handleClick}
                    >
                      <Fade in={optionUser}>
                        <Box
                          position={'absolute'}
                          right={'0px'}
                          minW={'150px'}
                          py={'10px'}
                          bg={'white'}
                          boxShadow={'sm'}
                          fontSize={'16px'}
                          color={'#5C727D'}
                          top={optionUser ? '102%' : '115%'}
                          transition={'all 1s linear'}
                          // opacity={optionUser ? '1' : '0'}
                          display={optionUser ? 'block' : 'none'}
                          rounded={'10px'}
                          shadow="md"
                          userSelect="none"
                        >
                          <Link
                            to="/sign-in"
                            style={{
                              display: !isAuthenticated ? 'block' : 'none',
                            }}
                            userSelect="none"
                          >
                            <Box px={'15px'} py={'7px'}>
                              <Text
                                _hover={{
                                  color: 'var(--hover-color)',
                                }}
                              >
                                Sign in
                              </Text>
                            </Box>
                          </Link>
                          <Link
                            to="/sign-up"
                            style={{
                              display: !isAuthenticated ? 'block' : 'none',
                            }}
                            userSelect="none"
                          >
                            <Box px={'15px'} py={'7px'}>
                              <Text
                                _hover={{
                                  color: 'var(--hover-color)',
                                }}
                                userSelect="none"
                              >
                                Register
                              </Text>
                            </Box>{' '}
                          </Link>
                          <Link
                            to="/profile"
                            style={{
                              display: isAuthenticated ? 'block' : 'none',
                            }}
                            userSelect="none"
                          >
                            <Box px={'15px'} py={'7px'}>
                              <Text
                                _hover={{
                                  color: 'var(--hover-color)',
                                }}
                              >
                                My Account
                              </Text>
                            </Box>
                          </Link>
                          <Link
                            to="/purchase"
                            style={{
                              display: isAuthenticated ? 'block' : 'none',
                            }}
                            userSelect="none"
                          >
                            <Box px={'15px'} py={'7px'}>
                              <Text
                                _hover={{
                                  color: 'var(--hover-color)',
                                }}
                              >
                                Purchase
                              </Text>
                            </Box>
                          </Link>
                          <Link
                            to="/logout"
                            onClick={() => window.location.reload()}
                            style={{
                              display: isAuthenticated ? 'block' : 'none',
                            }}
                          >
                            <Box px={'15px'} py={'7px'}>
                              <Text
                                _hover={{
                                  color: '#00c2cb',
                                }}
                              >
                                Logout
                              </Text>
                            </Box>
                          </Link>
                        </Box>
                      </Fade>
                      <FaRegUser size={20} />
                    </Box>
                    <Link
                      to="/cart"
                      style={{
                        display: isAuthenticated ? 'block' : 'none',
                      }}
                    >
                      <Box
                        shadow={'0 16px 32px 0 rgba(7, 28, 31, 0.1)'}
                        bgColor={'white'}
                        color={'#071c1f'}
                        minW={'25px'}
                        h={'50px'}
                        w={'50px'}
                        transition={'all 0.3s linear'}
                        cursor={'pointer'}
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        rounded={'10px'}
                        _hover={{
                          color: 'white',
                          backgroundColor: 'var(--hover-color)',
                        }}
                      >
                        <AiOutlineShoppingCart size={23} />
                      </Box>
                    </Link>
                  </Box>
                </Box>
              </Flex>
            </Box>
          </Box>
        </VStack>
        <FBChat></FBChat>
      </Container>
    </>
  );
};

export default Header;
