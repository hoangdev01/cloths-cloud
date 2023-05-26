import {
    Box,
    FormControl,
    Input,
    Text,
    Select,
    Button,
    Container,
    RadioGroup,
    Stack,
    Radio,
    Divider,
    Checkbox,
    Image,
  } from '@chakra-ui/react';
  import React, { useState } from 'react';
  import { RiArrowDropDownLine } from 'react-icons/ri';
  import Services from './services';


  
  const OPTION_SECLECT = ['Adventure', 'Wildlife', 'Sightseeing'];
  
  function ServiceList(props) {
    const [value, setValue] = useState('1');
    const [optionPrice, setOptionPrice] = useState(false);
    const [optionCategory, setOptionCategory] = useState(false);
    const [optionDuration, setOptionDuration] = useState(false);
  
    const [showSort, setShowSort] = useState(false);
  
    const [select, setSelect] = useState(0);
  
    return (
      <Container maxW={'1200px'} pt={'120px'} pb={'90px'}>
        <Box w={'full'} display={'flex'}>
          {/* left */}
          <Box px={'15px'} maxW={'33.3333%'} width={"full"}>
            <Box rounded={'15px'} px={'20px'} py={'42px'} bgColor={'#edf2f7'}>
              <Text fontWeight={'700'} fontSize={'20px'} mb={'22px'} color={"var(--primary-color)"}>
                Search Service
              </Text>
              <FormControl as="fieldset">
                <Input
                  h={'64px'}
                  bgColor={'#fff'}
                  border={'unset'}
                  id="place"
                  type="text"
                  placeholder="Where to"
                  px={'16px'}
                  mb={'10px'}
                />
                <Input
                  h={'64px'}
                  bgColor={'#fff'}
                  border={'unset'}
                  id="time"
                  type="text"
                  placeholder="When"
                  px={'16px'}
                  mb={'10px'}
                />
                <Box
                  bgColor="white"
                  h={'64px'}
                  minW={'210px'}
                  mb={'10px'}
                  position={'relative'}
                  fontSize={'16px'}
                  pl={'18px'}
                  pr={'30px'}
                  cursor={'pointer'}
                  display={'flex'}
                  alignItems={'center'}
                  _after={{
                    content: '""',
                    position: 'absolute',
                    display: 'block',
                    height: '5px',
                    width: '5px',
                    marginTop: '-4px',
                    top: '50%',
                    right: '12px',
                    borderBottom: '2px solid #999',
                    borderRight: '2px solid #999',
                    transformOrigin: '66% 66%',
                    transform: `rotate(${showSort ? '-135' : '45'}deg)`,
                    transition: 'all .15s ease-in-out',
                  }}
                  onClick={() => setShowSort(!showSort)}
                >
                  <Text color={'#1a202c'}>{OPTION_SECLECT[select]}</Text>
                  <Box
                    position={'absolute'}
                    top={'110%'}
                    rounded={'sm'}
                    left={'0px'}
                    bgColor={'white'}
                    opacity={showSort ? '1' : '0'}
                    w={'full'}
                    boxShadow={'0 0 0 1px rgb(68 68 68 / 11%)'}
                    zIndex={9}
                    transition={
                      'all .2s cubic-bezier(.5,0,0,1.25),opacity .15s ease-out'
                    }
                    userSelect={'none'}
                    fontSize={'16px'}
                  >
                    {OPTION_SECLECT.map((opt, index) => {
                      return (
                        <Box
                          key={index}
                          fontSize={'16px'}
                          py={'10px'}
                          pl={'10px'}
                          pr={'5px'}
                          _hover={{ bgColor: '#f6f6f6' }}
                          onClick={() => setSelect(index)}
                        >
                          {opt}
                        </Box>
                      );
                    })}
                  </Box>
                </Box>
                <Button h={'64px'} w={'100%'} bgColor={'#006E7F'} color={'#fff'}>
                  SEARCH
                </Button>
              </FormControl>
            </Box>
            <Box
              border={'1px solid #ebe6de'}

              
              rounded={'15px'}
              px={'50px'}
              py={'42px'}
              mt={'30px'}
            >
              <FormControl as="fieldset">
                <Box mb={'30px'}>
                  <Box
                    display={'flex'}
                    justifyContent={'space-between'}
                    mb={'24px'}
                    borderBottom={'1px solid #CBD5E0'}
                  >
                    <Text fontWeight={'600'} fontSize={'20px'} pb={'5px'} color={"var(--primary-color)"}>
                      Price
                    </Text>
                    <RiArrowDropDownLine
                      onClick={() => {
                        setOptionPrice(!optionPrice);
                      }}
                      size={'26'}
                    />
                  </Box>
  
                  <Box px={'0px'} display={optionPrice ? 'block' : 'none'}>
                    <RadioGroup onChange={setValue} value={value}>
                      <Stack direction="row">
                        <Radio value="1">Ascending</Radio>
                        <Radio value="2">Descending</Radio>
                      </Stack>
                    </RadioGroup>
                  </Box>
                </Box>
  
                <Box mb={'30px'}>
                  <Box
                    display={'flex'}
                    justifyContent={'space-between'}
                    mb={'24px'}
                    borderBottom={'1px solid #CBD5E0'}
                  >
                    <Text fontWeight={'600'} fontSize={'20px'} pb={'5px'} color={"var(--primary-color)"}>
                      Categories
                    </Text>
                    <RiArrowDropDownLine
                      onClick={() => {
                        setOptionCategory(!optionCategory);
                      }}
                      size={'26'}
                    />
                  </Box>
  
                  <Box px={'0px'} display={optionCategory ? 'block' : 'none'}>
                    <Stack spacing={5} display={'flex'} flexDir={'column'}>
                      {/* <Checkbox>City Tours</Checkbox>
                      <Checkbox marginLeft={'0px'}>HostedTour</Checkbox>
                      <Checkbox>Adventure Tours</Checkbox>
                      <Checkbox>Group Tours</Checkbox>
                      <Checkbox>Couple Tours</Checkbox> */}
                    </Stack>
                  </Box>
                </Box>
  
                <Box mb={'30px'}>
                  <Box
                    display={'flex'}
                    justifyContent={'space-between'}
                    mb={'24px'}
                    borderBottom={'1px solid #CBD5E0'}
                  >
                    <Text fontWeight={'600'} fontSize={'20px'} pb={'5px'} color={"var(--primary-color)"}>
                      Duration
                    </Text>
                    <RiArrowDropDownLine
                      onClick={() => {
                        setOptionDuration(!optionDuration);
                      }}
                      size={'26'}
                    />
                  </Box>
  
                  <Box px={'0px'} display={optionDuration ? 'block' : 'none'}>
                    <Stack spacing={5} display={'flex'} flexDir={'column'}>
                      <Checkbox pb={'20px'}>0 - 24 hours</Checkbox>
                      <Checkbox pb={'20px'}>1 - 2 days</Checkbox>
                      <Checkbox pb={'20px'}>2 - 3 days</Checkbox>
                      <Checkbox pb={'20px'}>4 - 5 days</Checkbox>
                      <Checkbox pb={'20px'}>5 - 10 days</Checkbox>
                    </Stack>
                  </Box>
                </Box>
              </FormControl>
            </Box>
          </Box>
  
          <Box maxW={'66.66666%'} w={"full"}>
              <Services />         
          </Box>
        </Box>
      </Container>
    );
  }
  
  export default ServiceList;
  