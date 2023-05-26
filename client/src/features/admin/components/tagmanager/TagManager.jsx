import React from 'react';
import './tagmanager.scss';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import tagApi from '../../../../api/tagApi';
import { useState, useEffect } from 'react';
import { Table, Space, Input, Modal, Button } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';
import UploadBox from '../../../../components/upload-box/upload-box';
const { Search } = Input;

const TagManager = () => {
  const entryModal = {
    name: '',
    title: '',
    description: '',
    guide: '',
    price: '',
    is_active: '',
  };
  const [successStatus, setSuccessStatus] = useState('');
  // const [categoryId, setCategoryId] = useState([]);
  const [listTag, setListTag] = useState([]);
  const [listTagAll, setListTagAll] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [isModalAddVisible, setIsModalAddVisible] = useState(false);
  const [isModalImageVisible, setIsModalImageVisible] = useState(false);
  const [isModalUpdateVisible, setIsModalUpdateVisible] = useState(false);
  const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);
  const [modelCurrentAction, setModelCurrentAction] = useState(false);
  const [actionChange, setActionChange] = useState(true);
  const { name, description } = modelCurrentAction;
  useEffect(() => {
    tagApi
      .getListTag()
      .then(response => {
        setListTag(response.data.listTag);
        console.log(response.data.listTag);
        // setCategoryId(response.data.categoryId);
      })
      .catch(error => {
        console.log(error);
      });
  }, [actionChange]);
  const showAddModal = () => {
    setSuccessStatus('');
    setIsModalAddVisible(true);
    setModelCurrentAction(entryModal);
  };
  const handleAddOk = async () => {
    if (name == '' || description == '' ) {
      setSuccessStatus('Not enough infomation');
      return;
    }
    // var temp = modelCurrentAction;
    // // temp.categoryId = categoryId;
    // setModelCurrentAction(temp);
    tagApi
      .create(modelCurrentAction)
      .then(response => {
        if (response.data.success) {
          setModelCurrentAction(entryModal);
          alert('Add tag successfully');
          setActionChange(!actionChange);
          setIsModalAddVisible(false);
        } else setSuccessStatus(response.data.message);
      })
      .catch(error => {
        console.log(error);
        setSuccessStatus('Can not create tag');
      });
  };
  const handleAddCancel = () => {
    setIsModalAddVisible(false);
  };
  const showImageModal = () => setIsModalImageVisible(true);
  const handleImageOk = () => setIsModalImageVisible(false);
  const showUpdateModal = () => {
    setSuccessStatus('');
    setIsModalUpdateVisible(true);
  };
  const handleUpdateOk = () => {
    if (name == '' || description == '' ) {
      setSuccessStatus('Not enough infomation');
      return;
    }
    // var temp = modelCurrentAction;
    // temp.categoryId = categoryId;
    // setModelCurrentAction(temp);
    tagApi
      .update(modelCurrentAction)
      .then(response => {
        if (response.data.success) {
          setModelCurrentAction(entryModal);
          alert('Updated tag successfully');
          setActionChange(!actionChange);
          setIsModalUpdateVisible(false);
        } else setSuccessStatus(response.data.message);
      })
      .catch(error => {
        console.log(error);
        setSuccessStatus('Can not update tag');
      });
  };
  const handleUpdateCancel = () => setIsModalUpdateVisible(false);
  const showDeleteModal = () => setIsModalDeleteVisible(true);
  const handleDeleteOk = () => {
    tagApi
      .delete(modelCurrentAction.id)
      .then(response => {
        if (response.data.success) {
          setModelCurrentAction(entryModal);
          alert('Service deleted successful');
          setActionChange(!actionChange);
          setIsModalDeleteVisible(false);
        } else setSuccessStatus(response.data.message);
      })
      .catch(error => {
        console.log(error);
      });
  };
  const handleDeleteCancel = () => setIsModalDeleteVisible(false);

  const searchClick = () => {
    const filteredData = listTagAll.filter(
      entry =>
        entry.id.toString().toLowerCase().includes(searchValue.toLowerCase()) ||
        entry.name
          .toString()
          .toLowerCase()
          .includes(searchValue.toLowerCase()) ||
        entry.price.toString().toLowerCase() == searchValue.toLowerCase()
    );
    setListTag(filteredData);
  };
  const searchChange = event => setSearchValue(event.target.value);
  const onchangeModelCurrentAction = event => {
    setModelCurrentAction({
      ...modelCurrentAction,
      [event.target.name]: event.target.value,
    });
  };
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      filterMode: 'tree',
      width: 100,
      fixed: 'left',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      width: 200,
      fixed: 'left',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      width: 550,
      sorter: (a, b) => a.description.length - b.description.length,
    },
    {
      title: 'Create At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a, b) => moment(a.createdAt).unix() - moment(b.createdAt).unix(),
      width: 200,
    },
    {
      title: 'Update At',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      sorter: (a, b) => moment(a.updatedAt).unix() - moment(b.updatedAt).unix(),
      width: 200,
    },
    {
      title: 'Action',
      key: 'action',
      width: 280,
      fixed: 'right',
      render: (index, record) => (
        <Space className="action-button" size="middle">
          <button
            type="button"
            class="btn btn-primary"
            onClick={() => {
              setModelCurrentAction(record);
              showImageModal();
            }}
          >
            Image
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
    },
  ];

  return (
    <>
      <Modal
        title="Add new tag"
        visible={isModalAddVisible}
        onOk={handleAddOk}
        onCancel={handleAddCancel}
      >
        <div class="form-group">
          <label for="name">Name: </label>
          <input
            type="name"
            class="form-control"
            placeholder="Enter name"
            value={name}
            name="name"
            onChange={onchangeModelCurrentAction}
          ></input>
        </div>
        
        <div class="form-group">
          <label for="name">Description: </label>
          <textarea
            class="form-control"
            type="description"
            rows="5"
            placeholder="Enter description"
            value={description}
            name="description"
            onChange={onchangeModelCurrentAction}
          ></textarea>
        </div>
        <div class="form-group">
          <i style={{ color: 'red' }}>{successStatus}</i>
        </div>
      </Modal>
      <Modal
        title="Image Modal"
        visible={isModalImageVisible}
        onOk={handleImageOk}
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        <UploadBox tag={modelCurrentAction} />
      </Modal>
      <Modal
        title="Update"
        visible={isModalUpdateVisible}
        onOk={handleUpdateOk}
        onCancel={handleUpdateCancel}
      >
        <div class="form-group">
          <label for="name">ID: </label>
          <input
            name="id"
            class="form-control"
            value={modelCurrentAction.id}
            onChange={onchangeModelCurrentAction}
            disabled
          ></input>
        </div>

        <div class="form-group">
          <label for="name">Name: </label>
          <input
            name="name"
            class="form-control"
            value={name}
            onChange={onchangeModelCurrentAction}
          ></input>
        </div>

        <div class="form-group">
          <label for="name">Description: </label>
          <textarea
            class="form-control"
            type="description"
            rows="5"
            placeholder="Enter description"
            value={description}
            name="description"
            onChange={onchangeModelCurrentAction}
          ></textarea>
        </div>

        <div class="form-group">
          <i style={{ color: 'red' }}>{successStatus}</i>
        </div>
      </Modal>
      <Modal
        title="Delete Modal"
        visible={isModalDeleteVisible}
        onOk={handleDeleteOk}
        onCancel={handleDeleteCancel}
      >
        <p>ARE YOU SUTE TO DELETE "{modelCurrentAction.name}"</p>
      </Modal>
      <div className="tag-utilities">
        <div className="btn-add-tag" onClick={showAddModal}>
          <div className="left">
            <div className="percentage positive">
              <AddCircleIcon />
            </div>
            <BookmarksIcon
              className="icon"
              style={{
                color: 'green',
                backgroundColor: 'rgba(0, 128, 0, 0.2)',
              }}
            />
          </div>
          <div className="right">
            <span className="counter">Add new</span>
          </div>
        </div>
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
      <div className="tag-table-container">
        <Table
          className="tag-table"
          scroll={{
            x: 1200,
          }}
          columns={columns}
          dataSource={listTag}
        />
      </div>
    </>
  );
};

export default TagManager;
