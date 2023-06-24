import { Box, Link } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import {
  FaAngleRight,
  FaFacebookMessenger,
  FaPhoneAlt,
  FaMailBulk,
} from 'react-icons/fa';

const ButtonSrollTop = () => {
  const [buttonScroll, setButtonScroll] = useState(false);
  const [isBorderVisible, setIsBorderVisible] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsBorderVisible(prevState => !prevState);
    }, 700); // Thay đổi tốc độ hiển thị/nhỏ lại ở đây (ms)

    return () => {
      clearInterval(timer);
    };
  }, []);

  const boxShadow = isBorderVisible
    ? '0px 0px 15px rgba(0,0,0,10);'
    : '0px 0px 10px rgba(0,0,0,0.5);';

  const ScrollShowMenu = () => {
    window.scrollY > 200 ? setButtonScroll(true) : setButtonScroll(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', ScrollShowMenu);
  });
  return (
    <>
      <Link
        href="https://www.facebook.com/messages/t/100009215981635"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Box
          position={'fixed'}
          zIndex={100}
          bgColor={'#191970'}
          color={'white'}
          fontSize={'20px'}
          fontWeight={'bold'}
          textAlign={'center'}
          right={'3%'}
          bottom={buttonScroll ? '280px' : '210px'}
          w={'45px'}
          h={'45px'}
          cursor={'pointer'}
          lineHeight={'45px'}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          rounded={'100%'}
          transition="all 0.7s ease"
          boxShadow={boxShadow}
        >
          <FaFacebookMessenger size={'25px'} />
        </Box>
      </Link>
      <Link href="tel:0869790237">
        <Box
          position={'fixed'}
          zIndex={100}
          bgColor={'#191970'}
          color={'white'}
          fontSize={'20px'}
          fontWeight={'bold'}
          textAlign={'center'}
          right={'3%'}
          bottom={buttonScroll ? '210px' : '140px'}
          w={'45px'}
          h={'45px'}
          cursor={'pointer'}
          lineHeight={'45px'}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          rounded={'100%'}
          transition="all 0.7s ease"
          boxShadow={boxShadow}
        >
          <FaPhoneAlt size={'25px'} />
        </Box>
      </Link>
      <Link href="mailto:dbvhoang@gmail.com">
        <Box
          position={'fixed'}
          zIndex={100}
          bgColor={'#191970'}
          color={'white'}
          fontSize={'20px'}
          fontWeight={'bold'}
          textAlign={'center'}
          right={'3%'}
          bottom={buttonScroll ? '140px' : '70px'}
          w={'45px'}
          h={'45px'}
          cursor={'pointer'}
          lineHeight={'45px'}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          rounded={'100%'}
          transition="all 0.7s ease"
          boxShadow={boxShadow}
        >
          <FaMailBulk size={'25px'} />
        </Box>
      </Link>
      <Box
        position={'fixed'}
        zIndex={100}
        bgColor={'#F2F6F7'}
        color={'#071c1f'}
        fontSize={'20px'}
        fontWeight={'bold'}
        textAlign={'center'}
        right={'3%'}
        transition={'all 0.7s ease'}
        bottom={buttonScroll ? '70px' : '-50px'}
        w={'40px'}
        h={'40px'}
        cursor={'pointer'}
        lineHeight={'40px'}
        style={{
          boxShadow: '0 1px 6px 0 rgba(32, 33, 36, .28)',
          transform: 'rotate(45deg)',
        }}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <FaAngleRight
          style={{
            transform: 'rotate(-135deg)',
          }}
        />
      </Box>
    </>
  );
};

export default ButtonSrollTop;
