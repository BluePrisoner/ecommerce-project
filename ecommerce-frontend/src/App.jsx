
import { Routes , Route} from 'react-router';

import HomePage from './pages/HomePage'
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Tracking from './pages/Tracking';
import './App.css'
import Page_404 from './pages/404Page';

function App() {
  
  return(
    <Routes>
      <Route index element={<HomePage />}></Route>
      <Route path="checkout" element={<Checkout />}></Route>
      <Route path="orders" element={<Orders />}></Route>
      <Route path="tracking" element={<Tracking />}></Route>
      <Route path="*" element={<Page_404/>}></Route>
      
    </Routes>
    
    
  );
}

export default App
