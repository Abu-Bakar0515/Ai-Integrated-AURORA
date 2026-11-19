import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Menu,
  Search,
  ShoppingBag,
  UserRound,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

const MotionLink = motion.create(Link);

const navigationLinks = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeNavigationLink, setActiveNavigationLink] = useState(null);
  const shouldReduceMotion = useReducedMotion();

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#342d25]/10 bg-[#F5F1E9]">
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: -12 }}
        animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="mx-auto grid min-h-[6rem] w-full max-w-none grid-cols-[1fr_auto] items-center px-4 sm:px-6 md:min-h-[7rem] md:px-8 lg:px-8 xl:min-h-[8rem] xl:grid-cols-[1fr_auto_1fr]">
          <MotionLink
            to="/"
            onClick={closeMenu}
            className="justify-self-start font-serif text-[2rem] font-medium tracking-[0.18em] text-[#29241f] sm:text-[2.1rem] md:text-[2.35rem] lg:text-[2.5rem] xl:text-[2.75rem]"
            aria-label="ARORA home"
            whileHover={shouldReduceMotion ? undefined : { opacity: 0.78 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            AURORA
          </MotionLink>

          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-10 xl:flex xl:gap-16"
          >
            {navigationLinks.map(({ label, to }) => (
              <motion.div
                key={label}
                onMouseEnter={() => setActiveNavigationLink(label)}
                onMouseLeave={() => setActiveNavigationLink(null)}
                className="relative"
              >
                <MotionLink
                  to={to}
                  animate={{
                    color:
                      !shouldReduceMotion && activeNavigationLink === label
                        ? "#1f1b17"
                        : "#514a42",
                  }}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                  onFocus={() => setActiveNavigationLink(label)}
                  onBlur={() => setActiveNavigationLink(null)}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.2,
                    ease: "easeOut",
                  }}
                  className="block py-2 text-[1.3rem] font-medium uppercase tracking-[0.17em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#514a42] xl:text-[1.5rem]"
                >
                  {label}
                </MotionLink>
                <motion.span
                  animate={{
                    scaleX:
                      !shouldReduceMotion && activeNavigationLink === label
                        ? 1
                        : 0,
                  }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.25,
                    ease: "easeOut",
                  }}
                  className="absolute inset-x-0 bottom-0 h-px origin-left bg-current"
                />
              </motion.div>
            ))}
          </nav>

          <div className="flex items-center justify-self-end gap-4 text-[#342d25] sm:gap-5 lg:gap-7 xl:gap-8">
            <MotionLink
              to="/search"
              aria-label="Search"
              className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#514a42]"
              whileHover={shouldReduceMotion ? undefined : { scale: 1.08, opacity: 0.6 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <Search aria-hidden="true" size={36} strokeWidth={1.5} />
            </MotionLink>
            <MotionLink
              to="/cart"
              aria-label="Shopping bag"
              className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#514a42]"
              whileHover={shouldReduceMotion ? undefined : { scale: 1.08, opacity: 0.6 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <ShoppingBag aria-hidden="true" size={36} strokeWidth={1.5} />
            </MotionLink>
            <MotionLink
              to="/account"
              aria-label="Your account"
              className="hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#514a42] sm:block"
              whileHover={shouldReduceMotion ? undefined : { scale: 1.08, opacity: 0.6 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <UserRound aria-hidden="true" size={36} strokeWidth={1.5} />
            </MotionLink>
            <motion.button
              type="button"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
              className="xl:hidden"
              whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isMenuOpen ? (
                  <motion.span
                    key="close"
                    initial={shouldReduceMotion ? false : { opacity: 0, rotate: -45 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={shouldReduceMotion ? undefined : { opacity: 0, rotate: 45 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.18 }}
                    className="block"
                  >
                    <X aria-hidden="true" size={32} strokeWidth={1.5} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={shouldReduceMotion ? false : { opacity: 0, rotate: 45 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={shouldReduceMotion ? undefined : { opacity: 0, rotate: -45 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.18 }}
                    className="block"
                  >
                    <Menu aria-hidden="true" size={32} strokeWidth={1.5} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence initial={false}>
        {isMenuOpen && (
          <motion.nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            initial={shouldReduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={shouldReduceMotion ? undefined : { height: 0, opacity: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.25,
              ease: "easeOut",
            }}
            className="overflow-hidden border-t border-[#342d25]/10 px-5 py-5 xl:hidden"
          >
            <ul className="mx-auto flex w-full max-w-none flex-col gap-1">
              {navigationLinks.map(({ label, to }) => (
                <li key={label}>
                  <MotionLink
                    to={to}
                    onClick={closeMenu}
                    whileHover={
                      shouldReduceMotion
                        ? undefined
                        : { color: "#1f1b17", x: 2 }
                    }
                    whileFocus={shouldReduceMotion ? undefined : { color: "#1f1b17" }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="block py-3 text-lg font-medium uppercase tracking-[0.17em] text-[#514a42]"
                  >
                    {label}
                  </MotionLink>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
