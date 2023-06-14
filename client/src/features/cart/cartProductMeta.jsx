import {
  Box,
  HStack,
  Icon,
  Image,
  Link,
  Stack,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import { FiGift } from 'react-icons/fi';
import defaultImage from '../../assets/cloth.jpg';

export const CartProductMeta = props => {
  const {
    isGiftWrapping = true,
    image,
    name,
    description,
    slug,
    color,
    size,
  } = props;
  return (
    <Stack direction="row" spacing="5" width="full">
      <Link href={`/cloth-detail/${slug}`}>
        <Image
          rounded="lg"
          width="120px"
          height="120px"
          objectFit="contain"
          src={image || defaultImage}
          alt={name}
          draggable="false"
          loading="lazy"
          cursor="pointer"
          _hover={{ transform: 'scale(1.1)' }}
          transition="transform 0.1s ease"
        />
      </Link>
      <Box pt="4">
        <Stack spacing="0.5">
          <Text fontWeight="medium">{name}</Text>
          <Text color={mode('gray.600', 'gray.400')} fontSize="sm">
            {description}
          </Text>
          <Text color={mode('gray.600', 'gray.400')} fontSize="sm">
            Color: {color}
          </Text>
          <Text color={mode('gray.600', 'gray.400')} fontSize="sm">
            Size: {size}
          </Text>
        </Stack>
      </Box>
    </Stack>
  );
};
