// server/routes/webhook.js
// Stripe webhook route

const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { ApiError } = require('../middleware/errorHandler');

router.post('/stripe', async (req, res) => {
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    if (webhookSecret) {
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } else {
      event = JSON.parse(req.body);
    }
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        console.log('Payment succeeded:', paymentIntent.id);
        
        await Order.findOneAndUpdate(
          { stripePaymentIntentId: paymentIntent.id },
          { paymentStatus: 'paid' }
        );
        break;

      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object;
        console.log('Payment failed:', failedPayment.id);
        
        await Order.findOneAndUpdate(
          { stripePaymentIntentId: failedPayment.id },
          { paymentStatus: 'failed' }
        );
        break;

      case 'charge.refunded':
        const refundedCharge = event.data.object;
        console.log('Charge refunded:', refundedCharge.id);
        
        const order = await Order.findOne({ stripePaymentIntentId: refundedCharge.payment_intent });
        if (order) {
          order.paymentStatus = 'refunded';
          order.orderStatus = 'cancelled';
          await order.save();
        }
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook handler error:', error);
    res.status(500).json({ error: 'Webhook handler failed' });
  }
});

module.exports = router;
