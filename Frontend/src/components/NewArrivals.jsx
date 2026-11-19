import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Heart, ShoppingBag } from "lucide-react";
import blackTrousersImage from "../assets/product-black-trousers.jpg";
import cashmereSweaterImage from "../assets/product-cashmere-sweater.jpg";
import leatherToteImage from "../assets/product-leather-tote.jpg";
import trenchCoatImage from "../assets/product-trench-coat.jpg";

const products = [
  {
    id: "classic-beige-trench-coat",
    name: "Classic Beige Trench Coat",
    category: "Outerwear",
    price: "Rs. 12,500",
    image: trenchCoatImage,
    alt: "Model wearing a light beige trench coat against a white studio wall",
  },
  {
    id: "cashmere-knit-sweater",
    name: "Cashmere Knit Sweater",
    category: "Knitwear",
    price: "Rs. 8,500",
    image: cashmereSweaterImage,
    alt: "Close-up of a soft beige knit sweater",
  },
  {
    id: "tailored-black-trousers",
    name: "Tailored Black Trousers",
    category: "Trousers",
    price: "Rs. 6,500",
    image: blackTrousersImage,
    alt: "Model in a tailored black outfit and trousers",
  },
  {
    id: "everyday-leather-tote",
    name: "Everyday Leather Tote",
    category: "Handbags",
    price: "Rs. 9,500",
    image: leatherToteImage,
    alt: "Close-up of a brown leather tote with slim shoulder straps",
  },
];

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

const productInfoVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

function NewArrivals() {
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const shouldReduceMotion = useReducedMotion();

  const toggleProduct = (productId, setProducts) => {
    setProducts((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId],
    );
  };

  return (
    <section className="bg-[#F5F1E9] px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28 xl:px-20">
      <div className="mx-auto w-full max-w-[1920px]">
        <motion.header
          className="mb-12 text-center sm:mb-16 lg:mb-20"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="font-serif text-4xl text-[#29241f] sm:text-5xl lg:text-6xl">
            New Arrivals
          </h2>
          <p className="mt-4 text-base text-[#6c6259] sm:text-lg">
            Explore our latest collection.
          </p>
        </motion.header>

        <motion.div
          className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-16 lg:gap-x-16 lg:gap-y-20"
          variants={productGridVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.1 }}
        >
          {products.map((product) => {
            const isWishlisted = wishlist.includes(product.id);
            const isInCart = cart.includes(product.id);

            return (
              <motion.article
                key={product.id}
                variants={productCardVariants}
              >
                <div className="relative aspect-square overflow-hidden bg-[#e7e0d4]">
                  <motion.img
                    src={product.image}
                    alt={product.alt}
                    loading="lazy"
                    whileHover={
                      shouldReduceMotion ? undefined : { scale: 1.05 }
                    }
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="h-full w-full object-cover"
                  />

                  <motion.button
                    type="button"
                    aria-label={
                      isWishlisted
                        ? `Remove ${product.name} from wishlist`
                        : `Add ${product.name} to wishlist`
                    }
                    aria-pressed={isWishlisted}
                    onClick={() => toggleProduct(product.id, setWishlist)}
                    whileHover={shouldReduceMotion ? undefined : { scale: 1.06 }}
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className={`absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#F5F1E9]/95 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-5 sm:top-5 sm:h-12 sm:w-12 ${
                      isWishlisted ? "text-rose-700" : "text-[#29241f]"
                    }`}
                  >
                    <Heart
                      aria-hidden="true"
                      size={22}
                      strokeWidth={1.6}
                      fill={isWishlisted ? "currentColor" : "none"}
                    />
                  </motion.button>

                  <motion.button
                    type="button"
                    aria-label={
                      isInCart
                        ? `Remove ${product.name} from bag`
                        : `Add ${product.name} to bag`
                    }
                    aria-pressed={isInCart}
                    onClick={() => toggleProduct(product.id, setCart)}
                    whileHover={shouldReduceMotion ? undefined : { scale: 1.06 }}
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#F5F1E9] text-[#29241f] shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:bottom-5 sm:right-5 sm:h-14 sm:w-14"
                  >
                    {isInCart ? (
                      <Check aria-hidden="true" size={22} strokeWidth={1.7} />
                    ) : (
                      <ShoppingBag
                        aria-hidden="true"
                        size={22}
                        strokeWidth={1.5}
                      />
                    )}
                  </motion.button>
                </div>

                <motion.div
                  variants={productInfoVariants}
                  className="flex items-start justify-between gap-6 pt-6 sm:pt-7 lg:pt-8"
                >
                  <div>
                    <h3 className="font-serif text-2xl leading-tight text-[#29241f] sm:text-3xl lg:text-4xl">
                      {product.name}
                    </h3>
                    <p className="mt-2 text-sm uppercase tracking-[0.16em] text-[#766b61] sm:text-base">
                      {product.category}
                    </p>
                  </div>
                  <p className="shrink-0 pt-1 text-base font-medium text-[#29241f] sm:text-lg lg:text-xl">
                    {product.price}
                  </p>
                </motion.div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default NewArrivals;
