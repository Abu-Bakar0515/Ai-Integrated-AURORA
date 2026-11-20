import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import heroImage from "../assets/hero-fashion.jpg";

const MotionLink = motion.create(Link);

const heroContentVariants = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.18, staggerChildren: 0.14 },
  },
};

const heroItemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative isolate flex h-[min(72vh,640px)] min-h-[420px] w-full items-end overflow-hidden bg-[#5b5048] sm:min-h-[480px] lg:h-[min(78vh,720px)]">
      <motion.img
        src={heroImage}
        alt="Woman wearing a beige coat"
        className="absolute inset-0 h-full w-full object-cover object-[75%_15%] md:object-[65%_15%]"
        initial={shouldReduceMotion ? false : { opacity: 0, scale: 1.04 }}
        animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-[#211d19]/75 via-[#211d19]/35 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 pb-8 text-white sm:px-8 sm:pb-12 lg:px-10 lg:pb-14">
        <motion.div
          className="max-w-2xl"
          variants={heroContentVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          animate={shouldReduceMotion ? undefined : "visible"}
        >
          <motion.p
            variants={heroItemVariants}
            className="text-[0.7rem] font-medium uppercase tracking-[0.28em] sm:text-xs"
          >
            New Collection
          </motion.p>
          <motion.h1
            variants={heroItemVariants}
            className="mt-3 font-serif text-[2.35rem] leading-[0.95] sm:text-5xl md:text-6xl lg:text-7xl"
          >
            STYLE THAT SPEAKS
          </motion.h1>
          <motion.p
            variants={heroItemVariants}
            className="mt-4 max-w-md text-sm leading-relaxed text-white/90 sm:text-base"
          >
            Discover timeless pieces designed for everyday elegance.
          </motion.p>
          <MotionLink
            to="/shop"
            variants={heroItemVariants}
            whileHover={
              shouldReduceMotion
                ? undefined
                : {
                    scale: 1.05,
                    y: -3,
                    backgroundColor: "#F5F1E9",
                    boxShadow:
                      "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
                  }
            }
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="mt-6 inline-flex items-center justify-center bg-white px-7 py-3 text-xs font-medium uppercase tracking-[0.18em] text-[#29241f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:mt-8 sm:px-8"
          >
            Shop Now
          </MotionLink>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
