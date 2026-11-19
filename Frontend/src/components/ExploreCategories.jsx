import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import accessoriesImage from "../assets/category-accessories.jpg";
import clothingImage from "../assets/category-clothing.jpg";
import dressesImage from "../assets/category-dresses.jpg";
import handbagsImage from "../assets/category-handbags.jpg";
import jewelryImage from "../assets/category-jewelry.jpg";
import newArrivalsImage from "../assets/category-new-arrivals.jpg";
import outerwearImage from "../assets/category-outerwear.jpg";
import shoesImage from "../assets/category-shoes.jpg";

const categories = [
  {
    name: "Clothing",
    slug: "clothing",
    image: clothingImage,
    alt: "Woman in an ivory suit among warm stone cliffs",
  },
  {
    name: "Handbags",
    slug: "handbags",
    image: handbagsImage,
    alt: "Woman styling a warm brown leather handbag",
  },
  {
    name: "Shoes",
    slug: "shoes",
    image: shoesImage,
    alt: "Beige heels arranged in a softly lit neutral setting",
  },
  {
    name: "Accessories",
    slug: "accessories",
    image: accessoriesImage,
    alt: "Gold necklaces layered over a soft knit top",
  },
  {
    name: "Dresses",
    slug: "dresses",
    image: dressesImage,
    alt: "Woman in a flowing neutral dress in a sunlit room",
  },
  {
    name: "Outerwear",
    slug: "outerwear",
    image: outerwearImage,
    alt: "Woman wearing a refined beige coat",
  },
  {
    name: "Jewelry",
    slug: "jewelry",
    image: jewelryImage,
    alt: "Gold jewelry arranged on cream fabric",
  },
  {
    name: "New Arrivals",
    slug: "new-arrivals",
    image: newArrivalsImage,
    alt: "Woman in a tailored cream blazer and brown hat",
  },
];

const categoryCardVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

function CategoryCard({ category, index, isDuplicate, shouldReduceMotion }) {
  const [isHovered, setIsHovered] = useState(false);
  const isMotionEnabled = !shouldReduceMotion && isHovered;

  return (
    <motion.div
      initial={shouldReduceMotion || isDuplicate ? false : "hidden"}
      whileInView={
        shouldReduceMotion || isDuplicate ? undefined : "visible"
      }
      viewport={{ once: true, amount: 0.2 }}
      variants={categoryCardVariants}
      transition={{
        duration: 0.6,
        delay: shouldReduceMotion || isDuplicate ? 0 : index * 0.07,
        ease: "easeOut",
      }}
      className="shrink-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        to={`/shop?category=${category.slug}`}
        aria-label={`Explore ${category.name}`}
        tabIndex={isDuplicate ? -1 : undefined}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        className="relative block aspect-[4/5] w-[72vw] min-w-[250px] max-w-[420px] shrink-0 overflow-hidden bg-[#e7e0d4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#514a42]"
      >
        <motion.img
          src={category.image}
          alt={category.alt}
          animate={{ scale: isMotionEnabled ? 1.05 : 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="h-full w-full object-cover"
        />
        <motion.div
          aria-hidden="true"
          animate={{ opacity: isMotionEnabled ? 1 : 0.9 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 text-white sm:p-6 lg:p-7">
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl">
              {category.name}
            </h3>
            <span className="mt-2 block text-[0.65rem] font-medium uppercase tracking-[0.2em] sm:text-xs">
              Explore
            </span>
          </div>
          <motion.span
            animate={{
              x: isMotionEnabled ? 3 : 0,
              y: isMotionEnabled ? -3 : 0,
            }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="pointer-events-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#29241f] sm:h-12 sm:w-12"
          >
            <ArrowUpRight
              aria-hidden="true"
              size={22}
              strokeWidth={1.5}
            />
          </motion.span>
        </div>
      </Link>
    </motion.div>
  );
}

function ExploreCategories() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="overflow-hidden bg-[#F5F1E9] py-16 sm:py-20 lg:py-24">
      <motion.header
        className="mb-10 px-4 text-center sm:mb-14 sm:px-8 lg:mb-16 lg:px-12"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2
          id="explore-categories-heading"
          className="font-serif text-4xl text-[#29241f] sm:text-5xl lg:text-6xl"
        >
          Explore Elegance
        </h2>
        <p className="mt-4 text-sm text-[#6c6259] sm:text-base">
          Discover pieces that define your style.
        </p>
      </motion.header>

      <div
        className="category-marquee w-full"
        role="region"
        aria-labelledby="explore-categories-heading"
      >
        <motion.div
          className="category-marquee-track flex"
          animate={{ x: shouldReduceMotion ? 0 : "-50%" }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { x: { duration: 42, ease: "linear", repeat: Infinity } }
          }
        >
          {[false, true].map((isDuplicate) => (
            <div
              key={isDuplicate ? "duplicate" : "original"}
              aria-hidden={isDuplicate || undefined}
              className="flex shrink-0 gap-4 pr-4 sm:gap-6 sm:pr-6"
            >
              {categories.map((category, index) => (
                <CategoryCard
                  key={category.slug}
                  category={category}
                  index={index}
                  isDuplicate={isDuplicate}
                  shouldReduceMotion={shouldReduceMotion}
                />
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default ExploreCategories;
