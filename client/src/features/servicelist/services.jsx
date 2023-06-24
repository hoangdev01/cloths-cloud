import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ServiceCard from './servicecard';
import serviceAPI from '../../api/serviceApi';

const Services = props => {
  const { list } = props;

  return (
    <Box display={'flex'} flexWrap={'wrap'} px={'15px'}>
      {list
        ? list.map(item => (
            <Box
              flexBasis={{
                base: '100%',
                sm: '50%',
                md: '50%',
                lg: '32%',
                xl: '33%',
              }}
            >
              <ServiceCard item={item} key={item.id} w={'full'} />
            </Box>
          ))
        : null}
    </Box>
  );
};

export default Services;
