import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import ProductCard from "./ProductCard";
import { useCart } from "../context/cartState";
import { newArrivalProducts } from "../data/products";

const productGridVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const productCardVariants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.12,
    },
  },
};

function NewArrivals() {
  const [wishlist, setWishlist] = useState([]);
  const { cart, addToCart } = useCart();
  const shouldReduceMotion = useReducedMotion();

  const toggleProduct = (productId, setProducts) =>
    setProducts((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId],
    );

  return (
    <section className="bg-[#F5F1E9] px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
      <div className="mx-auto w-full max-w-[1440px]">
        <motion.header
          className="mb-8 text-center sm:mb-10"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="font-serif text-3xl text-[#29241f] sm:text-4xl lg:text-5xl">
            New Arrivals
          </h2>
          <p className="mt-3 text-sm text-[#6c6259]">
            Explore our latest collection.
          </p>
        </motion.header>

        <motion.div
          className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 sm:gap-y-10 lg:grid-cols-4 lg:gap-x-6"
          variants={productGridVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.1 }}
        >
          {newArrivalProducts.slice(0, 4).map((product) => {
            const isWishlisted = wishlist.includes(product.id);
            const isInCart = cart.some(
              (item) => item.productId === product.id,
            );

            return (
              <motion.article
                key={product.id}
                variants={productCardVariants}
              >
                <ProductCard
                  product={product}
                  isWishlisted={isWishlisted}
                  isInCart={isInCart}
                  onToggleWishlist={(productId) =>
                    toggleProduct(productId, setWishlist)
                  }
                  onAddToCart={addToCart}
                  shouldReduceMotion={shouldReduceMotion}
                />
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default NewArrivals;
