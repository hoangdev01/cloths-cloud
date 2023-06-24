import {
  Box,
  Flex,
  Heading,
  HStack,
  Link,
  Stack,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import { CartItem } from './cartItem';
import { CartOrderSummary } from './cartOrderSummary';
// import { cartData } from './_data.ts';
import React, { useEffect, useState, useContext } from 'react';
import CartApi from '../../api/cartApi';
import { mediaUrl } from '../../api/constants';
import image from '../../assets/cloth.jpg';

const Carts = () => {
  const [total, setTotal] = useState([]);
  const [listCartId, setListCartId] = useState([]);
  const [cartData, setCartData] = useState([]);

  const transformCartData = resData => {
    if (!resData || !resData.success || !resData.listCart) {
      return [resData.success];
    }

    return resData.listCart.map((item, index) => {
      const { instance, amount, instanceId, id: cartId } = item;
      const { service } = instance;

      const id = (index + 1).toString();
      const price = service?.price * amount;
      const currency = 'USD';
      const name = service?.name ?? null;
      const description = service?.title ?? null;
      const quantity = amount;
      const imageUrl = service?.images.find(image => image.is_avatar)
        ? `${mediaUrl}/${service?.images.find(image => image.is_avatar)?.name}`
        : null;
      const slug = service?.slug;
      const instanceAmount = instance?.amount;
      const color = instance?.color;
      const size = instance?.size;
      return {
        id,
        price,
        currency,
        name,
        description,
        quantity,
        imageUrl,
        slug,
        instanceAmount,
        color,
        size,
        instanceId,
        cartId,
      };
    });
  };

  const setData = () => {
    CartApi.getAll().then(res => {
      const listCardData = transformCartData(res.data);
      setCartData(listCardData);
      setTotal(
        listCardData.reduce((acc, item) => {
          return acc + item.price;
        }, 0)
      );
      setListCartId(res.data.listCart.map(item => item.id));
    });
  };

  useEffect(() => {
    setData();
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box
      maxW={{ base: '3xl', lg: '7xl' }}
      mx="auto"
      px={{ base: '4', md: '8', lg: '12' }}
      py={{ base: '6', md: '8', lg: '12' }}
    >
      <Stack
        direction={{ base: 'column', lg: 'row' }}
        align={{ lg: 'flex-start' }}
        spacing={{ base: '8', md: '16' }}
      >
        <Stack spacing={{ base: '8', md: '10' }} flex="2">
          <Heading fontSize="2xl" fontWeight="extrabold">
            Shopping Cart ({cartData.length} items)
          </Heading>

          <Stack spacing="6">
            {cartData.map(item => (
              <CartItem key={item.id} {...item} setData={setData} />
            ))}
          </Stack>
        </Stack>

        <Flex direction="column" align="center" flex="1">
          <CartOrderSummary
            total={total}
            listCartId={listCartId}
            setData={setData}
          />
          <HStack mt="6" fontWeight="semibold">
            <p>or</p>
            <Link href="/" color={mode('blue.500', 'blue.200')}>
              Continue shopping
            </Link>
          </HStack>
        </Flex>
      </Stack>
    </Box>
  );
};

export default Carts;
