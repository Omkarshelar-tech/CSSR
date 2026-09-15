import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Overview } from "./components/Overview";
import { Architecture } from "./components/Architecture";
import { Matrix } from "./components/Matrix";
import { Assets } from "./components/Assets";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <>
      <div className="bg-grid" aria-hidden />
      <Header />
      <main>
        <Hero />
        <Overview />
        <Architecture />
        <Matrix />
        <Assets />
      </main>
      <Footer />
    </>
  );
}
