import Banner from "./components/Banner";
import Header from "./components/Header";
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
          <div className="container">
            <Work />
          </div>
      </main>
    </>    
  );
}

export default App;
