import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Projects from './sections/Projects'
import Contact from './sections/Contact'
import Admin from './pages/Admin'
import './App.css'
import Footer from './components/Footer'
function App() {
  const isAdmin = window.location.pathname === "/admin";

  if (isAdmin) {
    return <Admin />;
  }

  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Contact />
      <Footer />
    </>
  )
}

export default App