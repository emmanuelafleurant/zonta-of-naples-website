import React from "react";
import products from "../data/products";
import ProductCard from "../components/ProductCard";
import Cart from "../components/Cart";
import { CartProvider } from "../context/CartContext";

export default function Store() {
  return (
    <CartProvider>
      <div className="container site-row">
        <main className="site-main">
          <h1>Store</h1>
          <p>Support the Zonta Club of Naples by purchasing official merchandise.</p>

          <section aria-label="product-grid" className="product-grid">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </section>
        </main>

        <Cart />
      </div>
    </CartProvider>
  );
}
