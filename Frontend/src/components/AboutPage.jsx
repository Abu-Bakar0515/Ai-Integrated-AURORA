import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroFashionImage from "../assets/hero-fashion.jpg";
import Footer from "./Footer";
import Navbar from "./Navbar";

const storyValues = [
  {
    title: "Considered simplicity",
    description:
      "Clean lines and thoughtful details keep each piece easy to wear and easy to make your own.",
  },
  {
    title: "Everyday versatility",
    description:
      "Clothing, handbags, shoes, and accessories are curated to move naturally through your day.",
  },
  {
    title: "Timeless elegance",
    description:
      "A quiet, refined point of view puts lasting style ahead of passing trends.",
  },
];

function AboutPage() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      <Navbar />
      <main className="bg-[#F5F1E9]">
        <section
          aria-labelledby="about-heading"
          className="mx-auto grid w-full max-w-[1440px] items-center gap-10 px-4 py-12 sm:px-8 sm:py-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-10 lg:py-20"
        >
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.28em] text-[#766b61] sm:text-xs">
              ABOUT AURORA
            </p>
            <h1
              id="about-heading"
              className="mt-4 max-w-xl font-serif text-4xl leading-tight text-[#29241f] sm:text-5xl lg:text-6xl"
            >
              The art of timeless essentials.
            </h1>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-[#6c6259] sm:text-base">
              AURORA is a thoughtfully curated fashion edit for those who
              appreciate simplicity, quality, and timeless elegance.
            </p>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-[#6c6259] sm:text-base">
              From considered clothing to the finishing details, we bring
              together pieces designed to feel effortless and personal.
            </p>
            <Link
              to="/shop"
              className="mt-8 inline-flex items-center gap-2 border-b border-[#8b8177] pb-2 text-xs font-medium uppercase tracking-[0.16em] text-[#29241f] transition-colors hover:border-[#29241f] sm:mt-10"
            >
              Explore the collection
              <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.5} />
            </Link>
          </motion.div>

          <motion.figure
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="relative mx-auto w-full max-w-2xl overflow-hidden bg-[#e7e0d4]"
          >
            <img
              src={heroFashionImage}
              alt="AURORA's neutral-toned fashion collection"
              className="aspect-[4/5] w-full object-cover"
            />
            <figcaption className="absolute bottom-4 left-4 bg-[#F5F1E9]/95 px-4 py-3 text-[0.6rem] font-medium uppercase tracking-[0.18em] text-[#514a42] sm:bottom-6 sm:left-6">
              The AURORA edit
            </figcaption>
          </motion.figure>
        </section>

        <section
          aria-labelledby="point-of-view-heading"
          className="border-y border-[#342d25]/10 bg-white px-4 py-14 sm:px-8 sm:py-18 lg:py-20"
        >
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mx-auto grid w-full max-w-[1120px] gap-5 md:grid-cols-[0.7fr_1.3fr] md:gap-12"
          >
            <p className="pt-2 text-[0.65rem] font-medium uppercase tracking-[0.24em] text-[#766b61]">
              OUR POINT OF VIEW
            </p>
            <div>
              <h2
                id="point-of-view-heading"
                className="font-serif text-3xl leading-tight text-[#29241f] sm:text-4xl"
              >
                A wardrobe shaped by what lasts.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[#6c6259] sm:text-base">
                We believe personal style is built over time. Our edit brings
                together versatile essentials and expressive finishing touches
                so you can create a wardrobe that feels distinctly yours.
              </p>
            </div>
          </motion.div>
        </section>

        <section
          aria-labelledby="values-heading"
          className="px-4 py-14 sm:px-8 sm:py-18 lg:px-10 lg:py-20"
        >
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mx-auto w-full max-w-[1280px]"
          >
            <header className="mb-8 text-center sm:mb-10">
              <p className="text-[0.65rem] font-medium uppercase tracking-[0.24em] text-[#766b61]">
                WHAT GUIDES US
              </p>
              <h2
                id="values-heading"
                className="mt-3 font-serif text-3xl text-[#29241f] sm:text-4xl"
              >
                A more considered edit.
              </h2>
            </header>

            <div className="grid gap-px bg-[#342d25]/10 md:grid-cols-3">
              {storyValues.map(({ title, description }, index) => (
                <article
                  key={title}
                  className="bg-[#F5F1E9] px-6 py-7 text-center sm:px-8 sm:py-9"
                >
                  <p className="text-[0.6rem] font-medium uppercase tracking-[0.18em] text-[#8b8177]">
                    0{index + 1}
                  </p>
                  <h3 className="mt-3 font-serif text-xl text-[#29241f]">
                    {title}
                  </h3>
                  <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-[#6c6259]">
                    {description}
                  </p>
                </article>
              ))}
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default AboutPage;
