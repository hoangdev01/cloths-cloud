import React from 'react';
import './hotelmanager.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import serviceApi from '../../../../api/serviceApi';
import { useState, useEffect } from 'react';
import { Table, Space, Input, Modal, Button } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';
import UploadBox from '../../../../components/upload-box/upload-box';
const { Search } = Input;

const HotelManager = () => {
  const entryModal = {
    name: '',
    title: '',
    description: '',
    guide: '',
    price: '',
    is_active: '',
  };
  const [successStatus, setSuccessStatus] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [listHotel, setListHotel] = useState([]);
  const [listHotelAll, setListHotelAll] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [isModalAddVisible, setIsModalAddVisible] = useState(false);
  const [isModalImageVisible, setIsModalImageVisible] = useState(false);
  const [isModalUpdateVisible, setIsModalUpdateVisible] = useState(false);
  const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);
  const [modelCurrentAction, setModelCurrentAction] = useState({});
  const { name, title, description, guide, price, is_active } =
    modelCurrentAction;
  const [actionChange, setActionChange] = useState(true);
  useEffect(() => {
    setModelCurrentAction(entryModal);
    serviceApi
      .getHotelList()
      .then(response => {
        setListHotelAll(response.data.hotelBookingList);
        setListHotel(response.data.hotelBookingList);
        setCategoryId(response.data.categoryId);
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
    if (name == '' || title == '' || description == '' || price == '') {
      setSuccessStatus('Not enough infomation');
      return;
    }
    var temp = modelCurrentAction;
    temp.categoryId = categoryId;
    setModelCurrentAction(temp);
    serviceApi
      .create(modelCurrentAction)
      .then(response => {
        if (response.data.success) {
          setModelCurrentAction(entryModal);
          alert('Add service successful');
          setActionChange(!actionChange);
          setIsModalAddVisible(false);
        } else setSuccessStatus(response.data.message);
      })
      .catch(error => {
        console.log(error);
        setSuccessStatus('Can not create service');
      });
  };
  const handleAddCancel = () => setIsModalAddVisible(false);
  const showImageModal = () => setIsModalImageVisible(true);
  const handleImageOk = () => {
    setActionChange(!actionChange);
    setIsModalImageVisible(false);
  };
  const handleImageCancel = () => {
    setActionChange(!actionChange);
    setIsModalImageVisible(false);
  };
  const showUpdateModal = () => {
    setSuccessStatus('');
    setIsModalUpdateVisible(true);
  };
  const handleUpdateOk = () => {
    if (name == '' || title == '' || description == '' || price == '') {
      setSuccessStatus('Not enough infomation');
      return;
    }
    var temp = modelCurrentAction;
    temp.categoryId = categoryId;
    setModelCurrentAction(temp);
    serviceApi
      .update(modelCurrentAction)
      .then(response => {
        if (response.data.success) {
          setModelCurrentAction(entryModal);
          alert('Service update successful');
          setActionChange(!actionChange);
          setIsModalUpdateVisible(false);
        } else setSuccessStatus(response.data.message);
      })
      .catch(error => {
        console.log(error);
        setSuccessStatus('Can not update service');
      });
  };
  const handleUpdateCancel = () => setIsModalUpdateVisible(false);
  const showDeleteModal = () => setIsModalDeleteVisible(true);
  const handleDeleteOk = () => {
    serviceApi
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
    const filteredData = listHotelAll.filter(
      entry =>
        entry.id.toString().toLowerCase().includes(searchValue.toLowerCase()) ||
        entry.name
          .toString()
          .toLowerCase()
          .includes(searchValue.toLowerCase()) ||
        entry.toString().toLowerCase().price == searchValue.toLowerCase()
    );
    setListHotel(filteredData);
  };
  const searchChange = event => setSearchValue(event.target.value);
  const onchangeModelCurrentAction = event => {
    // console.log(modelCurrentAction.description);
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
      width: 200,
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
      title: 'Title',
      dataIndex: 'title',
      sorter: (a, b) => a.name.length - b.name.length,
      width: 200,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      width: 550,
      sorter: (a, b) => a.description.length - b.description.length,
    },
    {
      title: 'Address',
      dataIndex: 'guide',
      width: 200,
      sorter: (a, b) => a.description.length - b.description.length,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      sorter: (a, b) => a.price - b.price,
      width: 120,
    },
    {
      title: 'Is active',
      dataIndex: 'is_active',
      render: text => String(text),
      sorter: (a, b) => a.is_active - b.is_active,
      width: 100,
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
        title="Add"
        visible={isModalAddVisible}
        onOk={handleAddOk}
        onCancel={handleAddCancel}
        cancelButtonProps={{ style: { display: 'none' } }}
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
          <label for="Title">Title: </label>
          <input
            type="text"
            class="form-control"
            placeholder="Enter title"
            value={title}
            name="title"
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
          <label for="Title">Address: </label>
          <input
            type="text"
            class="form-control"
            placeholder="Enter address"
            value={guide}
            name="guide"
            onChange={onchangeModelCurrentAction}
          ></input>
        </div>
        <div class="form-group">
          <label for="name">Price: </label>
          <input
            type="price"
            class="form-control"
            placeholder="Enter price (VND)"
            value={price}
            name="price"
            onChange={onchangeModelCurrentAction}
          ></input>
        </div>

        <label>Is active: </label>
        <select
          name="is_active"
          class="form-control"
          value={is_active}
          onChange={onchangeModelCurrentAction}
        >
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
        <div class="form-group">
          <i style={{ color: 'red' }}>{successStatus}</i>
        </div>
      </Modal>
      <Modal
        title="Image Modal"
        visible={isModalImageVisible}
        onOk={handleImageOk}
        onCancel={handleImageCancel}
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        <UploadBox service={modelCurrentAction} />
      </Modal>
      <Modal
        title="Update"
        visible={isModalUpdateVisible}
        onOk={handleUpdateOk}
        onCancel={handleUpdateCancel}
      >
        <p>UPDATE "{modelCurrentAction.id}"</p>
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
          <label for="Title">Title: </label>
          <input
            type="text"
            class="form-control"
            placeholder="Enter title"
            value={title}
            name="title"
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
          <label for="Title">Address: </label>
          <input
            type="text"
            class="form-control"
            placeholder="Enter address"
            value={guide}
            name="guide"
            onChange={onchangeModelCurrentAction}
          ></input>
        </div>

        <div class="form-group">
          <label for="name">Price: </label>
          <input
            type="price"
            class="form-control"
            placeholder="Enter price (VND)"
            value={price}
            name="price"
            onChange={onchangeModelCurrentAction}
          ></input>
        </div>

        <label>Is active: </label>
        <select
          name="is_active"
          class="form-control"
          value={is_active}
          onChange={onchangeModelCurrentAction}
        >
          <option value="true">True</option>
          <option value="false">False</option>
        </select>

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
        <p>ARE YOU SURE TO DELETE "{modelCurrentAction.name}"</p>
      </Modal>
      <div className="hotel-utilities">
        <div className="btn-add-hotel" onClick={showAddModal}>
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
      <div className="hotel-table-container">
        <Table
          className="hotel-table"
          scroll={{
            x: 1200,
          }}
          columns={columns}
          dataSource={listHotel}
        />
      </div>
    </>
  );
};

export default HotelManager;
