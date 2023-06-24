import {
  Box,
  Container,
  List,
  ListIcon,
  ListItem,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { ImPhone } from 'react-icons/im';
import { IoMdMail } from 'react-icons/io';
import { AiFillHome } from 'react-icons/ai';

const footerAboutLinks = [
  {
    display: 'About',
    path: '/about',
  },
  {
    display: 'Contact',
    path: '/about',
  },
  {
    display: 'Hire',
    path: '/about',
  },
  {
    display: 'Information',
    path: '/about',
  },
];
const footerCustomerLinks = [
  {
    display: 'Supplier registration',
    path: '/about',
  },
  {
    display: 'Affiliate partner',
    path: '/about',
  },
  {
    display: 'Celebrity show',
    path: '/about',
  },
  {
    display: 'Dealer Program',
    path: '/about',
  },
  {
    display: 'Marketing & distribution cooperation',
    path: '/about',
  },
];

const footerRuleLinks = [
  {
    display: 'Terms of use',
    path: '/about',
  },
  {
    display: 'Privacy Policy',
    path: '/about',
  },
  {
    display: 'Cookie Policy',
    path: '/about',
  },
  {
    display: 'Software bug detection bonus program',
    path: '/about',
  },
  {
    display: 'Policies and regulations',
    path: '/about',
  },
];
const Footer = () => {
  return (
    <Container maxW={'full'} bgColor={'#191970'} mt={'110px'} pb={'100px'}>
      <Box
        maxW={'1200px'}
        px={'15px'}
        pt={'120px'}
        display="flex"
        flexDir={'column'}
        m={'auto'}
      >
        <Box w={'full'}>
          <Box display="flex" justifyContent={'space-around'}>
            <Box w={'25%'}>
              <Text fontWeight={'700'} fontSize={'20px'} color={'white'}>
                CONTACT
              </Text>

              <List spacing={4} mt={'20px'} color={'white'}>
                <ListItem
                  cursor={'pointer'}
                  _hover={{
                    color: 'white',
                  }}
                >
                  <ListIcon as={ImPhone} color="white" />+ 92 666 999 0000
                </ListItem>
                <ListItem
                  cursor={'pointer'}
                  _hover={{
                    color: 'white',
                  }}
                >
                  <ListIcon as={IoMdMail} color="white" />
                  clothscloud@gmail.com
                </ListItem>
                <ListItem
                  cursor={'pointer'}
                  _hover={{
                    color: 'white',
                  }}
                >
                  <ListIcon as={AiFillHome} color="white" />
                  63 Nguyễn Lương Bằng, Đà Nẵng.
                </ListItem>
              </List>
            </Box>
            <Box w={'25%'}>
              <Text fontWeight={'700'} fontSize={'20px'} color={'white'}>
                About cloths cloud
              </Text>

              <List spacing={4} mt={'20px'} color={'white'}>
                {footerAboutLinks.map((item, index) => (
                  <ListItem cursor={'pointer'}>{item.display}</ListItem>
                ))}
              </List>
            </Box>
            <Box w={'25%'}>
              <Text fontWeight={'700'} fontSize={'20px'} color={'white'}>
                PARTNER
              </Text>

              <List spacing={4} mt={'20px'} color={'white'}>
                {footerCustomerLinks.map((item, index) => (
                  <ListItem cursor={'pointer'}>{item.display}</ListItem>
                ))}
              </List>
            </Box>
            <Box w={'25%'}>
              <Text fontWeight={'700'} fontSize={'20px'} color={'white'}>
                TERMS OF USE
              </Text>

              <List spacing={4} mt={'20px'} color={'white'}>
                {footerRuleLinks.map((item, index) => (
                  <ListItem cursor={'pointer'}>{item.display}</ListItem>
                ))}
              </List>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Footer;
