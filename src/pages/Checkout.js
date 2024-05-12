import React from 'react'
import '@aws-amplify/ui-react/styles.css';
import { Authenticator } from '@aws-amplify/ui-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from "../components/CheckoutForm";

const Checkout = () => {
    const stripePromise = loadStripe('pk_test_51PFNLGP6lP68FLV1LYGVXvlAHtt09fYelGF4ZNKcdzoeiwDh6btekIfu4AiHFgK4OxMZNvJjc7cSqTuOfPQZPJvK000hqk0YPD');

    return (
        <section className="checkout-wrapper">
            <Authenticator>
                <Elements stripe={stripePromise}>
                    <section>
                        <h2>Time to Checkout?</h2>
                        <CheckoutForm />
                    </section>
                </Elements>
            </Authenticator>
        </section>
    )
}

export default Checkout
