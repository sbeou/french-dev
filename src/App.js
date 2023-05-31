import Banner from "./components/Banner";
import Contact from "./components/Contact";
import Header from "./components/Header";
import Skills from "./components/Skills";
import TimeLine from "./components/TimeLine";
import Work from "./components/Work"

function App() {
  return (
    <>
      <Header />
      <main>
          <Banner />
          <Work />
          <Skills />
          <TimeLine />
          <Contact />
      </main>
    </>    
  );
}

export default App;
