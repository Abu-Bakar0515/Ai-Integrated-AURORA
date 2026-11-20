import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const MotionLink = motion.create(Link);

const brandContentVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14 },
  },
};

const brandItemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

function BrandIntroduction() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="brand-introduction-heading"
      className="bg-[#EAE7E2] px-5 py-16 text-center sm:px-8 sm:py-20 lg:py-24"
    >
      <motion.div
        className="mx-auto max-w-2xl"
        variants={brandContentVariants}
        initial={shouldReduceMotion ? false : "hidden"}
        whileInView={shouldReduceMotion ? undefined : "visible"}
        viewport={{ once: true }}
      >
        <motion.p
          variants={brandItemVariants}
          className="text-xs font-medium uppercase tracking-[0.28em] text-[#766b61] sm:text-sm"
        >
          THE AURORA EDIT
        </motion.p>
        <motion.h2
          id="brand-introduction-heading"
          variants={brandItemVariants}
          className="mt-4 font-serif text-3xl leading-tight text-[#29241f] sm:mt-5 sm:text-4xl lg:text-5xl"
        >
          The Art of Timeless Essentials
        </motion.h2>
        <motion.p
          variants={brandItemVariants}
          className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#645d55] sm:mt-5 sm:text-base"
        >
          Thoughtfully curated fashion for those who appreciate simplicity,
          quality and timeless elegance.
        </motion.p>
        <MotionLink
          to="/about"
          variants={brandItemVariants}
          whileHover={
            shouldReduceMotion
              ? undefined
              : { color: "#766b61", borderColor: "#29241f" }
          }
          whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="mt-8 inline-flex items-center gap-2 border-b border-[#8b8177] pb-2 text-xs font-medium uppercase tracking-[0.18em] text-[#29241f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#514a42] sm:mt-10 sm:text-sm"
        >
          Discover Our Story
          <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.5} />
        </MotionLink>
      </motion.div>
    </section>
  );
}

export default BrandIntroduction;
