import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Search, X } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useCart } from "../context/cartState";
import { formatPrice, productCatalog } from "../data/products";
import Footer from "./Footer";
import Navbar from "./Navbar";
import ProductCard from "./ProductCard";

const gridVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.025 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const quickSearches = ["Clothing", "Handbags", "Shoes", "Accessories"];

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(() => searchParams.get("q") ?? "");
  const [wishlist, setWishlist] = useState([]);
  const shouldReduceMotion = useReducedMotion();
  const { cart, cartCount, addToCart } = useCart();
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const filteredProducts = productCatalog.filter((product) =>
    [
      product.name,
      product.category,
      product.description,
      formatPrice(product.price),
      product.salePrice ? formatPrice(product.salePrice) : "",
      product.salePrice ? "sale discount offer" : "",
      product.isNew ? "new arrival" : "",
      product.isInStock ? "in stock available" : "out of stock unavailable",
    ]
      .join(" ")
      .toLocaleLowerCase()
      .includes(normalizedQuery),
  );

  const applyQuery = (value) => {
    setQuery(value);
    setSearchParams(
      (currentParams) => {
        const nextParams = new URLSearchParams(currentParams);
        if (value.trim()) {
          nextParams.set("q", value);
        } else {
          nextParams.delete("q");
        }
        return nextParams;
      },
      { replace: true },
    );
  };

  const toggleWishlist = (productId) => {
    setWishlist((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId],
    );
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F5F1E9]">
        <motion.header
          className="border-b border-[#342d25]/10 px-4 py-12 text-center sm:px-8 sm:py-16 lg:py-20"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.28em] text-[#766b61] sm:text-xs">
            AURORA COLLECTION
          </p>
          <h1 className="mt-3 font-serif text-4xl text-[#29241f] sm:text-5xl lg:text-6xl">
            Search the collection
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#6c6259] sm:text-base">
            Find a piece by name, category, description, or price.
          </p>

          <form
            role="search"
            onSubmit={(event) => {
              event.preventDefault();
              applyQuery(query);
            }}
            className="mx-auto mt-7 flex max-w-2xl items-center border border-[#342d25]/20 bg-white px-4 transition-colors focus-within:border-[#766b61] sm:mt-9"
          >
            <Search
              aria-hidden="true"
              size={19}
              strokeWidth={1.6}
              className="shrink-0 text-[#766b61]"
            />
            <input
              type="search"
              name="q"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              maxLength={100}
              placeholder="What are you looking for?"
              aria-label="Search products by name, category, description, or price"
              className="min-w-0 flex-1 bg-transparent px-3 py-4 text-sm text-[#29241f] outline-none placeholder:text-[#8b8177] sm:text-base"
            />
            {query && (
              <button
                type="button"
                onClick={() => applyQuery("")}
                aria-label="Clear search"
                className="shrink-0 p-1 text-[#766b61] transition-colors hover:text-[#29241f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#514a42]"
              >
                <X aria-hidden="true" size={18} />
              </button>
            )}
            <button
              type="submit"
              className="ml-2 shrink-0 bg-[#29241f] px-4 py-2.5 text-[0.62rem] font-medium uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#514a42] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#514a42] sm:text-xs"
            >
              Search
            </button>
          </form>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            <span className="mr-1 text-[0.65rem] uppercase tracking-[0.14em] text-[#8b8177]">
              Explore
            </span>
            {quickSearches.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => applyQuery(item)}
                className="border border-[#342d25]/15 px-3 py-1.5 text-xs text-[#514a42] transition-colors hover:border-[#766b61] hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#514a42]"
              >
                {item}
              </button>
            ))}
          </div>
        </motion.header>

        <section
          aria-labelledby="search-results-heading"
          className="mx-auto w-full max-w-[1440px] px-4 py-8 sm:px-6 sm:py-10 lg:px-10 lg:py-12"
        >
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3 border-b border-[#342d25]/10 pb-4">
            <div>
              <h2
                id="search-results-heading"
                className="font-serif text-2xl text-[#29241f] sm:text-3xl"
              >
                {normalizedQuery ? "Search results" : "All Pieces"}
              </h2>
              <p aria-live="polite" className="mt-1 text-xs text-[#766b61]">
                {normalizedQuery
                  ? `${filteredProducts.length} ${
                      filteredProducts.length === 1 ? "piece" : "pieces"
                    } found`
                  : `${filteredProducts.length} pieces to explore`}
              </p>
            </div>
            <p className="text-xs text-[#766b61]">
              Wishlist {wishlist.length} <span className="px-1">·</span> Bag{" "}
              {cartCount}
            </p>
          </div>

          {filteredProducts.length ? (
            <motion.div
              className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 xl:grid-cols-4"
              variants={gridVariants}
              initial={shouldReduceMotion ? false : "hidden"}
              animate={shouldReduceMotion ? undefined : "visible"}
            >
              {filteredProducts.map((product) => (
                <motion.article
                  key={product.id}
                  variants={cardVariants}
                  className="min-w-0"
                >
                  <ProductCard
                    product={product}
                    isWishlisted={wishlist.includes(product.id)}
                    isInCart={cart.some(
                      (item) => item.productId === product.id,
                    )}
                    onToggleWishlist={toggleWishlist}
                    onAddToCart={addToCart}
                    shouldReduceMotion={shouldReduceMotion}
                  />
                </motion.article>
              ))}
            </motion.div>
          ) : (
            <div
              role="status"
              className="flex min-h-64 flex-col items-center justify-center bg-white px-6 text-center"
            >
              <h3 className="font-serif text-2xl text-[#29241f]">
                No pieces found
              </h3>
              <p className="mt-2 max-w-sm text-sm text-[#766b61]">
                Try another name, category, or keyword to find your match.
              </p>
              <button
                type="button"
                onClick={() => applyQuery("")}
                className="mt-5 border border-[#342d25]/25 px-5 py-2.5 text-[0.65rem] font-medium uppercase tracking-[0.14em] text-[#514a42] transition-colors hover:bg-[#29241f] hover:text-white"
              >
                Browse all pieces
              </button>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default SearchPage;
