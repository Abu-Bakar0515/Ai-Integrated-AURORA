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
    <section className="relative isolate flex h-[calc(100vh-6rem-90px-2rem-1px)] w-full items-end overflow-hidden bg-[#5b5048] md:h-[calc(100vh-7rem-90px-2rem-1px)] xl:h-[calc(100vh-8rem-90px-2rem-1px)]">
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

      <div className="relative z-10 w-full px-6 pb-12 text-white sm:px-10 sm:pb-16 md:px-12 md:pb-20 lg:px-20 lg:pb-24 xl:px-24">
        <motion.div
          className="max-w-4xl"
          variants={heroContentVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          animate={shouldReduceMotion ? undefined : "visible"}
        >
          <motion.p
            variants={heroItemVariants}
            className="text-2xl font-medium uppercase tracking-[0.24em] sm:text-xl"
          >
            New Collection
          </motion.p>
          <motion.h1
            variants={heroItemVariants}
            className="mt-5 font-serif text-[3.5rem] leading-[1.02] sm:text-[4.25rem] md:text-[5.5rem] lg:text-[7.5rem] xl:text-[9rem]"
          >
            STYLE THAT SPEAKS
          </motion.h1>
          <motion.p
            variants={heroItemVariants}
            className="mt-6 max-w-xl text-2xl leading-relaxed text-white/90 sm:text-2xl md:text-[1.875rem]"
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
                    y: -3,
                    backgroundColor: "#F5F1E9",
                    boxShadow:
                      "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
                  }
            }
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="mt-9 inline-flex min-h-20 items-center justify-center bg-white px-20 py-7 text-3xl font-medium uppercase tracking-[0.18em] text-[#29241f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:mt-11 sm:px-16"
          >
            Shop Now
          </MotionLink>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
