
import './Orders.css'
import Header from '../../components/Header';
import { Link } from 'react-router';
import axios from 'axios';
import { useEffect, useState, Fragment } from 'react';
import OrdersGrid from './OrdersGrid';

function Orders({ cart }) {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get('/api/orders?expand=products')
            .then((res) => {
                setOrders(res.data);
            })
    }, [])

    return (
        <>
            <title>Orders</title>

            <Header cart={cart} />

            <div className="orders-page">
                <div className="page-title">Your Orders</div>
                <OrdersGrid orders={orders}/>
            </div>
        </>
    );
}
export default Orders