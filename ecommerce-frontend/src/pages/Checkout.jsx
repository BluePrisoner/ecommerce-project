import { Link } from 'react-router';
import './checkout/Checkout.css'
import Checkout_Header from './checkout/Checkout_Header';
import axios from 'axios';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';


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
                    <div className="order-summary">
                        {deliveryOptions.length > 0 && cart.map((cartItem) => {
                            const seletectDeliveryOption = deliveryOptions.find( d=> d.id === cartItem.deliveryOptionId);
                            return (
                                <div key={cartItem.productId} className="cart-item-container">
                                    <div className="delivery-date">
                                        Delivery date: {dayjs(seletectDeliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                                    </div>

                                    <div className="cart-item-details-grid">
                                        <img className="product-image"
                                            src={cartItem.product.image} />

                                        <div className="cart-item-details">
                                            <div className="product-name">
                                                {cartItem.product.name}
                                            </div>
                                            <div className="product-price">
                                                ${(cartItem.product.priceCents / 100).toFixed(2)}
                                            </div>
                                            <div className="product-quantity">
                                                <span>
                                                    Quantity: <span className="quantity-label">{cartItem.quantity}</span>
                                                </span>
                                                <span className="update-quantity-link link-primary">
                                                    Update
                                                </span>
                                                <span className="delete-quantity-link link-primary">
                                                    Delete
                                                </span>
                                            </div>
                                        </div>

                                        <div className="delivery-options">
                                            <div className="delivery-options-title">
                                                Choose a delivery option:
                                            </div>

                                            {
                                                deliveryOptions.map((deliveryOption) => {
                                                    return (
                                                        <div key={deliveryOption.id}className="delivery-option">
                                                            <input type="radio"
                                                                checked = {deliveryOption.id === cartItem.deliveryOptionId}
                                                                className="delivery-option-input"
                                                                name={`delivery-option-${cartItem.productId}`} />
                                                            <div>
                                                                <div className="delivery-option-date">
                                                                    {
                                                                        dayjs(deliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')
                                                                    }
                                                                </div>
                                                                <div className="delivery-option-price">
                                                                    {(deliveryOption.priceCents === 0) ? `FREE Shipping` : `$${(deliveryOption.priceCents / 100).toFixed(2)} - Shipping`}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                    </div>

                    <div className="payment-summary">
                        <div className="payment-summary-title">
                            Payment Summary
                        </div>

                        <div className="payment-summary-row">
                            <div>Items ({paymentSummary.totalItems}):</div>
                            <div className="payment-summary-money">${(paymentSummary.productCostCents /100).toFixed(2)}</div>
                        </div>

                        <div className="payment-summary-row">
                            <div>Shipping &amp; handling:</div>
                            <div className="payment-summary-money">${(paymentSummary.shippingCostCents /100).toFixed(2)}</div>
                        </div>

                        <div className="payment-summary-row subtotal-row">
                            <div>Total before tax:</div>
                            <div className="payment-summary-money">${(paymentSummary.totalCostBeforeTaxCents /100).toFixed(2)}</div>
                        </div>

                        <div className="payment-summary-row">
                            <div>Estimated tax (10%):</div>
                            <div className="payment-summary-money">${(paymentSummary.taxCents /100).toFixed(2)}</div>
                        </div>

                        <div className="payment-summary-row total-row">
                            <div>Order total:</div>
                            <div className="payment-summary-money">${(paymentSummary.totalCostCents /100).toFixed(2)}</div>
                        </div>

                        <button className="place-order-button button-primary">
                            Place your order
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Checkout;