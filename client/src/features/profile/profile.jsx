import React, { useEffect, useState } from 'react';
import { Table, Space, Input, Modal, Button } from 'antd';

import { AiTwotoneEdit } from 'react-icons/ai';
import { BiUserCircle } from 'react-icons/bi';
import { FaUserLock } from 'react-icons/fa';
import userApi from '../../api/userApi';
import './style.css';
import AccountApi from '../../api/accountApi';
import CartApi from '../../api/cartApi';

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
          alert('Update user successful');
          setActionChange(!actionChange);
          setIsModalUpdateVisible(false);
        } else setSuccessStatus('Cannot get to update user',response.data.message);
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
        <div className="title">Thông tin cá nhân</div>
        <div className="image_user">
          <img
            src="http://ativn.edu.vn/wp-content/uploads/2018/03/user.png"
            width={'100px'}
          ></img>
          <AiTwotoneEdit className="icon_edit_img" />
        </div>
        <div className="info">
          <div className="nav">
            <label>Trang tài khoản cá nhân</label>
            <div
              className="nav_info_user"
              onClick={() => {
                setShowInfo(true);
                setEditPassword(false);
              }}
            >
              <BiUserCircle className="icon" />
              <div>Thông tin cá nhân</div>
            </div>
            <div 
              className="nav_key_user"
              onClick={()=>{
                  setShowInfo(false);
                  setEditPassword(true);
              }}    
              >
              <FaUserLock className="icon" />
              <div>Bảo mật</div>
            </div>
          </div>
          <form className="form_info" style={{ display: showInfo ? 'block' : 'none' }}>
            <label className="title">Thông tin cá nhân</label>
          
          <div class="form-group">
            <label for="name">Tên: </label>
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
            <label for="name">Số điện thoại: </label>
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
          

          <label>Giới tính: </label>
          <select
            name="gender" 
            id="gender"
            class="form-control"
            value={modelCurrentAction.gender}
            disabled            
          >
            <option value="nam">Nam</option>
          <option value="nu">Nữ</option>
        </select>

        <div class="date">
          <label for="birthday">Ngày sinh: </label>
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
        <form className="form_password" style={{ display: editPassword ? 'block' : 'none' }}>
          <label className="title">Thay đổi mật khẩu</label>
          <div className="old_password">
            <label>Mật khẩu cũ</label>
            <input type="password"></input>
          </div>
          <div className="new_password">
            <label>Mật khẩu mới</label>
            <input id="new_password_1" type="password"></input>
          </div>
          <div className="new_password">
            <label>Xác nhận mật khẩu mới</label>
            <input id="new_password_2" type="password"></input>    
          </div>
          <button className="btn_edit" type="submit">
            Xác nhận
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
          <label for="name">Số điện thoại: </label>
          <input
            type="phone_number"
            id="phone_number"
            class="form-control"
            value={phone_number}
            name="phone_number"
            onChange={onchangeModelCurrentAction}
          ></input>
        </div>
      
        <label>Giới tính: </label>
        <select
          name="gender"
          class="form-control"
          value={gender}
          onChange={onchangeModelCurrentAction}
        >
          <option value="nam">Nam</option>
          <option value="nu">Nữ</option>
        </select>

        <div class="date">
          <label for="date">Ngày sinh: </label>
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
