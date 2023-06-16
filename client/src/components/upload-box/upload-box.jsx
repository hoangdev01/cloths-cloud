import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
// import './index.css';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import resourceApi from '../../api/resourceApi';
import serviceAPI from '../../api/serviceApi';
import Spinner from 'react-bootstrap/Spinner';
import { mediaUrl } from '../../api/constants';

const getBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = error => reject(error);
  });

const UploadBox = props => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);
  const [fileUploadList, setFileUploadList] = useState([]);
  const [waitUpload, setWaitUpload] = useState(false);
  useEffect(() => {
    var list = [];
    let temp = null;
    for (let i = 0; i < props.service.images.length; i++) {
      temp = {
        uid: `${-i}`,
        id: props.service.images[i].id,
        filename: `Image ${i}`,
        status: 'done',
        url: `${mediaUrl}/${props.service.images[i].name}`,
      };
      list.push(temp);
    }
    setFileList(list);
  }, [props]);
  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.filename || file.url.substring(file.url.lastIndexOf('/') + 1)
    );
  };

  const handleChange = e => {
    if (!e.target.files || e.target.files.length === 0) {
      setFileUploadList(undefined);
      return;
    }
    setFileUploadList(e.target.files);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setWaitUpload(true);
    var data = new FormData();
    for (let i = 0; i < fileUploadList.length; i++) {
      data.append('media', fileUploadList[i]);
    }
    data.append('serviceId', props.service.id);
    try {
      await resourceApi.createServiceImage(data);
      await serviceAPI.get(props.service.slug).then(res => {
        if (res.data.success) {
          var list = [];
          for (let i = 0; i < res.data.service.images.length; i++) {
            list.push({
              uid: `${-i}`,
              id: res.data.service.images[i].id,
              filename: `Image ${i}`,
              status: 'done',
              url: res.data.service.images[i].path,
            });
          }
          setFileList(list);
        } else {
          alert('Can not upload file');
        }
      });
    } catch (error) {}
    setWaitUpload(false);
    return false;
  };
  const handleDelete = async event => {
    setWaitUpload(true);
    try {
      await resourceApi.delete(event.id);
      await serviceAPI.get(props.service.slug).then(res => {
        if (res.data.success) {
          var list = [];
          for (let i = 0; i < res.data.service.images.length; i++) {
            list.push({
              uid: `${-i}`,
              id: res.data.service.images[i].id,
              filename: `Image ${i}`,
              status: 'done',
              url: res.data.service.images[i].path,
            });
          }
          setFileList(list);
        }
      });
    } catch (error) {}
    setWaitUpload(false);
  };
  var waitUploadSpinner = waitUpload ? (
    <Spinner animation="border" variant="info" />
  ) : (
    <></>
  );
  return (
    <>
      <Upload
        action={`${process.env.REACT_APP_API_URL}/media`}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        beforeUpload={() => {
          return false;
        }}
        onRemove={handleDelete}
      ></Upload>
      <div>{waitUploadSpinner}</div>
      <h4>Multiple Image:</h4>
      <form>
        <input
          id="imgInp"
          type="file"
          name="media"
          onChange={handleChange}
          multiple
          required
        />
        <button type="submit" class="btn btn-primary" onClick={handleSubmit}>
          Upload
        </button>
      </form>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt="example"
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal>
    </>
  );
};

export default UploadBox;
