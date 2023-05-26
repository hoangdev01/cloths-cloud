import { Box } from '@chakra-ui/react';
import React, { useEffect, useState }  from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ServiceCard from './servicecard';
import serviceAPI from '../../api/serviceApi';

const Services = () => {

  const [list, setList] = useState([]);

  useEffect(() => {
    serviceAPI.getServiceList("cloth").then((res) => {
      const list = res.data.serviceList;
      console.log(res.data.serviceList);
      setList(res.data.serviceList);
    });
},[]);
  return (
    <Box display={"flex"} flexWrap={"wrap"}  px={"15px"} >  
        {list.map((item)=>(
          <Box maxW={'50%'}>
              <ServiceCard item={item} key={item.id} w={'full'}/>
          </Box>
        ))}
    </Box>
  )
}

export default Services;
