import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import BestSeller from "../components/BestSeller";
import OurPolicy from "../components/OurPolicy";


const Home = () => {
  return (
    <div className="space-y-6">
      <Hero />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
    </div>
  );
};

export default Home;
