
import { Routes , Route} from 'react-router';
import { useState , useEffect } from 'react';
import axios from 'axios';

import HomePage from './pages/home/HomePage'
import Checkout from './pages/checkout/Checkout';
import Orders from './pages/orders/Orders';
import Tracking from './pages/Tracking';
import './App.css'
import Page_404 from './pages/404Page';

function App() {

  const [cart, setCart] = useState([]);

    useEffect(() => {

      const getCartData = async ()=>{
        const res = await axios.get('/api/cart-items?expand=product')
        setCart(res.data);
      }
        getCartData();
    },[])
  return(
    <Routes>
      <Route index element={<HomePage cart = {cart}/>}></Route>
      <Route path="checkout" element={<Checkout cart = {cart}/>}></Route>
      <Route path="orders" element={<Orders cart = {cart}/>}></Route>
      <Route path="/tracking/:orderId/:productId" element={<Tracking cart = {cart}/>}></Route>
      <Route path="*" element={<Page_404/>}></Route>
      
    </Routes>
    
    
  );
}

export default App
