import React from 'react';
import './clothmanager.scss';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import serviceApi from '../../../../api/serviceApi';
import { useState, useEffect } from 'react';
import {
  Table,
  Space,
  Input,
  Modal,
  Row,
  Col,
  InputNumber,
  Button,
} from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';
import UploadBox from '../../../../components/upload-box/upload-box';
import { CloseCircleOutlined } from '@ant-design/icons';
const { Search } = Input;

const ClothManager = () => {
  const entryModal = {
    id: '',
    name: '',
    title: '',
    description: '',
    price: '',
    is_active: '',
  };
  const entryInstanceModal = {
    color: '',
    size: '',
    amount: 0,
  };
  const [successStatus, setSuccessStatus] = useState('');
  const [categoryId, setCategoryId] = useState([]);
  const [listCloth, setListCloth] = useState([]);
  const [listClothAll, setListClothAll] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [isModalAddVisible, setIsModalAddVisible] = useState(false);
  const [isModalImageVisible, setIsModalImageVisible] = useState(false);
  const [isModalUpdateVisible, setIsModalUpdateVisible] = useState(false);
  const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);
  const [isModalInstanceVisible, setIsModalInstanceVisible] = useState(false);
  const [modelCurrentAction, setModelCurrentAction] = useState(false);
  const [listInstanceCurrentAction, setListInstanceCurrentAction] = useState(
    []
  );
  const [actionChange, setActionChange] = useState(true);
  const { id, name, title, description, price, is_active } = modelCurrentAction;
  // const { color, size, amount } = modelInstanceCurrentAction;
  useEffect(() => {
    serviceApi
      .getServiceList('cloth')
      .then(response => {
        setListClothAll(response.data.serviceList);
        setListCloth(response.data.serviceList);
        setCategoryId(response.data.categoryId);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    setListInstanceCurrentAction([]);
  }, [actionChange]);
  const showAddModal = () => {
    setSuccessStatus('');
    setIsModalAddVisible(true);
    setModelCurrentAction(entryModal);
  };
  const formatInteger = value => {
    if (value === undefined || value === null || value === '') {
      return '';
    }
    return String(value).replace(/[^0-9]/g, ''); // Remove non-numeric characters
  };

  const parseInteger = value => {
    return parseInt(value, 10);
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

  const showModalInstanceVisible = () => {
    setSuccessStatus('');
    setIsModalInstanceVisible(true);
  };
  const handleInstanceOk = () => {
    let filteredItems =
      listInstanceCurrentAction.length > 0
        ? listInstanceCurrentAction.filter(item => {
            return item.color !== '' || item.size !== '';
          })
        : listInstanceCurrentAction;
    setListInstanceCurrentAction(filteredItems);
    serviceApi
      .createServiceInstance(modelCurrentAction.id, {
        listInstance: listInstanceCurrentAction,
      })
      .then(response => {
        if (response.data.success) {
          setModelCurrentAction(entryModal);
          alert('Service features create successful');
          setActionChange(!actionChange);
          setIsModalInstanceVisible(false);
        } else setSuccessStatus(response.data.message);
      })
      .catch(error => {
        console.log(error);
      });
  };
  const handleInstanceCancel = () => {
    setIsModalInstanceVisible(false);
    setListInstanceCurrentAction([]);
  };
  const removeItem = index => {
    setListInstanceCurrentAction(prevItems =>
      prevItems.filter((_, i) => i !== index)
    );
  };
  const searchClick = () => {
    const filteredData = listClothAll.filter(
      entry =>
        entry.id.toString().toLowerCase().includes(searchValue.toLowerCase()) ||
        entry.name
          .toString()
          .toLowerCase()
          .includes(searchValue.toLowerCase()) ||
        entry.price.toString().toLowerCase() == searchValue.toLowerCase()
    );
    setListCloth(filteredData);
  };
  const searchChange = event => setSearchValue(event.target.value);
  const onchangeModelCurrentAction = event => {
    setModelCurrentAction({
      ...modelCurrentAction,
      [event.target.name]: event.target.value,
    });
  };
  const handleArrayInputChange = (index, property, value) => {
    setListInstanceCurrentAction(prevItems => {
      const newItems = [...prevItems];
      newItems[index] = {
        ...newItems[index],
        [property]: value,
      };
      return newItems;
    });
  };
  const columns = [
    // {
    //   title: 'id',
    //   dataIndex: 'id',
    //   filterMode: 'tree',
    //   width: 200,
    //   fixed: 'left',
    // },
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
      width: 550,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      width: 550,
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
      render: text => {
        const date = new Date(text);
        const formattedDate = `${date.getDate()}/${
          date.getMonth() + 1
        }/${date.getFullYear()}`;
        const formattedTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        return `${formattedDate} ${formattedTime}`;
      },
    },
    {
      title: 'Update At',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      sorter: (a, b) => moment(a.updatedAt).unix() - moment(b.updatedAt).unix(),
      width: 200,
      render: text => {
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
      width: 400,
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
            class="btn btn-secondary"
            onClick={() => {
              setModelCurrentAction(record);
              showModalInstanceVisible();
              serviceApi.getListServiceInstance(record.id).then(response => {
                if (response.data.listInstances.length > 0)
                  setListInstanceCurrentAction(response.data.listInstances);
              });
            }}
          >
            Detail
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
        title="Add new cloth"
        visible={isModalAddVisible}
        onOk={handleAddOk}
        onCancel={handleAddCancel}
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        <div class="form-group">
          <label htmlFor="name">Name: </label>
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
          <label htmlFor="Title">Title: </label>
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
          <label htmlFor="name">Description: </label>
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
          <label htmlFor="name">Price: </label>
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
        <div class="form-group">
          <label htmlFor="name">Name: </label>
          <input
            name="name"
            class="form-control"
            value={name}
            onChange={onchangeModelCurrentAction}
          ></input>
        </div>

        <div class="form-group">
          <label htmlFor="Title">Title: </label>
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
          <label htmlFor="name">Description: </label>
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
          <label htmlFor="name">Price: </label>
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
        <br />
      </Modal>
      <Modal
        title="Delete Modal"
        visible={isModalDeleteVisible}
        onOk={handleDeleteOk}
        onCancel={handleDeleteCancel}
      >
        <p>ARE YOU SURE TO DELETE "{modelCurrentAction.name}"</p>
      </Modal>
      <Modal
        title="Cloth detail"
        visible={isModalInstanceVisible}
        onOk={handleInstanceOk}
        onCancel={handleInstanceCancel}
      >
        {listInstanceCurrentAction.map((item, index) => {
          return (
            <>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <h3 style={{ fontSize: '20px', marginRight: '340px' }}>
                  <b>Feature {index + 1}</b>
                </h3>
                <Button
                  type="text"
                  icon={<CloseCircleOutlined />}
                  onClick={() => {
                    removeItem(index);
                  }}
                />
              </div>
              <br />
              <hr />
              <Row gutter={20} align="middle">
                <Col span={8}>
                  <label htmlFor="cloth-color">Color</label>
                  <Input
                    name="cloth-color"
                    value={item.color}
                    onChange={e =>
                      handleArrayInputChange(index, 'color', e.target.value)
                    }
                  />
                </Col>
                <Col span={8}>
                  <label htmlFor="cloth-size">size</label>
                  <Input
                    name="cloth-size"
                    value={item.size}
                    onChange={e =>
                      handleArrayInputChange(index, 'size', e.target.value)
                    }
                  />
                </Col>
                <Col span={4}>
                  <label htmlFor="cloth-amount">Amount</label>
                  <div>
                    <InputNumber
                      name="cloth-amount"
                      min={0}
                      step={1}
                      defaultValue={0}
                      formatter={formatInteger}
                      parser={parseInteger}
                      value={item.amount}
                      onChange={value =>
                        handleArrayInputChange(index, 'amount', value)
                      }
                    />
                  </div>
                </Col>
              </Row>
              <br />
            </>
          );
        })}
        <div class="form-group">
          <button
            type="button"
            class="btn btn-primary"
            onClick={() => {
              // if (listInstanceCurrentAction==[])
              setListInstanceCurrentAction([
                ...listInstanceCurrentAction,
                entryInstanceModal,
              ]);
              console.log(listInstanceCurrentAction);
            }}
          >
            Add cloth instance
          </button>
        </div>
      </Modal>
      <div className="cloth-utilities">
        <div className="btn-add-cloth" onClick={showAddModal}>
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
      <div className="cloth-table-container">
        <Table
          className="cloth-table"
          scroll={{
            x: 1250,
          }}
          columns={columns}
          dataSource={listCloth}
        />
      </div>
    </>
  );
};

export default ClothManager;
