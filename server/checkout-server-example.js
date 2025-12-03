// Example Express server that creates a Stripe Checkout Session
// Save as server/checkout-server-example.js and run with `node` (install dependencies first)

require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4242;

app.use(bodyParser.json());
app.use(cors());

app.post('/create-checkout-session', async (req, res) => {
  try {
    const { items } = req.body;
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'No items provided' });
    }

    // Build line_items compatible with Stripe Checkout
    const line_items = items.map(i => ({
      price_data: {
        currency: 'usd',
        product_data: { name: i.name, images: i.image ? [i.image] : undefined },
        unit_amount: i.unit_amount,
      },
      quantity: i.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items,
      success_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/?checkout=success`,
      cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/?checkout=cancel`,
    });

    // Return the session ID (or full URL if you prefer)
    res.json({ sessionId: session.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error creating checkout session' });
  }
});

app.listen(PORT, () => console.log(`Checkout server listening on port ${PORT}`));
