import { fontSize } from '@mui/system';
import React, { useEffect } from 'react'
import { useState } from 'react';
import CartApi from '../../api/cartApi';
import style from './style_cart.css';

const Carts = () => {

    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        CartApi.getAll().then(res => {
          setCart(res.data.listCart);            
        });  
      }, []);  
      console.log(cart)
        
    const totalPrice = cart.reduce(
        (prePrice, item) => prePrice + item.service.price*item.numberOfChild/2 + 
                        item.service.price*(item.numberOfPeople - item.numberOfChild), 0
    );

    const ShowNotiFy = () => {
        alert("Bạn đã đặt dịch vụ thành công \nHệ thống sẽ liên hệ với bạn ngay bây giờ.")
    }

  return (
    <div className="container">
        <table class="table">
            <thead>
                <tr>
                    <th>TÊN DỊCH VỤ</th>
                    <th>SỐ LƯỢNG</th>
                    <th>GIÁ TIỀN</th>
                </tr>
            </thead>
            <tbody>
                {     
                        cart.map((item, index) => (
                            <tr key={index}>
                                <th>{item.service.name}</th> 
                                        {
                                            item.numberOfPeople == 0 ? 
                                            <th>Số lượng: {item.amount}</th> : 
                                            <th>Số lượng trẻ em: {item.numberOfChild} <br/>
                                                Số lượng người lớn: {item.numberOfPeople - item.numberOfChild}
                                            </th>
                                        }
                                        <th>
                                            {(item.numberOfChild*item.service.price/2 + 
                                                (item.numberOfPeople - item.numberOfChild)*item.service.price ).
                                            toLocaleString('vi', {style : 'currency', currency : 'VND'})
                                            }
                                        </th>
                                    </tr>
                        ))
                } 
            </tbody>
        </table>    
        <div className="total-book">
            <div className="total-price">
                <label>TỔNG TIỀN: </label>
                {(totalPrice+0).toLocaleString('vi', {style : 'currency', currency : 'VND'})} 
            </div>
            <div className="book-service">
                <button onClick={ShowNotiFy}>Đặt ngay</button>
            </div>
        </div>  
    </div>
  )
}

export  default Carts;