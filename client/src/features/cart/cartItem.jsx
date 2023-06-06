import {
  CloseButton,
  Flex,
  Link,
  Select,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  Text,
  Button,
} from '@chakra-ui/react';
import { PriceTag } from './priceTag';
import { CartProductMeta } from './cartProductMeta';
import CartApi from '../../api/cartApi';
import React, { useEffect, useState, useContext } from 'react';

const QuantitySelect = props => {
  const { instanceId, setData } = props;

  const handleAddToCart = event => {
    const cartService = {
      amount: event.target.value,
      instanceId: instanceId,
      type: 'UPDATE',
    };
    CartApi.addCart(cartService)
      .then(response => {
        if (response.data.success) {
          setData();
        } else alert('Add service to cart fail');
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <Select
      maxW="64px"
      aria-label="Select quantity"
      focusBorderColor={useColorModeValue('blue.500', 'blue.200')}
      defaultValue={props.quantity ? props.quantity.toString() : '1'}
      // {...props}
      onChange={handleAddToCart}
    >
      {Array.from({ length: props.instanceAmount }).map((_, index) => (
        <option key={index + 1} value={index + 1}>
          {index + 1}
        </option>
      ))}
    </Select>
  );
};

export const CartItem = props => {
  const {
    isGiftWrapping,
    name,
    description,
    quantity,
    imageUrl,
    currency,
    price,
    onChangeQuantity,
    slug,
    color,
    size,
    instanceAmount,
    setData,
    instanceId,
    cartId,
    listCartId,
  } = props;

  const [show, setShow] = useState();

  const onClickDelete = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleDeleteFromCart = () => {
    CartApi.deleteCart(cartId).then(res => {
      if (res.data.success) setData();
      setShow(false);
    });
  };

  return (
    <>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        justify="space-between"
        align="center"
      >
        <CartProductMeta
          name={name}
          description={description}
          image={imageUrl}
          isGiftWrapping={isGiftWrapping}
          slug={slug}
          color={color}
          size={size}
        />

        {/* Desktop */}
        <Flex
          width="full"
          justify="space-between"
          display={{ base: 'none', md: 'flex' }}
        >
          <QuantitySelect
            value={quantity}
            onChange={e => {
              onChangeQuantity?.(+e.currentTarget.value);
            }}
            instanceAmount={instanceAmount}
            quantity={quantity}
            setData={setData}
            instanceId={instanceId}
          />
          <PriceTag price={price} currency={currency} />
          <CloseButton
            aria-label={`Delete ${name} from cart`}
            onClick={onClickDelete}
          />
        </Flex>

        {/* Mobile */}
        <Flex
          mt="4"
          align="center"
          width="full"
          justify="space-between"
          display={{ base: 'flex', md: 'none' }}
        >
          <Link fontSize="sm" textDecor="underline" onClick={onClickDelete}>
            Delete
          </Link>
          <QuantitySelect
            value={quantity}
            onChange={e => {
              onChangeQuantity?.(+e.currentTarget.value);
            }}
          />
          <PriceTag price={price} currency={currency} />
        </Flex>
      </Flex>
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
              Confirm removal of the product from the cart
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={handleClose}>
              Close
            </Button>
            <Button colorScheme="blue" onClick={handleDeleteFromCart}>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
