import {
  Box,
  Button,
  Container,
  Image,
  Text,
  Card,
  ButtonGroup,
  CardBody,
  CardFooter,
  Heading,
  Divider,
  Stack,
} from '@chakra-ui/react';
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
    <Box px={'15px'} w={'100%'} h={'500px'}>
      <Card
        maxW={'100%'}
        overflow={'hidden'}
        _hover={{
          boxShadow: 'rgba(0, 0, 0, 0.1) 0px 5px 15px',
          transform: 'translateY(-1%)',
          transition: 'all 0.1s linear',
        }}
        cursor={'pointer'}
      >
        <CardBody>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Image
              maxW={'full'}
              src={imagePath}
              objectFit="contain"
              boxSize="200px"
            ></Image>
          </Box>
          <Stack overflow={'hidden'} w={'100%'} maxW={'100%'}>
            <Heading size="md">{item.name}</Heading>
            <Box maxW={'200px'} textOverflow="ellipsis" whiteSpace="nowrap">
              {item.description}
            </Box>
            <Text color="blue.600" fontSize="2xl">
              {(item.price || 'None').toLocaleString('vi', {
                style: 'currency',
                currency: 'USD',
              })}
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2">
            <Link to={`/cloth-detail/${item.slug}`}>
              <Button variant="solid" colorScheme="blue">
                View Detail
              </Button>
            </Link>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </Box>
  );
};

export default ServiceCard;
