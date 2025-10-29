
import './HomePage.css'
import Header from '../../components/Header';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ProductGrid from './ProductGrid';

function HomePage({cart}) {


    const [products,setProducts] = useState([]);

    useEffect(() =>{
        axios.get('/api/products')
            .then((res) => {
                setProducts(res.data);
            })
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