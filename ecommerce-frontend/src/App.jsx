
import { Routes , Route} from 'react-router';
import { useState , useEffect } from 'react';
import axios from 'axios';

import HomePage from './pages/HomePage'
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Tracking from './pages/Tracking';
import './App.css'
import Page_404 from './pages/404Page';

function App() {

  const [cart, setCart] = useState([]);

    useEffect(() => {
        axios.get('/api/cart-items?expand=product')
            .then((res) =>{
                setCart(res.data);
            });
    },[])
  
    console.log(cart);
  return(
    <Routes>
      <Route index element={<HomePage cart = {cart}/>}></Route>
      <Route path="checkout" element={<Checkout cart = {cart}/>}></Route>
      <Route path="orders" element={<Orders />}></Route>
      <Route path="tracking" element={<Tracking />}></Route>
      <Route path="*" element={<Page_404/>}></Route>
      
    </Routes>
    
    
  );
}

export default App
