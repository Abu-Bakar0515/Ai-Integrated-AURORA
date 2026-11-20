import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useCart } from "../context/cartState";
import { formatPrice, productCatalog } from "../data/products";

const DELIVERY_CHARGES = 0;

function CartPage() {
  const {
    cart,
    cartCount,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const items = cart
    .map((cartItem) => ({
      ...cartItem,
      product: productCatalog.find(
        (product) => product.id === cartItem.productId,
      ),
    }))
    .filter((cartItem) => cartItem.product);

  const subtotal = items.reduce(
    (total, { product, quantity }) => total + product.price * quantity,
    0,
  );
  const discount = items.reduce(
    (total, { product, quantity }) =>
      total +
      Math.max(0, product.price - (product.salePrice ?? product.price)) *
        quantity,
    0,
  );
  const total = subtotal - discount + DELIVERY_CHARGES;

  return (
    <>
      <Navbar />
      <main className="min-h-[60vh] bg-[#F5F1E9]">
        <header className="border-b border-[#342d25]/10 px-4 py-10 text-center sm:px-8 sm:py-14">
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.28em] text-[#766b61] sm:text-xs">
            AURORA COLLECTION
          </p>
          <h1 className="mt-3 font-serif text-4xl text-[#29241f] sm:text-5xl">
            Your Shopping Bag
          </h1>
          <p className="mt-3 text-sm text-[#6c6259]">
            {cartCount} {cartCount === 1 ? "item" : "items"} in your bag
          </p>
        </header>

        {items.length ? (
          <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-8 px-4 py-8 sm:px-6 sm:py-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-10 lg:px-10 lg:py-12">
            <section aria-label="Shopping bag items" className="min-w-0">
              <ul className="divide-y divide-[#342d25]/10 border-y border-[#342d25]/10 bg-white">
                {items.map(({ product, quantity }) => {
                  const unitPrice = product.salePrice ?? product.price;
                  const lineTotal = unitPrice * quantity;
                  const lineDiscount =
                    Math.max(0, product.price - unitPrice) * quantity;

                  return (
                    <li
                      key={product.id}
                      className="flex gap-4 p-4 sm:gap-6 sm:p-6"
                    >
                      <img
                        src={product.image}
                        alt={product.alt}
                        className="aspect-[3/4] w-20 shrink-0 object-cover sm:w-28"
                      />
                      <div className="flex min-w-0 flex-1 flex-col sm:flex-row sm:justify-between sm:gap-6">
                        <div className="min-w-0">
                          <p className="text-[0.6rem] uppercase tracking-[0.16em] text-[#766b61]">
                            {product.category}
                          </p>
                          <h2 className="mt-1 font-serif text-base text-[#29241f] sm:text-lg">
                            {product.name}
                          </h2>
                          <p className="mt-1 text-xs leading-relaxed text-[#766b61]">
                            {product.description}
                          </p>

                          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
                            <span className="font-medium text-[#29241f]">
                              {formatPrice(unitPrice)}
                            </span>
                            {product.salePrice && (
                              <span className="text-xs text-[#8b8177] line-through">
                                {formatPrice(product.price)}
                              </span>
                            )}
                          </div>
                          {lineDiscount > 0 && (
                            <p className="mt-1 text-xs text-[#766b61]">
                              You save {formatPrice(lineDiscount)}
                            </p>
                          )}
                        </div>

                        <div className="mt-4 flex items-center justify-between gap-4 sm:mt-0 sm:flex-col sm:items-end sm:justify-between">
                          <div
                            role="group"
                            className="flex h-9 items-center border border-[#342d25]/20"
                            aria-label={`Quantity for ${product.name}`}
                          >
                            <button
                              type="button"
                              aria-label={`Decrease quantity of ${product.name}`}
                              onClick={() => decreaseQuantity(product.id)}
                              disabled={quantity <= 1}
                              className="flex h-full w-9 items-center justify-center text-[#514a42] transition-colors hover:bg-[#F5F1E9] disabled:cursor-not-allowed disabled:opacity-40"
                            >
                              <Minus aria-hidden="true" size={14} />
                            </button>
                            <span
                              aria-live="polite"
                              className="min-w-8 text-center text-sm text-[#29241f]"
                            >
                              {quantity}
                            </span>
                            <button
                              type="button"
                              aria-label={`Increase quantity of ${product.name}`}
                              onClick={() => increaseQuantity(product.id)}
                              className="flex h-full w-9 items-center justify-center text-[#514a42] transition-colors hover:bg-[#F5F1E9]"
                            >
                              <Plus aria-hidden="true" size={14} />
                            </button>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-sm font-medium text-[#29241f]">
                              {formatPrice(lineTotal)}
                            </span>
                            <button
                              type="button"
                              aria-label={`Remove ${product.name} from cart`}
                              onClick={() => removeFromCart(product.id)}
                              className="text-[#766b61] transition-colors hover:text-[#29241f]"
                            >
                              <Trash2 aria-hidden="true" size={17} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <Link
                to="/shop"
                className="mt-5 inline-block text-xs font-medium uppercase tracking-[0.14em] text-[#514a42] underline underline-offset-4 transition-colors hover:text-[#29241f]"
              >
                Continue Shopping
              </Link>
            </section>

            <aside
              aria-labelledby="order-summary-heading"
              className="h-fit bg-white p-5 sm:p-6 lg:sticky lg:top-28"
            >
              <h2
                id="order-summary-heading"
                className="border-b border-[#342d25]/10 pb-4 font-serif text-xl text-[#29241f]"
              >
                Order Summary
              </h2>
              <dl className="space-y-4 py-5 text-sm">
                <div className="flex justify-between gap-4 text-[#6c6259]">
                  <dt>Subtotal</dt>
                  <dd>{formatPrice(subtotal)}</dd>
                </div>
                <div className="flex justify-between gap-4 text-[#6c6259]">
                  <dt>Discount</dt>
                  <dd className={discount ? "text-[#29241f]" : ""}>
                    {discount ? `-${formatPrice(discount)}` : formatPrice(0)}
                  </dd>
                </div>
                <div className="flex justify-between gap-4 text-[#6c6259]">
                  <dt>Delivery</dt>
                  <dd>{formatPrice(DELIVERY_CHARGES)}</dd>
                </div>
                <div className="flex justify-between gap-4 border-t border-[#342d25]/10 pt-4 font-medium text-[#29241f]">
                  <dt>Total</dt>
                  <dd>{formatPrice(total)}</dd>
                </div>
              </dl>
              <p className="text-xs leading-relaxed text-[#8b8177]">
                Delivery charges are set to PKR 0.
              </p>
            </aside>
          </div>
        ) : (
          <section className="mx-auto flex min-h-72 max-w-xl flex-col items-center justify-center px-6 py-16 text-center">
            <ShoppingBag
              aria-hidden="true"
              size={28}
              strokeWidth={1.3}
              className="text-[#766b61]"
            />
            <h2 className="mt-4 font-serif text-2xl text-[#29241f]">
              Your bag is empty
            </h2>
            <p className="mt-2 text-sm text-[#6c6259]">
              Discover timeless pieces for your wardrobe.
            </p>
            <Link
              to="/shop"
              className="mt-6 bg-[#29241f] px-6 py-3 text-[0.65rem] font-medium uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#514a42]"
            >
              Explore the Collection
            </Link>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}

export default CartPage;
