import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import ProductCard from "./ProductCard";
import { useCart } from "../context/cartState";
import {
  formatPrice,
  productCatalog,
  productCategories,
} from "../data/products";

const MAX_PRICE = 50000;

const primaryCategories = [
  { label: "All Products", slug: null },
  { label: "Clothing", slug: "clothing" },
  { label: "Handbags", slug: "handbags" },
  { label: "Shoes", slug: "shoes" },
  { label: "Accessories", slug: "accessories" },
];

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

function readCategoryFilters(value) {
  const allowedSlugs = new Set(productCategories.map(({ slug }) => slug));
  return (value ?? "")
    .split(",")
    .filter((slug) => allowedSlugs.has(slug));
}

function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const shouldReduceMotion = useReducedMotion();
  const selectedCategories = readCategoryFilters(
    searchParams.get("category"),
  );
  const [minimumPrice, setMinimumPrice] = useState("0");
  const [maximumPrice, setMaximumPrice] = useState(String(MAX_PRICE));
  const [availability, setAvailability] = useState([]);
  const [sortBy, setSortBy] = useState("featured");
  const [wishlist, setWishlist] = useState([]);
  const { cart, cartCount, addToCart } = useCart();

  const updateCategories = (nextCategories) => {
    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams);
      if (nextCategories.length) {
        nextParams.set("category", nextCategories.join(","));
      } else {
        nextParams.delete("category");
      }
      return nextParams;
    });
  };

  const toggleCategory = (categorySlug) => {
    const nextCategories = selectedCategories.includes(categorySlug)
      ? selectedCategories.filter((slug) => slug !== categorySlug)
      : [...selectedCategories, categorySlug];
    updateCategories(nextCategories);
  };

  const toggleAvailability = (value) => {
    setAvailability((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    );
  };

  const toggleProduct = (productId, setProducts) => {
    setProducts((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId],
    );
  };

  const minimum = minimumPrice === "" ? 0 : Number(minimumPrice);
  const maximum = maximumPrice === "" ? MAX_PRICE : Number(maximumPrice);
  const filteredProducts = productCatalog
    .filter((product) => {
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.some((slug) =>
          product.categorySlug === slug,
        );
      const matchesAvailability =
        availability.length === 0 ||
        availability.includes(
          product.isInStock ? "in-stock" : "out-of-stock",
        );

      return (
        matchesCategory &&
        product.price >= minimum &&
        product.price <= maximum &&
        matchesAvailability
      );
    })
    .sort((first, second) => {
      if (sortBy === "price-low-to-high") {
        return first.price - second.price;
      }
      if (sortBy === "price-high-to-low") {
        return second.price - first.price;
      }
      if (sortBy === "newest") {
        return second.newestRank - first.newestRank;
      }
      return Number(second.isFeatured) - Number(first.isFeatured);
    });

  const clearFilters = () => {
    updateCategories([]);
    setMinimumPrice("0");
    setMaximumPrice(String(MAX_PRICE));
    setAvailability([]);
    setSortBy("featured");
  };

  const isDefaultFilter =
    selectedCategories.length === 0 &&
    minimumPrice === "0" &&
    maximumPrice === String(MAX_PRICE) &&
    availability.length === 0 &&
    sortBy === "featured";

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
            Discover Your Style
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#6c6259] sm:text-base">
            Explore timeless pieces curated for modern elegance.
          </p>
        </motion.header>

        <nav
          aria-label="Shop categories"
          className="border-b border-[#342d25]/10 px-4 sm:px-8"
        >
          <div className="mx-auto flex max-w-[1440px] gap-6 overflow-x-auto sm:justify-center sm:gap-10">
            {primaryCategories.map(({ label, slug }) => {
              const isSelected = slug
                ? selectedCategories.length === 1 &&
                  selectedCategories[0] === slug
                : selectedCategories.length === 0;

              return (
                <motion.button
                  key={label}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => updateCategories(slug ? [slug] : [])}
                  whileHover={shouldReduceMotion ? undefined : { y: -1 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className={`relative shrink-0 py-4 text-[0.65rem] font-medium uppercase tracking-[0.16em] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#514a42] sm:py-5 sm:text-xs ${
                    isSelected ? "text-[#29241f]" : "text-[#766b61] hover:text-[#29241f]"
                  }`}
                >
                  {label}
                  <span
                    className={`absolute inset-x-0 bottom-0 h-px origin-left bg-[#29241f] transition-transform duration-300 ${
                      isSelected ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </motion.button>
              );
            })}
          </div>
        </nav>

        <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-8 px-4 py-8 sm:px-6 sm:py-10 lg:grid-cols-[230px_minmax(0,1fr)] lg:gap-10 lg:px-10 lg:py-12">
          <aside
            aria-label="Product filters"
            className="h-fit bg-white p-5 sm:p-6 lg:sticky lg:top-24"
          >
            <div className="flex items-center justify-between border-b border-[#342d25]/10 pb-4">
              <h2 className="font-serif text-xl text-[#29241f]">Filters</h2>
              <button
                type="button"
                onClick={clearFilters}
                disabled={isDefaultFilter}
                className="text-[0.62rem] font-medium uppercase tracking-[0.12em] text-[#766b61] underline underline-offset-4 transition-colors hover:text-[#29241f] disabled:cursor-default disabled:no-underline disabled:opacity-45"
              >
                Clear All
              </button>
            </div>

            <fieldset className="border-b border-[#342d25]/10 py-5">
              <legend className="mb-3 text-[0.65rem] font-medium uppercase tracking-[0.16em] text-[#514a42]">
                Category
              </legend>
              <div className="space-y-2.5">
                {productCategories.map(({ slug, label }) => (
                  <label
                    key={slug}
                    className="flex cursor-pointer items-center gap-2.5 text-sm text-[#6c6259]"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(slug)}
                      onChange={() => toggleCategory(slug)}
                      className="h-3.5 w-3.5 accent-[#514a42]"
                    />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="border-b border-[#342d25]/10 py-5">
              <legend className="mb-3 text-[0.65rem] font-medium uppercase tracking-[0.16em] text-[#514a42]">
                Price Range (PKR)
              </legend>
              <div className="grid grid-cols-2 gap-3">
                <label className="text-xs text-[#766b61]">
                  Min
                  <input
                    type="number"
                    min="0"
                    max={MAX_PRICE}
                    step="500"
                    value={minimumPrice}
                    onChange={(event) => setMinimumPrice(event.target.value)}
                    className="mt-1.5 w-full border border-[#342d25]/15 bg-[#F5F1E9] px-2.5 py-2 text-sm text-[#29241f] outline-none focus:border-[#514a42]"
                  />
                </label>
                <label className="text-xs text-[#766b61]">
                  Max
                  <input
                    type="number"
                    min="0"
                    max={MAX_PRICE}
                    step="500"
                    value={maximumPrice}
                    onChange={(event) => setMaximumPrice(event.target.value)}
                    className="mt-1.5 w-full border border-[#342d25]/15 bg-[#F5F1E9] px-2.5 py-2 text-sm text-[#29241f] outline-none focus:border-[#514a42]"
                  />
                </label>
              </div>
              <p className="mt-2 text-[0.65rem] text-[#8b8177]">
                Up to {formatPrice(MAX_PRICE)}
              </p>
            </fieldset>

            <fieldset className="border-b border-[#342d25]/10 py-5">
              <legend className="mb-3 text-[0.65rem] font-medium uppercase tracking-[0.16em] text-[#514a42]">
                Availability
              </legend>
              <div className="space-y-2.5">
                {[
                  { value: "in-stock", label: "In Stock" },
                  { value: "out-of-stock", label: "Out of Stock" },
                ].map(({ value, label }) => (
                  <label
                    key={value}
                    className="flex cursor-pointer items-center gap-2.5 text-sm text-[#6c6259]"
                  >
                    <input
                      type="checkbox"
                      checked={availability.includes(value)}
                      onChange={() => toggleAvailability(value)}
                      className="h-3.5 w-3.5 accent-[#514a42]"
                    />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <label className="block pt-5">
              <span className="mb-3 block text-[0.65rem] font-medium uppercase tracking-[0.16em] text-[#514a42]">
                Sort By
              </span>
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="w-full border border-[#342d25]/15 bg-[#F5F1E9] px-3 py-2.5 text-sm text-[#514a42] outline-none focus:border-[#514a42]"
              >
                <option value="featured">Featured</option>
                <option value="price-low-to-high">Price: Low to High</option>
                <option value="price-high-to-low">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
            </label>
          </aside>

          <section aria-labelledby="shop-products-heading" className="min-w-0">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3 border-b border-[#342d25]/10 pb-4">
              <div>
                <h2
                  id="shop-products-heading"
                  className="font-serif text-2xl text-[#29241f] sm:text-3xl"
                >
                  {selectedCategories.length === 1
                    ? productCategories.find(
                        ({ slug }) => slug === selectedCategories[0],
                      )?.label
                    : "All Pieces"}
                </h2>
                <p
                  aria-live="polite"
                  className="mt-1 text-xs text-[#766b61]"
                >
                  Showing {filteredProducts.length} of {productCatalog.length}{" "}
                  pieces
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
                      onToggleWishlist={(productId) =>
                        toggleProduct(productId, setWishlist)
                      }
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
                  Try adjusting your filters to discover more from the
                  collection.
                </p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 border border-[#342d25]/25 px-5 py-2.5 text-[0.65rem] font-medium uppercase tracking-[0.14em] text-[#514a42] transition-colors hover:bg-[#29241f] hover:text-white"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Shop;
