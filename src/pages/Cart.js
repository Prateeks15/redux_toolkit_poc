import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { remove } from '../store/cartSlice';

const Cart = () => {
const dispatch = useDispatch();
  const products = useSelector((state) => state.cart);

  return (
    <div>
      <h3>Cart</h3>
      <div className='cartWrapper'>
        {
          products.map(item => (
            <div className='cartCard' key={item.id}>
              <img src={item.image} alt="" />
              <h5>{item.title}</h5>
              <h5>{item.price}</h5>
              <button onClick={() => dispatch(remove(item.id))} className='btn'>Remove</button>
            </div>
          ))
        }
      </div>
    </div>
  )
}


export default Cart;