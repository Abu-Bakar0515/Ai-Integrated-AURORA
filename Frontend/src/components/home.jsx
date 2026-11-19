import Navbar from "./Navbar"
import Hero from "./Hero"
import ExploreCategories from "./ExploreCategories"
import NewArrivals from "./NewArrivals"
import BrandIntroduction from "./BrandIntroduction"
import Footer from "./Footer"

function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ExploreCategories />
        <NewArrivals />
        <BrandIntroduction />
      </main>
      <Footer />
    </>
  );
}

export default Home