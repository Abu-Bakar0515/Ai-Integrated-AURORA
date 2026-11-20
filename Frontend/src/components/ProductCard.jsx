import { motion } from "framer-motion";
import { Heart, ShoppingBag } from "lucide-react";
import { formatPrice } from "../data/products";

function ProductCard({
  product,
  isWishlisted,
  isInCart,
  onToggleWishlist,
  onAddToCart,
  shouldReduceMotion,
}) {
  return (
    <div className="flex h-full flex-col bg-white">
      <div className="relative aspect-[3/4] overflow-hidden bg-[#e7e0d4]">
        <motion.img
          src={product.image}
          alt={product.alt}
          loading="lazy"
          whileHover={shouldReduceMotion ? undefined : { scale: 1.06 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="h-full w-full object-cover"
        />
        <div className="absolute left-2.5 top-2.5 flex flex-wrap gap-1.5 sm:left-3 sm:top-3">
          {product.isNew && (
            <span className="bg-[#F5F1E9] px-2 py-1 text-[0.58rem] font-medium uppercase tracking-[0.14em] text-[#514a42]">
              New
            </span>
          )}
          {product.salePrice && (
            <span className="bg-[#29241f] px-2 py-1 text-[0.58rem] font-medium uppercase tracking-[0.14em] text-white">
              Sale
            </span>
          )}
        </div>
        <motion.button
          type="button"
          aria-label={
            isWishlisted
              ? `Remove ${product.name} from wishlist`
              : `Add ${product.name} to wishlist`
          }
          aria-pressed={isWishlisted}
          onClick={() => onToggleWishlist(product.id)}
          whileHover={shouldReduceMotion ? undefined : { scale: 1.08 }}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={`absolute right-2.5 top-2.5 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-3 sm:top-3 sm:h-10 sm:w-10 ${
            isWishlisted ? "text-rose-700" : "text-[#29241f]"
          }`}
        >
          <Heart
            aria-hidden="true"
            size={17}
            strokeWidth={1.6}
            fill={isWishlisted ? "currentColor" : "none"}
          />
        </motion.button>
      </div>

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <p className="text-[0.6rem] uppercase tracking-[0.16em] text-[#766b61]">
          {product.category}
        </p>
        <h3 className="mt-1 min-h-10 font-serif text-sm leading-snug text-[#29241f] sm:text-base">
          {product.name}
        </h3>
        <p className="mt-1 min-h-9 text-xs leading-relaxed text-[#766b61]">
          {product.description}
        </p>
        <div className="mt-2 flex items-center gap-2 text-xs sm:text-sm">
          {product.salePrice ? (
            <>
              <span className="font-medium text-[#29241f]">
                {formatPrice(product.salePrice)}
              </span>
              <span className="text-[#8b8177] line-through">
                {formatPrice(product.price)}
              </span>
            </>
          ) : (
            <span className="font-medium text-[#29241f]">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
        <motion.button
          type="button"
          onClick={() => onAddToCart(product.id)}
          disabled={!product.isInStock}
          aria-label={
            isInCart
              ? `Add another ${product.name} to cart`
              : `Add ${product.name} to cart`
          }
          whileHover={
            shouldReduceMotion || !product.isInStock
              ? undefined
              : { backgroundColor: "#29241f", color: "#ffffff" }
          }
          whileTap={
            shouldReduceMotion || !product.isInStock
              ? undefined
              : { scale: 0.98 }
          }
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={`mt-4 flex min-h-10 w-full items-center justify-center gap-2 border border-[#342d25]/20 px-2 text-[0.62rem] font-medium uppercase tracking-[0.12em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#514a42] sm:text-xs ${
            product.isInStock
              ? "text-[#29241f]"
              : "cursor-not-allowed bg-[#eeeae3] text-[#8b8177]"
          }`}
        >
          <ShoppingBag aria-hidden="true" size={15} strokeWidth={1.5} />
          {product.isInStock
            ? isInCart
              ? "Add Another"
              : "Add to Cart"
            : "Out of Stock"}
        </motion.button>
      </div>
    </div>
  );
}

export default ProductCard;
