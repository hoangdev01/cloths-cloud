import React, { useState, useEffect } from 'react';

import billApi from '../../../../api/billApi';
import './billmanager.scss';
import moment from 'moment';
import { Table, Space, Input, Modal, Button, message } from 'antd';

import {
  Center,
  Flex,
  Heading,
  Image,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react';
import image from '../../../../assets/cloth.jpg';
import { mediaUrl } from '../../../../api/constants';
import copy from 'copy-to-clipboard';

const { Search } = Input;

const BillManager = () => {
  const [listBill, setListBill] = useState([]);

  const [isModalShowVisible, setIsModalShowVisible] = useState(false);
  const [isModalConfirmVisible, setIsModalConfirmVisible] = useState(false);
  const [isModalCancelVisible, setIsModalCancelVisible] = useState(false);
  const [modelCurrentAction, setModelCurrentAction] = useState(false);
  const [billDetail, setBillDetail] = useState([]);

  const getDefaultImage = listImage => {
    return listImage.find(image => image.is_avatar)
      ? `${mediaUrl}/${listImage.find(image => image.is_avatar).name}`
      : image;
  };

  useEffect(() => {
    billApi
      .getAll()
      .then(response => {
        setListBill(response.data.listBill);
        console.log(response.data);
      })
      .catch(error => {
        console.log('Failed to fetch BillList:', error);
      });
  }, []);

  useEffect(() => {
    if (modelCurrentAction.id)
      billApi
        .get(modelCurrentAction.id)
        .then(response => {
          setBillDetail(response.data.bill);
        })
        .catch(error => {
          console.log('Failed to fetch BillList:', error);
        });
  }, [modelCurrentAction]);

  const showShowModal = () => {
    setIsModalShowVisible(true);
  };
  const handleShowOk = () => {
    setIsModalShowVisible(false);
  };
  const handleShowCancel = () => {
    setIsModalShowVisible(false);
  };

  const showConfirmModal = () => {
    setIsModalConfirmVisible(true);
  };
  const handleConfirmOk = () => {
    if (modelCurrentAction.id)
      billApi.confirm({ billId: modelCurrentAction.id }).then(res => {
        if (res.data.success) message.success('This bill is confirmed');
        else message.success('Can not confirm this bill');
        billApi
          .getAll()
          .then(response => {
            setListBill(response.data.listBill);
            setIsModalConfirmVisible(false);
          })
          .catch(error => {
            console.log('Failed to fetch BillList:', error);
          });
      });
  };
  const handleConfirmCancel = () => {
    setIsModalConfirmVisible(false);
  };

  const showCancelModal = () => {
    setIsModalCancelVisible(true);
  };
  const handleCancelOk = () => {
    if (modelCurrentAction.id)
      billApi.cancel({ billId: modelCurrentAction.id }).then(res => {
        if (res.data.success) message.success('This bill is canceled');
        else message.success('Can not cancel this bill');
        billApi
          .getAll()
          .then(response => {
            setListBill(response.data.listBill);
          })
          .catch(error => {
            console.log('Failed to fetch BillList:', error);
          });
      });
    setIsModalCancelVisible(false);
  };
  const handleCancelCancel = () => {
    setIsModalCancelVisible(false);
  };

  const columns = [
    {
      title: 'User id',
      dataIndex: 'userId',
      render: (text, record) => record.user.name || 'Unknow',
      sorter: (a, b) => a.userId - b.userId,
      onCell: record => ({
        title: 'Click to copy user ID',
        onClick: () => {
          copy(record.userId.toString());
          message.success('User id copied!');
        },
      }),
    },
    {
      title: 'Total price',
      dataIndex: 'totalPrice',
      render: text => String(text),
      sorter: (a, b) => a.totalPrice - b.totalPrice,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: text => String(text),
      sorter: (a, b) => a.totalPrice - b.totalPrice,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix(),
      render: text => {
        if (!text) return;
        const date = new Date(text);
        const formattedDate = `${date.getDate()}/${
          date.getMonth() + 1
        }/${date.getFullYear()}`;
        const formattedTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        return `${formattedDate} ${formattedTime}`;
      },
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a, b) => moment(a.createdAt).unix() - moment(b.createdAt).unix(),
      render: text => {
        if (!text) return;
        const date = new Date(text);
        const formattedDate = `${date.getDate()}/${
          date.getMonth() + 1
        }/${date.getFullYear()}`;
        const formattedTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        return `${formattedDate} ${formattedTime}`;
      },
    },
    {
      title: 'Updated At',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      sorter: (a, b) => moment(a.updatedAt).unix() - moment(b.updatedAt).unix(),
      render: text => {
        if (!text) return;
        const date = new Date(text);
        const formattedDate = `${date.getDate()}/${
          date.getMonth() + 1
        }/${date.getFullYear()}`;
        const formattedTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        return `${formattedDate} ${formattedTime}`;
      },
    },

    {
      title: 'Action',
      key: 'action',
      render: (index, record) => (
        <Space className="action-button" size="middle">
          <button
            type="button"
            class="btn btn-primary"
            onClick={() => {
              setModelCurrentAction(record);
              showShowModal();
            }}
          >
            Show
          </button>
          <button
            type="button"
            className={`btn btn-success ${
              record.status === 'paid' ? 'hidden-button' : ''
            }`}
            onClick={() => {
              setModelCurrentAction(record);
              showConfirmModal();
            }}
          >
            Confirm
          </button>
          <button
            type="button"
            className={`btn btn-secondary ${
              record.status === 'cancelled' ? 'hidden-button' : ''
            }`}
            onClick={() => {
              setModelCurrentAction(record);
              showCancelModal();
            }}
          >
            Cancel
          </button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Modal
        title="SHOW CURRENT BILL'S DETAILS"
        visible={isModalShowVisible}
        onOk={handleShowOk}
        onCancel={handleShowCancel}
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        {billDetail?.billDetails
          ? billDetail.billDetails.map(item => (
              <Center py={6}>
                <Stack
                  borderWidth="1px"
                  borderRadius="lg"
                  w={{ sm: '90%', md: '90%' }}
                  height={{ sm: '300px', md: '10rem' }}
                  direction={{ base: 'column', md: 'row' }}
                  bg={'white'}
                  boxShadow={'2xl'}
                  padding={4}
                >
                  <Flex flex={1}>
                    <Link
                      href={
                        item.instance?.service
                          ? `/cloth-detail/${item.instance?.service?.slug}`
                          : ''
                      }
                    >
                      <Image
                        objectFit="contain"
                        boxSize="100%"
                        src={
                          item?.instance?.service
                            ? getDefaultImage(item.instance.service.images)
                            : image
                        }
                        cursor="pointer"
                        _hover={{ transform: 'scale(1.1)' }}
                        transition="transform 0.1s ease"
                      />
                    </Link>
                  </Flex>
                  <Stack
                    flex={2}
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    p={1}
                    pt={2}
                  >
                    <Heading fontSize={'2xl'} fontFamily={'body'}>
                      {item.instance?.service?.name || 'no data'}
                    </Heading>
                    <Text fontWeight={600} color={'gray.500'} size="sm" mb={0}>
                      Color: {item.instance?.color || 'no data'}
                    </Text>
                    <Text fontWeight={600} color={'gray.500'} size="sm" mb={0}>
                      Size: {item.instance?.size || 'no data'}
                    </Text>
                    <Text fontWeight={600} color={'gray.500'} size="sm" mb={0}>
                      Amount: {item.amount || 'no data'}
                    </Text>
                  </Stack>
                </Stack>
              </Center>
            ))
          : null}
      </Modal>
      <Modal
        title="CONFIRM CURRENT BILL'S DETAILS"
        visible={isModalConfirmVisible}
        onOk={handleConfirmOk}
        onCancel={handleConfirmCancel}
      >
        <p>CONFIRM THIS BILL?</p>
      </Modal>

      <Modal
        title="CANCEL CURRENT BILL'S DETAILS"
        visible={isModalCancelVisible}
        onOk={handleCancelOk}
        onCancel={handleCancelCancel}
      >
        <p>ARE YOU SURE TO CANCEL THIS BILL?</p>
      </Modal>

      <div className="bill-utilities">
        <Search
          className="search"
          placeholder="Input search text"
          enterButton
        />
      </div>

      <div className="bill-table-container">
        <Table
          className="bill-table"
          scroll={{
            x: 1200,
          }}
          columns={columns}
          dataSource={listBill}
        />
      </div>
    </>
  );
};

export default BillManager;
