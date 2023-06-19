import { Box, Button, Container, Image, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import image from '../../assets/cloth.jpg';

import { mediaUrl } from '../../api/constants';

const ServiceCard = ({ item }) => {
  const randomStar = () => {
    return Math.floor(Math.random() * 6) + 1;
  };

  const resRandom = randomStar();

  let imagePath = image;

  if (item.images) {
    for (let img of item.images) {
      imagePath = img.is_avatar ? `${mediaUrl}/${img.name}` : imagePath;
    }
  }

  return (
    <Box px={'15px'} w={'full'} mb="20px" h={'370px'}>
      <Link to={`/cloth-detail/${item.slug}`}>
        <Box
          overflow={'hidden'}
          rounded={'10px'}
          display={'flex'}
          flexDir={'column'}
          textAlign={'start'}
          // border={'1px solid #888780'}
          cursor={'pointer'}
          boxShadow={'rgba(0, 0, 0, 0.35) 0px 5px 10px'}
          _hover={{
            boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
            transform: 'translateY(-1%)',
            transition: 'all 0.1s linear',
          }}
        >
          <Box display="flex" justifyContent="center" alignItems="center">
            <Image
              // maxW={'full'}
              src={imagePath}
              objectFit="contain"
              boxSize="200px"
            ></Image>
          </Box>
          <Box pt={'10px'} px={'16px'} maxH={'80px'}>
            <Text
              color={'var(--black-color)'}
              fontWeight={'500'}
              fontSize={'17px'}
            >
              {item.name}
            </Text>
            <Text color={'#e8604c'}>
              {(item.price || 'None').toLocaleString('vi', {
                style: 'currency',
                currency: 'USD',
              })}
            </Text>
          </Box>
          <Box px={'16px'} display={'flex'}>
            <Box color={resRandom > 0 ? '#FFCD38' : 'unset'}>
              <AiFillStar />
            </Box>
            <Box color={resRandom > 1 ? '#FFCD38' : 'unset'}>
              <AiFillStar />
            </Box>
            <Box color={resRandom > 2 ? '#FFCD38' : 'unset'}>
              <AiFillStar />
            </Box>
            <Box color={resRandom > 3 ? '#FFCD38' : 'unset'}>
              <AiFillStar />
            </Box>
            <Box color={resRandom > 4 ? '#FFCD38' : 'unset'}>
              <AiFillStar />
            </Box>
          </Box>
        </Box>
      </Link>
    </Box>
  );
};

export default ServiceCard;
