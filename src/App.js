import Banner from "./components/Banner";
import Contact from "./components/Contact";
import Header from "./components/Header";
import Skills from "./components/Skills";
import TimeLine from "./components/TimeLine";
import Work from "./components/Work"
import { Helmet } from 'react-helmet';

function App() {
  return (
    <>
      <Helmet>
        <title>Sebastien Guilet - Développer Front-End</title>
        <meta name="description" content="Création de site, développement de aplication web" />
      </Helmet>
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
