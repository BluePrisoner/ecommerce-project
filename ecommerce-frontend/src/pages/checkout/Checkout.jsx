import { Link } from 'react-router';
import './Checkout.css'
import Checkout_Header from './Checkout_Header';
import axios from 'axios';
import { useEffect, useState } from 'react';
import OrderSummary from './OrderSummary';
import PaymentSummary from './PaymentSummary';


function Checkout({ cart }) {

    const [deliveryOptions, setDeliveryOptions] = useState([]);
    const [paymentSummary, setPaymentSummary] = useState([]);

    useEffect(() => {
        axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
            .then((res) => {
                setDeliveryOptions(res.data);
            })
        axios.get('/api/payment-summary')
            .then((res) => {
                setPaymentSummary(res.data);
            })
    }, [])

    return (
        <>
            <title>Checkout</title>
            <Checkout_Header cart={cart} />
            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                    <OrderSummary cart={cart} deliveryOptions={deliveryOptions} />
                    <PaymentSummary paymentSummary={paymentSummary}/>
                </div>
            </div>
        </>
    );
}

export default Checkout;