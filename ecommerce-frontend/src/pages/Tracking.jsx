
import "./Tracking.css"
import { Link } from 'react-router';
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import axios from 'axios';

import Header from "../components/Header";

function Tracking({cart}) {

    const {orderId, productId} = useParams();

    const [orderDetails, setOrderDetails] = useState(null);

    useEffect(()=>{
        const getData = async ()=>{
            const res = await axios.get(`/api/orders/${orderId}?expand=products`);
            setOrderDetails(res.data);
        }
        getData();
    },[orderId])

    if(orderDetails === null) return null;
    const product = orderDetails.products.find(p => p.productId === productId)
    
    const totalDeliveryTimeMs = product.estimatedDeliveryTimeMs -  orderDetails.orderTimeMs;
    const totalTimePassedMs = dayjs().valueOf();
    let deliveryStatus = (totalTimePassedMs/totalDeliveryTimeMs) * 100;
    if(deliveryStatus > 100) deliveryStatus = 100;

    return (
        <>
            <title>Tracking</title>

            <Header cart={cart}/>
            <div className="tracking-page">
                <div className="order-tracking">
                    <Link className="back-to-orders-link link-primary" to="/orders">
                        View all orders
                    </Link>

                    <div className="delivery-date">
                        Arriving on {dayjs(product.estimatedDeliveryTimeMs).format('MMMM D')}
                    </div>

                    <div className="product-info">
                        {product.product.name}
                    </div>

                    <div className="product-info">
                        Quantity: {product.quantity}
                    </div>

                    <img className="product-image" src={product.product.image} />

                    <div className="progress-labels-container">
                        <div className={`progress-label ${deliveryStatus < 33  && 'current-status'}`}>
                            Preparing
                        </div>
                        <div className={`progress-label ${(deliveryStatus >= 33 && deliveryStatus < 100) && 'current-status'}`}>
                            Shipped
                        </div>
                        <div className={`progress-label ${deliveryStatus === 100 && 'current-status'}`}>
                            Delivered
                        </div>
                    </div>

                    <div className="progress-bar-container">
                        <div className="progress-bar" style={{width : `${deliveryStatus}%`}}></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Tracking;