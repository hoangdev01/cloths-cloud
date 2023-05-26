import React, { useEffect, useState } from 'react';
import userApi from '../../../../api/userApi';
import { Table, Space, Input, Modal, Button } from 'antd';

import './employeemanager.scss';
import 'antd/dist/antd.css';
import { ClassNames } from '@emotion/react';
import moment from 'moment';

import BookmarksIcon from '@mui/icons-material/Bookmarks';
const { Search } = Input;

const EmployeeManager = () => {

  const [successStatus, setSuccessStatus] = useState('');
  const [listEmployee, setListEmployee] = useState([]);
  const [listEmployeeAll, setListEmployeeAll] = useState([]); 
  const [searchValue, setSearchValue] = useState('');

  const [actionChange, setActionChange] = useState(true);

  const [isModalShowVisible, setIsModalShowVisible] = useState(false);
  const [isModalUpdateVisible, setIsModalUpdateVisible] = useState(false);
  const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);
  const [modelCurrentAction, setModelCurrentAction] = useState(false);

  useEffect(() => {
    userApi
      .getEmployeeList()
      .then(response => {
        setListEmployee(response.data.listUser);
        console.log(response.data);
      })
      .catch(error => {
        console.log('Failed to fetch EmployeeList:', error);
      });
  }, [actionChange]);


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
    setSuccessStatus('');
    setIsModalUpdateVisible(true);
    
  };
  const handleUpdateOk = () => {
    // setIsModalUpdateVisible(false);
    userApi
    .EmployeeToUser({userId: modelCurrentAction.id})
    .then(response => {
      if (response.data.success) {
        alert('Update user successful');
        setActionChange(!actionChange);
        setIsModalUpdateVisible(false);
      } else setSuccessStatus('Cannot get to update employee',response.data.message);
    })
    .catch(error => {
      console.log(error);
      setSuccessStatus('Can not update employee');
    });
  };
  const handleUpdateCancel = () => {
    setIsModalUpdateVisible(false);
  };

  const showDeleteModal = () => {
    // setIsModalDeleteVisible(true);
    setSuccessStatus('');
    setIsModalDeleteVisible(true);
  };
  const handleDeleteOk = () => {
    userApi
    .activeUser({userId: modelCurrentAction.id})
    .then(response => {
      if (response.data.success) {
        alert('Update user successful');
        setActionChange(!actionChange);
        setIsModalDeleteVisible(false);
      } else setSuccessStatus('Cannot get to update user',response.data.message);
    })
    .catch(error => {
      console.log(error);
      setSuccessStatus('Can not update user');
    });
  };
  const handleDeleteCancel = () => {
    setIsModalDeleteVisible(false);
  };
  const searchClick = () => {
    const filteredData = listEmployeeAll.filter(
      entry =>
        entry.id.toString().toLowerCase().includes(searchValue.toLowerCase()) ||
        (entry.name || '')
          .toString()
          .toLowerCase()
          .includes(searchValue.toLowerCase()) ||
        (entry.phone_number || '').toLowerCase() == searchValue.toLowerCase()
    );
    setListEmployee(filteredData);
  };

  const searchChange = user => setSearchValue(user.target.value);

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      filterMode: 'tree',
      width: 100,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: 'Is active',
      dataIndex: 'active',
      render: text => String(text),
      sorter: (a, b) => a.active - b.active,
    },
    {
      title: 'Phone number',
      dataIndex: 'phone_number',
      render: text => String(text),
      sorter: (a, b) => a.active - b.active,
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      render: text => String(text),
      sorter: (a, b) => a.gender - b.gender,
    },
    {
      title: 'Date of birth',
      dataIndex: 'date_of_birth',
      render: text => String(text),
      sorter: (a, b) => a.date_of_birth - b.date_of_birth,
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
            class="btn btn-success"
            onClick={() => {
              setModelCurrentAction(record);
              showUpdateModal();
            }}
          >
            Update
          </button>
          <button
            type="button"
            class={record.active ? "btn btn-danger" : "btn btn-info"}
            onClick={() => {
              setModelCurrentAction(record);
              showDeleteModal();
            }}
          >
            {record.active ? "Unactive" : "Active"}
          </button>
        </Space>
      ),
    },
  ]
  return (
    <>
    <Modal
      title="Show employee's informations" 
      visible={isModalShowVisible}
      onOk={handleShowOk}
      onCancel={handleShowCancel}
    >
      <p>SHOW {modelCurrentAction.name}'s INFORMATIONS</p>
      <div class="form-group">
        <label for="id">ID: </label>
        <input
          type="text"
          readonly
          class="form-control"
          id="id"
          value={modelCurrentAction.id}
          disabled
        ></input>
      </div>
      <div class="form-group">
        <label for="name">Name: </label>
        <input type="text" class="form-control" id="name" value={modelCurrentAction.name} disabled></input>
      </div>
      
      <div class="form-group">
        <label for="name">Phone number: </label>
        <input type="text" class="form-control" id="phone_number" value={modelCurrentAction.phone_number} disabled></input>
      </div>
      
      
      <label>Gender: </label>
      <select name="gender" id="gender" class="form-control" value={modelCurrentAction.gender} disabled>
        <option value="nam">Nam</option>
        <option value="nu">Nữ</option>
      </select>
      
      <div class="date">
        <label for="birthday">Date of birth: </label>
        <input type="date" class="form-control" id="birthday" value={modelCurrentAction.date_of_birth} disabled></input>
      </div>
    </Modal>
    <Modal
      title="Update employee's informations"
      visible={isModalUpdateVisible}
      onOk={handleUpdateOk}
      onCancel={handleUpdateCancel}
    >
      <p>ARE YOU SURE TO CHANGE {modelCurrentAction.name} INTO USER'S ROLE</p>
      <div class="form-group">
        <label for="id">ID: </label>
        <input
          type="text"
          readonly
          class="form-control"
          id="id"
          value={modelCurrentAction.id}
          disabled
        ></input>
      </div>
      <div class="form-group">
        <label for="name">Name: </label>
        <input type="text" class="form-control" id="name" value={modelCurrentAction.name} disabled></input>
      </div>
      <div class="form-group">
        <i style={{ color: 'red' }}>{successStatus}</i>
      </div>
    </Modal>
    <Modal
      title="Delete"
      visible={isModalDeleteVisible}
      onOk={handleDeleteOk}
      onCancel={handleDeleteCancel}
    >
      <p>ARE YOU SURE TO {modelCurrentAction.active ? ("UNACTIVE") : ("ACTIVE")} {modelCurrentAction.name}</p>
      <div class="form-group">
        <label for="id">ID: </label>
        <input
          type="text"
          readonly
          class="form-control"
          id="id"
          value={modelCurrentAction.id}
          disabled
        ></input>
      </div>
      <div class="form-group">
        <label for="name">Name: </label>
        <input type="text" class="form-control" id="name" value={modelCurrentAction.name} disabled></input>
      </div>
    </Modal>
    <div className="employee-utilities">
      <Search
        allowClear
        className="search"
        placeholder="Input search text"
        enterButton
        onSearch={searchClick}
        value={searchValue}
        onChange={searchChange}
      />
    </div>
    <div className="employee-table-container">
      <Table
        className="employee-table"
        scroll={{
          x: 1200,
        }}
        columns={columns}
        dataSource={listEmployee}
      />
    </div>
  </>
  )

};

export default EmployeeManager;
