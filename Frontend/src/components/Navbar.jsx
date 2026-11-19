import { useState } from "react";
import {
  Menu,
  Search,
  ShoppingBag,
  UserRound,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

const navigationLinks = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#342d25]/10 bg-[#F5F1E9]">
      <div className="mx-auto grid min-h-20 max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center px-5 sm:px-8 lg:px-14">
        <Link
          to="/"
          onClick={closeMenu}
          className="justify-self-start font-serif text-[1.65rem] font-medium tracking-[0.18em] text-[#29241f] sm:text-[1.8rem]"
          aria-label="ARORA home"
        >
          ARORA
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-9 md:flex lg:gap-12"
        >
          {navigationLinks.map(({ label, to }) => (
            <Link
              key={label}
              to={to}
              className="group relative py-2 text-[0.7rem] font-medium uppercase tracking-[0.17em] text-[#514a42] transition-colors duration-300 hover:text-[#1f1b17] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#514a42]"
            >
              {label}
              <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-self-end gap-4 text-[#342d25] sm:gap-5">
          <Link
            to="/search"
            aria-label="Search"
            className="transition-opacity duration-200 hover:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#514a42]"
          >
            <Search aria-hidden="true" size={19} strokeWidth={1.5} />
          </Link>
          <Link
            to="/cart"
            aria-label="Shopping bag"
            className="transition-opacity duration-200 hover:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#514a42]"
          >
            <ShoppingBag aria-hidden="true" size={19} strokeWidth={1.5} />
          </Link>
          <Link
            to="/account"
            aria-label="Your account"
            className="hidden transition-opacity duration-200 hover:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#514a42] sm:block"
          >
            <UserRound aria-hidden="true" size={19} strokeWidth={1.5} />
          </Link>
          <button
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
            className="md:hidden"
          >
            {isMenuOpen ? (
              <X aria-hidden="true" size={21} strokeWidth={1.5} />
            ) : (
              <Menu aria-hidden="true" size={21} strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="border-t border-[#342d25]/10 px-5 py-5 md:hidden"
        >
          <ul className="mx-auto flex max-w-[1440px] flex-col gap-1">
            {navigationLinks.map(({ label, to }) => (
              <li key={label}>
                <Link
                  to={to}
                  onClick={closeMenu}
                  className="block py-3 text-xs font-medium uppercase tracking-[0.17em] text-[#514a42] transition-colors duration-200 hover:text-[#1f1b17]"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Navbar;
