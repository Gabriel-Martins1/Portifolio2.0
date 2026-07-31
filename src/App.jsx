import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NoiseLayer from "./components/NoiseLayer";
import SmoothScroll from "./components/SmoothScroll";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Timeline from "./sections/Timeline";
import Contact from "./sections/Contact";
import Admin from "./pages/Admin";

function App() {
  const ehAdmin = window.location.pathname === "/admin";

  if (ehAdmin) {
    return (
      <>
        <NoiseLayer />
        <Admin />
      </>
    );
  }

  return (
    <SmoothScroll>
      <NoiseLayer />

      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[110] focus:rounded-full focus:bg-flame focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-ink"
      >
        Pular para o conteúdo
      </a>

      <Navbar />

      <main id="conteudo">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Timeline />
        <Contact />
      </main>

      <Footer />
    </SmoothScroll>
  );
}

export default App;
