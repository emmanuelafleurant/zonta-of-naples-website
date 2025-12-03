Stripe integration instructions

1) Add environment variables

- In your frontend Vite app, set the publishable key in `.env` (or your environment):

  VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...

- For the backend/server, set your Stripe secret key and frontend URL in `.env`:

  STRIPE_SECRET_KEY=sk_test_...
  FRONTEND_URL=http://localhost:5173

2) Example server

See `server/checkout-server-example.js` for a minimal Express server that creates a Checkout Session. Install dependencies and run:

```bash
npm init -y
npm install express stripe body-parser dotenv
node server/checkout-server-example.js

If your frontend runs on a different origin, also install and use `cors` on the server:

```
npm install cors
```
```

3) How the flow works

- The React app (updated `src/components/Cart.jsx`) POSTs the cart items to `/create-checkout-session`.
- The server uses the secret key to call Stripe and create a Checkout Session, returning a `sessionId`.
- The client loads `https://js.stripe.com/v3/` and calls `stripe.redirectToCheckout({ sessionId })`.

4) Notes

- Use HTTPS in production and secure your secret key.
- You can return `session.url` from the server and redirect directly if you prefer.
- If you use a different server path or host, update the fetch URL accordingly in `Cart.jsx`.

5) Testing

- Use Stripe test keys and test card numbers (e.g., 4242 4242 4242 4242).
- Monitor logs on the server to debug session creation errors.
