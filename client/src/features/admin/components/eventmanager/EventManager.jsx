import React, { useEffect, useState } from 'react';
import eventApi from '../../../../api/eventApi';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import './eventmanager.scss';
import { Table, Space, Input, Modal, Button } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';
import UploadBox from '../../../../components/upload-box/upload-box'
const { Search } = Input;

const EventManager = () => {
  const entryModal = {
    name: '',
    description: '',
    discount: '',
    is_active: '',
    startAt: '', 
    endAt: '',
  };
  const [successStatus, setSuccessStatus] = useState('');

  const [listEvent, setListEvent] = useState([]);
  const [isModalAddVisible, setIsModalAddVisible] = useState(false);
  const [isModalImageVisible, setIsModalImageVisible] = useState(false);
  const [isModalUpdateVisible, setIsModalUpdateVisible] = useState(false);
  // const [isModalActiveVisible, setIsModalActiveVisible] = useState(false);

  const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);
  const [modelCurrentAction, setModelCurrentAction] = useState({});
  const [actionChange, setActionChange] = useState(true);
  
  const { name, description, discount, is_active, startAt, endAt } =
    modelCurrentAction;
  useEffect(() => {

    eventApi
      .getAll()
      .then(response => {
        setListEvent(response.data.listEvent);
        console.log(response.data);
      })
      .catch(error => {
        console.log('Failed to fetch EventList:',error);
      });
  }, [actionChange]);

  const showAddModal = () => {
    setSuccessStatus('');
    setIsModalAddVisible(true);
    setModelCurrentAction(entryModal);  
  };
  const handleAddOk = async() => {
    // setIsModalAddVisible(false);
    if (name == '' || description == '' || discount == ''|| endAt == '' || startAt == '') {
      setSuccessStatus('Not enough infomation');
      return;
    }
    if (moment(endAt).unix() - moment(startAt).unix() < 0){
      setSuccessStatus('Set wrong day');
      return;
    }
    eventApi
      .createEvent(modelCurrentAction)
      .then(response => {
        if (response.data.success) {
          setModelCurrentAction(entryModal);
          alert('Add event successful');
          setActionChange(!actionChange);
          setIsModalAddVisible(false);
        } else setSuccessStatus(response.data.message);
      })
      .catch(error => {
        console.log(error);
        setSuccessStatus('Can not create event');
      });
  };
  const handleAddCancel = () => {
    setIsModalAddVisible(false);
  };

  const showImageModal = () => {
    setIsModalImageVisible(true);
  };
  const handleImageOk = () => {
    setIsModalImageVisible(false);
  };
  const handleImageCancel = () => {
    setIsModalImageVisible(false);
  };

  const showUpdateModal = () => {
    setSuccessStatus('');
    setIsModalUpdateVisible(true);
  };
  const handleUpdateOk = () => {
    // setIsModalUpdateVisible(false);
    if (name == '' || description == '' || discount == ''|| endAt == '' || startAt == '') {
      setSuccessStatus('Not enough infomation');
      return;
    }
    if (moment(endAt).unix() - moment(startAt).unix() < 0){
      setSuccessStatus('Set wrong day');
      return;
    }
    eventApi
      .updateEvent(modelCurrentAction)
      .then(response => {
        if (response.data.success) {
          setModelCurrentAction(entryModal);
          alert('Update event successfully');
          setActionChange(!actionChange);
          setIsModalUpdateVisible(false);
        } else setSuccessStatus(response.data.message);
      })
      .catch(error => {
        console.log(error);
        setSuccessStatus('Can not update event');
      });
  };
  const handleUpdateCancel = () => {
    setIsModalUpdateVisible(false);
  };

  const showDeleteModal = () => {
    setIsModalDeleteVisible(true);
  };
  const handleDeleteOk = () => {
    // setIsModalDeleteVisible(false);
    eventApi
      .deleteEvent(modelCurrentAction.id)
      .then(response => {
        if (response.data.success) {
          setModelCurrentAction(entryModal);
          alert('Delete event successfully');
          setActionChange(!actionChange);
          setIsModalDeleteVisible(false);
        } else setSuccessStatus(response.data.message);
      })
      .catch(error => {
        console.log(error);
      });
  };
  const handleDeleteCancel = () => {
    setIsModalDeleteVisible(false);
  };
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
      title: 'Discount',
      dataIndex: 'discount',
      sorter: (a, b) => a.discount - b.discount,
      width: 120,
    },
    {
      title: 'Is active',
      dataIndex: 'isActive',
      render: text => String(text),
      sorter: (a, b) => a.is_active - b.is_active,
      width: 100,
    },
    {
      title: 'Update At',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      sorter: (a, b) => moment(a.updatedAt).unix() - moment(b.updatedAt).unix(),
      width: 200,
    },
    {
      title: 'Start at',
      dataIndex: 'startAt',
      key: 'startAt',
      sorter: (a, b) => moment(a.createdAt).unix() - moment(b.createdAt).unix(),
      width: 200,
    },
    {
      title: 'End at',
      dataIndex: 'endAt',
      key: 'endAt',
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
          {/* <button
            type="button"
            class={record.active ? "btn btn-danger" : "btn btn-info"}
            onClick={() => {
              setModelCurrentAction(record);
              showActiveModal();
            }}
          >
            {record.active ? "Unactive" : "Active"}
          </button> */}
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
        title="Add new event"
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
          <label for="name">Discount: </label>
          <input
            type="price"
            class="form-control"
            placeholder="Enter discount (%)"
            value={discount}
            name="discount"
            onChange={onchangeModelCurrentAction}
          ></input>
        </div>

        <label>Is active: </label>
        <select
          name="is_active"
          class="form-control"
          // value={is_active}
          onChange={onchangeModelCurrentAction}
        >
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
      
        <div class="date">
          <label for="date">Start at: </label>
          <input
            type="date"
            name="startAt"
            class="form-control"
            id="startAt"
            value={startAt}
            onChange={onchangeModelCurrentAction}           
          ></input>
          <label for="date">End at: </label>
          <input
            type="date"
            name="endAt"
            class="form-control"
            id="endAt"
            value={endAt}
            onChange={onchangeModelCurrentAction}           
          ></input>
          
        </div>
        <div class="form-group">
          <i style={{ color: 'red' }}>{successStatus}</i>
        </div>
      </Modal>
      <Modal
        title="Show event's informations" 
        visible={isModalImageVisible}
        onOk={handleImageOk}
        onCancel={handleImageCancel}
      >
        <UploadBox service={modelCurrentAction} />
        
      </Modal>
      <Modal
        title="Update events's details"
        visible={isModalUpdateVisible}
        onOk={handleUpdateOk}
        onCancel={handleUpdateCancel}
      >
        <div class="form-group">
          <label for="name">ID: </label>
          <input
            type="id"
            class="form-control"
            value={modelCurrentAction.id}
            name="id"
            onChange={onchangeModelCurrentAction}
            disabled
          ></input>
        </div>
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
          <label for="name">Discount: </label>
          <input
            type="price"
            class="form-control"
            placeholder="Enter discount (%)"
            value={discount}
            name="discount"
            onChange={onchangeModelCurrentAction}
          ></input>
        </div>

        {/* <label>Is active: </label>
        <select
          name="is_active"
          class="form-control"
          value={is_active}
          onChange={onchangeModelCurrentAction}
        >
          <option value="true">True</option>
          <option value="false">False</option>
        </select> */}
      
        <div class="date">
          <label for="date">Start at: </label>
          <input
            type="date"
            name="startAt"
            class="form-control"
            id="startAt"
            value={startAt}
            onChange={onchangeModelCurrentAction}           
          ></input>
          <label for="date">End at: </label>
          <input
            type="date"
            name="endAt"
            class="form-control"
            id="endAt"
            value={endAt}
            onChange={onchangeModelCurrentAction}           
          ></input>
          
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
        <p>ARE YOU SURE TO DELETE {modelCurrentAction.name}?</p>
      </Modal>
      <div className="event-utilities">
        <div className="btn-add-event" onClick={showAddModal}>
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
          className="search"
          placeholder="Input search text"
          enterButton
        />
      </div>
      <div className="event-table-container">
        <Table
          className="event-table"
          scroll={{
            x: 1200,
          }}
          columns={columns}
          dataSource={listEvent}
        />
      </div>
    </>
  );
};

export default EventManager;
