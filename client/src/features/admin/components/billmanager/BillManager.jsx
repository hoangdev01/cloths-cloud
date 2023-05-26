import React, { useState, useEffect } from 'react';
import BookmarksIcon from '@mui/icons-material/Bookmarks';

import billApi from '../../../../api/billApi';
import './billmanager.scss';
import { ClassNames } from '@emotion/react';
import moment from 'moment';
import { Table, Space, Input, Modal, Button } from 'antd';
const { Search } = Input;

const BillManager = () => {

  const [listBill, setListBill] = useState([]);

  const [isModalShowVisible, setIsModalShowVisible] = useState(false);
  const [isModalUpdateVisible, setIsModalUpdateVisible] = useState(false);
  const [isModalConfirmVisible, setIsModalConfirmVisible] = useState(false);
  const [isModalCancelVisible, setIsModalCancelVisible] = useState(false);
  const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);
  const [modelCurrentAction, setModelCurrentAction] = useState(false);

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

  const showShowModal = () => {
    setIsModalShowVisible(true);
  };
  const handleShowOk = () => {
    setIsModalShowVisible(false);
  };
  const handleShowCancel = () => {
    setIsModalShowVisible(false);
  };

  const showUpdateModal = () => {
    setIsModalUpdateVisible(true);
  };
  const handleUpdateOk = () => {
    setIsModalUpdateVisible(false);
  };
  const handleUpdateCancel = () => {
    setIsModalUpdateVisible(false);
  };

  const showConfirmModal = () => {
    setIsModalConfirmVisible(true);
  };
  const handleConfirmOk = () => {
    setIsModalConfirmVisible(false);
  };
  const handleConfirmCancel = () => {
    setIsModalConfirmVisible(false);
  };

  const showCancelModal = () => {
    setIsModalCancelVisible(true);
  };
  const handleCancelOk = () => {
    setIsModalCancelVisible(false);
  };
  const handleCancelCancel = () => {
    setIsModalCancelVisible(false);
  };

  const showDeleteModal = () => {
    setIsModalDeleteVisible(true);
  };
  const handleDeleteOk = () => {
    setIsModalDeleteVisible(false);
  };
  const handleDeleteCancel = () => {
    setIsModalDeleteVisible(false);
  };

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      render: text => String(text),
      filterMode: 'tree',
    },
    {
      title: 'User id',
      dataIndex: 'userId',
      render: text => String(text),
      sorter: (a, b) => a.userId - b.userId,
    },
    {
      title: 'Total price',
      dataIndex: 'totalPrice',
      render: text => String(text),
      sorter: (a, b) => a.totalPrice - b.totalPrice,
    },
    {
      title:'Status',
      dataIndex: 'status',
      render: text => String(text),
      sorter: (a, b) => a.totalPrice - b.totalPrice,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix(),
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a, b) => moment(a.createdAt).unix() - moment(b.createdAt).unix(),
    },
    {
      title: 'Updated At',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      sorter: (a, b) => moment(a.updatedAt).unix() - moment(b.updatedAt).unix(),
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
            class="btn btn-info"
            onClick={() => {
              setModelCurrentAction(record);
              showUpdateModal();
            }}
          >
            Update
          </button>
          <button
            type="button"
            class="btn btn-success"
            onClick={() => {
              setModelCurrentAction(record);
              showConfirmModal();
            }}
          >
            Confirm
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            onClick={() => {
              setModelCurrentAction(record);
              showCancelModal();
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            class="btn btn-danger"
            onClick={() => {
              setModelCurrentAction(record);
              showDeleteModal();
            }}
          >
            Delete
          </button>
        </Space>
      ),
    }

  ]

  return (
    <>
      <Modal
        title="SHOW CURRENT BILL'S DETAILS"
        visible={isModalShowVisible}
        onOk={handleShowOk}
        onCancel={handleShowCancel}
      >
        <div class="form-group">
          <label for="name">Price: (VND)</label>
          <input type="price" class="form-control" id="price" placeholder="Enter username" value={modelCurrentAction.totalPrice}></input>
        </div>

        <p>Thêm id hoặc username của người dùng ở đây nha</p>
        
        <div class="dropdown">
          <label>Status: </label>
          <select name="status" id="status" class="form-control">
            <option value="unpaid">Unpaid</option>
            <option value="paid">Paid</option>
          </select>
        </div>

        <div class="date">
          <label for="date">Date: </label>
          <input type="date" class="form-control" id="date" value={modelCurrentAction.date}></input>
          <label for="createat">Create at: </label>
          <input type="date" class="form-control" id="createat" value={modelCurrentAction.createdAt}></input>
          <label for="updateat">Update at: </label>
          <input type="date" class="form-control" id="updateat" value={modelCurrentAction.updatedAt}></input>
        </div>
      </Modal>
      <Modal
        title="Update user's informations"
        visible={isModalUpdateVisible}
        onOk={handleUpdateOk}
        onCancel={handleUpdateCancel}
      >
        <div class="form-group">
          <label for="name">Price: (VND)</label>
          <input type="price" class="form-control" id="price" placeholder="Enter username" value={modelCurrentAction.totalPrice}></input>
        </div>
        
        <p>Thêm id hoặc username của người dùng ở đây nha(Không được chỉnh sửa)</p>

        <div class="dropdown">
          <label>Status: </label>
          <select name="status" id="status" class="form-control">
            <option value="unpaid">Unpaid</option>
            <option value="paid">Paid</option>
          </select>
        </div>

        <div class="date">
          <label for="date">Date: </label>
          <input type="date" class="form-control" id="date" value={modelCurrentAction.date}></input>          
        </div>
      </Modal>
      <Modal
        title="CONFIRM CURRENT BILL'S DETAILS"
        visible={isModalConfirmVisible}
        onOk={handleConfirmOk}
        onCancel={handleConfirmCancel}
      >
        <div class="form-group">
          <label for="name">Price: (VND)</label>
          <input type="price" class="form-control" id="price" placeholder="Enter username" value={modelCurrentAction.totalPrice}></input>
        </div>
        
        <p>Thêm id hoặc username của người dùng ở đây nha</p>

        <div class="dropdown">
          <label>Status: </label>
          <select name="status" id="status" class="form-control">
            <option value="unpaid">Unpaid</option>
            <option value="paid">Paid</option>
          </select>
        </div>

        <div class="date">
          <label for="date">Date: </label>
          <input type="date" class="form-control" id="date" value={modelCurrentAction.date}></input>
          <label for="createat">Create at: </label>
          <input type="date" class="form-control" id="createat" value={modelCurrentAction.createdAt}></input>
          <label for="updateat">Update at: </label>
          <input type="date" class="form-control" id="updateat" value={modelCurrentAction.updatedAt}></input>
        </div>
      </Modal>

      <Modal
        title="CANCEL CURRENT BILL'S DETAILS"
        visible={isModalCancelVisible}
        onOk={handleCancelOk}
        onCancel={handleCancelCancel}
      >
        <p>ARE YOU SURE TO CANCEL THIS BILL?</p>
        {modelCurrentAction.totalPrice},
        {modelCurrentAction.status} 
        {modelCurrentAction.date},
 
      </Modal>

      <Modal
        title="Delete Modal"
        visible={isModalDeleteVisible}
        onOk={handleDeleteOk}
        onCancel={handleDeleteCancel}
      >
        <p>Model Delete</p>
        <p>Are you sure to delete this bill?</p>
        {modelCurrentAction.totalPrice} VND,
        {modelCurrentAction.status}
        {modelCurrentAction.date},

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
  )
};

export default BillManager;
