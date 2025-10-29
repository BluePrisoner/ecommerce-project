
import './HomePage.css'
import Header from '../../components/Header';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ProductGrid from './ProductGrid';

function HomePage({cart}) {


    const [products,setProducts] = useState([]);

    useEffect(() =>{

        const getProductsData = async ()=>{
            const res = await axios.get('/api/products');
            setProducts(res.data);
        };
        getProductsData();
    }, [])


    
    return (
        <>
            <title>Ecommerce Project</title>

            <Header cart={cart}/>

            <div className="home-page">
              <ProductGrid products={products} />
            </div>
        </>
    );
}

export default HomePage;