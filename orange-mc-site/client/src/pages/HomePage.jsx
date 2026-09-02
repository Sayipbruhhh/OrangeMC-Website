import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Servers from "../components/Servers";
import Features from "../components/Features";
import Arena from "../components/Arena";
import Economy from "../components/Economy";
import Events from "../components/Events";
import Community from "../components/Community";
import FounderSection from "../components/FounderSection";
import StaffSection from "../components/StaffSection";
import Rules from "../components/Rules";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import { useContent } from "../context/ContentContext";

export default function HomePage() {
  const { error } = useContent();

  return (
    <>
      <Navbar />
      <main style={{ position: "relative", zIndex: 1 }}>
        {error && (
          <div className="container" style={{ paddingTop: 140 }}>
            <p style={{ color: "#ff8f87" }}>
              Couldn't reach the Orange MC API ({error}). Make sure the backend server is running.
            </p>
          </div>
        )}
        <Hero />
        <Servers />
        <Features />
        <Arena />
        <Economy />
        <Events />
        <Community />
        <FounderSection />
        <StaffSection />
        <Rules />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
