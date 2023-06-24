import React, { useEffect, useState } from 'react';
import { Modal, message } from 'antd';

import { AiTwotoneEdit } from 'react-icons/ai';
import { BiUserCircle } from 'react-icons/bi';
import { FaUserLock } from 'react-icons/fa';
import userApi from '../../api/userApi';
import './style.css';

const Profile = () => {
  const entryModal = {
    name: '',
    phone_number: '',
    gender: '',
    date_of_birth: '',
  };
  const [showInfo, setShowInfo] = useState(true);
  const [editPassword, setEditPassword] = useState(false);
  const [modelCurrentAction, setModelCurrentAction] = useState(entryModal);
  const [isModalUpdateVisible, setIsModalUpdateVisible] = useState(false);
  const [actionChange, setActionChange] = useState(true);
  const { name, phone_number, gender, date_of_birth } = modelCurrentAction;
  const [successStatus, setSuccessStatus] = useState('');
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    userApi
      .getUser()
      .then(response => {
        setModelCurrentAction(response.data.user);
      })
      .catch(error => {
        console.log('Failed to fetch UserList:', error);
      });
  }, [actionChange]);
  const showUpdateModal = () => {
    // setIsModalUpdateVisible(true);
    setSuccessStatus('');
    setIsModalUpdateVisible(true);
  };
  const handleUpdateOk = () => {
    if (name == '') {
      setSuccessStatus('Name required');
      return;
    }
    userApi
      .updateUser(modelCurrentAction)
      .then(response => {
        if (response.data.success) {
          message.success('Update user successful');
          setActionChange(!actionChange);
          setIsModalUpdateVisible(false);
        } else
          setSuccessStatus('Cannot get to update user', response.data.message);
      })
      .catch(error => {
        console.log(error);
        setSuccessStatus('Can not update user');
      });
  };
  const handleUpdateCancel = () => {
    setIsModalUpdateVisible(false);
  };
  const onchangeModelCurrentAction = user => {
    // console.log(modelCurrentAction);
    setModelCurrentAction({
      ...modelCurrentAction,
      [user.target.name]: user.target.value,
    });
  };

  return (
    <div className="container">
      <div className="title">Personal information</div>
      <div className="image_user">
        <img
          src="http://ativn.edu.vn/wp-content/uploads/2018/03/user.png"
          width={'100px'}
        ></img>
        <AiTwotoneEdit className="icon_edit_img" />
      </div>
      <div className="info">
        <div className="nav">
          <label>Personal information page</label>
          <div
            className="nav_info_user"
            onClick={() => {
              setShowInfo(true);
              setEditPassword(false);
            }}
          >
            <BiUserCircle className="icon" />
            <div>Personal information</div>
          </div>
          <div
            className="nav_key_user"
            onClick={() => {
              setShowInfo(false);
              setEditPassword(true);
            }}
          >
            <FaUserLock className="icon" />
            <div>Security</div>
          </div>
        </div>
        <form
          className="form_info"
          style={{ display: showInfo ? 'block' : 'none' }}
        >
          <label className="title">Personal information</label>

          <div class="form-group">
            <label for="name">Name: </label>
            <input
              type="text"
              class="form-control"
              id="name"
              name="name"
              value={modelCurrentAction.name}
              onChange={onchangeModelCurrentAction}
              disabled
            ></input>
          </div>

          <div class="form-group">
            <label for="name">Phone number: </label>
            <input
              type="text"
              class="form-control"
              id="phone_number"
              name="phone_number"
              value={modelCurrentAction.phone_number}
              onChange={onchangeModelCurrentAction}
              disabled
            ></input>
          </div>

          <label>Sex: </label>
          <select
            name="gender"
            id="gender"
            class="form-control"
            value={modelCurrentAction.gender}
            disabled
          >
            <option value="nam">Male</option>
            <option value="nu">Female</option>
          </select>

          <div class="date">
            <label for="birthday">Birthday: </label>
            <input
              type="date"
              name="date"
              class="form-control"
              id="birthday"
              value={modelCurrentAction.date_of_birth}
              disabled
            ></input>
            <button
              type="button"
              class="btn btn-primary"
              onClick={() => {
                setModelCurrentAction(entryModal);
                showUpdateModal();
              }}
            >
              Cập nhật
            </button>
          </div>
        </form>
        <form
          className="form_password"
          style={{ display: editPassword ? 'block' : 'none' }}
        >
          <label className="title">Update password</label>
          <div className="old_password">
            <label>Old password</label>
            <input type="password"></input>
          </div>
          <div className="new_password">
            <label>New password</label>
            <input id="new_password_1" type="password"></input>
          </div>
          <div className="new_password">
            <label>Confirm new password</label>
            <input id="new_password_2" type="password"></input>
          </div>
          <button className="btn_edit" type="submit">
            Confirm
          </button>
        </form>
        <Modal
          title="Update profile's details"
          visible={isModalUpdateVisible}
          onOk={handleUpdateOk}
          onCancel={handleUpdateCancel}
        >
          <div class="form-group">
            <label for="name">Name: </label>
            <input
              type="name"
              id='"name'
              class="form-control"
              value={modelCurrentAction.name}
              name="name"
              onChange={onchangeModelCurrentAction}
            ></input>
          </div>
          <div class="form-group">
            <label for="name">Phone number: </label>
            <input
              type="phone_number"
              id="phone_number"
              class="form-control"
              value={phone_number}
              name="phone_number"
              onChange={onchangeModelCurrentAction}
            ></input>
          </div>

          <label>Sex: </label>
          <select
            name="gender"
            class="form-control"
            value={gender}
            onChange={onchangeModelCurrentAction}
          >
            <option value="nam">Male</option>
            <option value="nu">Female</option>
          </select>

          <div class="date">
            <label for="date">Birthday: </label>
            <input
              type="date"
              name="date_of_birth"
              class="form-control"
              id="date_of_birth"
              value={date_of_birth}
              onChange={onchangeModelCurrentAction}
            ></input>
          </div>
          <div class="form-group">
            <i style={{ color: 'red' }}>{successStatus}</i>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Profile;
