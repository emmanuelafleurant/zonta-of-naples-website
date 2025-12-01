import React from "react";

// Stripe functionality has been removed. Provide a simple fallback message.
export default function Checkout() {
  return (
    <div id="checkout">
      <section>
        <h2>Checkout disabled</h2>
        <p>
          Online payments are currently disabled for this site. To purchase items,
          please contact us at <a href="mailto:orders@example.com">orders@example.com</a>.
        </p>
      </section>
    </div>
  );
}
