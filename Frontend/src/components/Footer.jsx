import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";

const MotionLink = motion.create(Link);

const footerContentVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14 },
  },
};

const footerItemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const exploreLinks = [
  { label: "Shop all", to: "/shop" },
  { label: "New arrivals", to: "/shop?category=new-arrivals" },
  { label: "Clothing", to: "/shop?category=clothing" },
  { label: "Handbags", to: "/shop?category=handbags" },
];

const informationLinks = [
  { label: "Our story", to: "/about" },
  { label: "Contact", to: "/contact" },
];

function Footer() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <footer className="bg-[#29241f] text-[#F5F1E9]">
      <div className="w-full px-4 py-16 sm:px-6 sm:py-20 md:px-8">
        <motion.div
          className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-16"
          variants={footerContentVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "visible"}
          viewport={{ once: true }}
        >
          <motion.div variants={footerItemVariants}>
            <MotionLink
              to="/"
              aria-label="AURORA home"
              whileHover={shouldReduceMotion ? undefined : { opacity: 0.75 }}
              className="font-serif text-4xl tracking-[0.16em]"
            >
              AURORA
            </MotionLink>
            <p className="mt-5 max-w-sm text-2xl leading-relaxed text-[#d0c8bd]">
              Thoughtfully curated fashion for everyday elegance.
            </p>
          </motion.div>

          <motion.nav aria-label="Explore" variants={footerItemVariants}>
            <h2 className="text-2xl font-medium uppercase tracking-[0.2em] text-[#d0c8bd]">
              Explore
            </h2>
            <ul className="mt-5 space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <MotionLink
                    to={link.to}
                    whileHover={
                      shouldReduceMotion ? undefined : { color: "#ffffff" }
                    }
                    className="text-2xl"
                  >
                    {link.label}
                  </MotionLink>
                </li>
              ))}
            </ul>
          </motion.nav>

          <motion.nav aria-label="Information" variants={footerItemVariants}>
            <h2 className="text-2xl font-medium uppercase tracking-[0.2em] text-[#d0c8bd]">
              Information
            </h2>
            <ul className="mt-5 space-y-3">
              {informationLinks.map((link) => (
                <li key={link.label}>
                  <MotionLink
                    to={link.to}
                    whileHover={
                      shouldReduceMotion ? undefined : { color: "#ffffff" }
                    }
                    className="text-2xl"
                  >
                    {link.label}
                  </MotionLink>
                </li>
              ))}
            </ul>
          </motion.nav>
        </motion.div>

        <motion.div
          className="mt-14 flex flex-col gap-3 border-t border-white/15 pt-6 text-2xl text-[#d0c8bd] sm:flex-row sm:items-center sm:justify-between"
          variants={footerItemVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "visible"}
          viewport={{ once: true }}
        >
          <p>© {new Date().getFullYear()} AURORA. All rights reserved.</p>
          <p>Designed for timeless living.</p>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;
