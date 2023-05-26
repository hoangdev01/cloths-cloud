import React, { useEffect, useState } from 'react';
import ImageSlider from '../servicedetail/slide/index.jsx';
import { SliderData } from './slide/slidedata.jsx';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { RiGuideFill, RiLeafLine } from 'react-icons/ri';
import {
  Box,
  Container,
  List,
  Text,
  ListIcon,
  ListItem,
  Button,
  FormControl,
} from '@chakra-ui/react';
import { BiMinus } from 'react-icons/bi';
import { BiPlus } from 'react-icons/bi';
import { MdCheckCircle } from 'react-icons/md';
import style from './style.css';
import CartApi from '../../api/cartApi.js';
import FBComment from '../../components/social/FbComment.jsx';
import serviceAPI from '../../api/serviceApi.js';

const ServiceDetail = () => {
  const slug = useParams().slug;
  const [id, setId] = useState('');
  const [service, setService] = useState();
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [guide, setGuide] = useState('');
  const [price, setPrice] = useState();
  let [numChild, setNumChild] = useState(0);
  let [numAdults, setNumAdults] = useState(0);

  let [show, setShow] = useState(false);

  let incNumChild = () => {
    setNumChild(Number(++numChild));
    console.log(numChild);
  };

  let decNumChild = () => {
    if (numChild > 0) {
      setNumChild(--numChild);
    }
  };

  let handleChangeChild = e => {
    setNumChild(e.target.value);
  };

  let incNumAdults = () => {
    setNumAdults(Number(++numAdults));
  };

  let decNumAdults = () => {
    if (numAdults > 0) {
      setNumAdults(--numAdults);
    }
  };

  let handleChangeAdults = e => {
    setNumAdults(e.target.value);
  };

  let showModal = () => {
    setShow(!show);
  };

  const numberOfChild = document.getElementById('numberOfChild_input');
  const numberOfAdults = document.getElementById('numberOfAdults_input');
  const totalPrice = document.getElementById('price_input');

  useEffect(() => {
    serviceAPI
      .getService(slug)
      .then(res => {
        const service = res.data.service;
        setId(service.id);
        setService(service);
        setName(service.name);
        setPrice(service.price);
        setDescription(service.description);
        setTitle(service.title);
        setGuide(service.guide);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleClick = () => {
    const child = numChild;

    console.log(child);
    console.log(typeof child);
    const adults = Number(
      document.getElementById('numberOfAdults_input').value
    );
    console.log(adults);
    const quanlity = child + adults;
    const total = Number(totalPrice.value);

    const service = {
      amount: 1,
      serviceId: id,
      numberOfPeople: quanlity,
      numberOfChild: child,
    };

    CartApi.addCart(service)
      .then(res => {
        console.log(res);
        console.log('Phuong Tram');
      })
      .catch(err => {
        console.log(err);
      });

    setShow(!show);
  };

  return (
    <Container maxW={'1200px'}>
      <ImageSlider slides={SliderData}> </ImageSlider>
      <Box maxW={'full'} mt={'20px'}>
        <Text fontWeight={'600'} fontSize={'30px'} color={'var(--text-color)'}>
          {name}
        </Text>
        <Text>
          {title.split('-').map((tit, index) => (
            <Box my={'10px'} key={index}>
              {tit === '' ? (
                ''
              ) : (
                <Text display={'flex'}>
                  <RiLeafLine />
                  <Text my={'-5px'} mx={'10px'}>
                    {tit}
                  </Text>
                </Text>
              )}
            </Box>
          ))}
        </Text>
        <Box>{/** Description */}</Box>
        <Text fontWeight={'600'} mt={'20px'} color={'var(--text-color)'}>
          LỊCH TRÌNH BAO GỒM
        </Text>
        <List mt={'20px'}>
          {guide.split('-').map((gui, index) => (
            <ListItem key={index}>{gui}</ListItem>
          ))}
        </List>
        <Box fontWeight={'600'} mt={'20px'} display={'flex'}>
          <Text mr={'5px'}>CHI PHÍ:</Text>
          <Text
            color={'var(--primary-color)'}
            fontWeight={'400'}
            fontSize={'18px'}
          >
            {
              //  price.toLocaleString('vi', {style : 'currency', currency : 'VND'})
              (price + 0).toLocaleString('vi', {
                style: 'currency',
                currency: 'VND',
              })
            }
          </Text>
        </Box>

        <Box
          maxWidth={'150px'}
          px={'10px'}
          py={'8px'}
          mt={'16px'}
          textAlign={'center'}
          bgColor="var(--button-color)"
          color={'blackAlpha.900'}
          fontWeight={'600'}
          cursor={'pointer'}
          _hover={{
            backgroundColor: 'var(--hover-color)',
          }}
          onClick={showModal}
        >
          Thêm vào giỏ hàng
        </Box>
      </Box>

      {/* Modal layout*/}
      <Box
        className="modal"
        position={'fixed'}
        top={'0'}
        right={'0'}
        bottom={'0'}
        left={'0'}
        display={show == true ? 'flex' : 'none'}
      >
        <Box
          className="modal_overlay"
          position={'absolute'}
          width={'100%'}
          height={'100%'}
          bgColor={'rgba(0, 0, 0, 0.4)'}
          zIndex={'1'}
        ></Box>
        <Box
          className="modal_body"
          id="modal_body"
          width={'460px'}
          height={'400px'}
          bgColor={'white'}
          margin={'auto'}
          zIndex={'2'}
        >
          <Box className="modal_inner">
            <form className="form_order">
              <div>
                <Text
                  fontWeight={'500'}
                  fontSize={'18px'}
                  color={'var(--primary-color)'}
                >
                  Khu du lịch {name}
                </Text>
                <hr></hr>
                <div className="input_time">
                  <div className="title_input">Ngày khởi hành</div>

                  <input type="date" id="time_input"></input>
                </div>
                <div className="input_amount_child">
                  <div className="title_input">Số lượng trẻ em: </div>
                  <button type="button" onClick={decNumChild}>
                    <BiMinus />
                  </button>
                  <input
                    type="number"
                    value={numChild}
                    onChange={handleChangeChild}
                    id="numberOfChild_input"
                  ></input>
                  <button type="button" onClick={incNumChild}>
                    <BiPlus />
                  </button>
                </div>
                <div className="input_amount_adults">
                  <div className="title_input">Số lượng người lớn: </div>
                  <button type="button" onClick={decNumAdults}>
                    <BiMinus />
                  </button>
                  <input
                    type="number"
                    value={numAdults}
                    onChange={handleChangeAdults}
                    id="numberOfAdults_input"
                  ></input>
                  <button type="button" onClick={incNumAdults}>
                    <BiPlus />
                  </button>
                </div>
                <div className="input_amount_price">
                  <div className="title_input">Giá trị thanh toán: </div>
                  <input value={price} id="price_input"></input>
                </div>
                <button className="button_cancel" onClick={setShow}>
                  Cancel
                </button>
                <button
                  type="button"
                  className="button_buy"
                  onClick={handleClick}
                >
                  Thêm vào giỏ hàng
                </button>
              </div>
            </form>
          </Box>
        </Box>
      </Box>
      <FBComment></FBComment>
    </Container>
  );
};

export default ServiceDetail;
