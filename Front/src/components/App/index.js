//-- NPM IMPORT --//
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';

//-- COMPONENTS IMPORT --//
import Accueil from '../Accueil/Accueil';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SignIn from '../Sign-In/Sign-In'
import RGPD from '../RGPD/RGPD';
import Profil from '../Profil/Profil';
import NewAnnonce from '../NewAnnonce/NewAnnonce';
import BadDirection from '../404/404page';
import DirectChatPage from '../Chat/chat';
import UpdateProfil from '../Profil/UpdateProfil';

//-- HOOK --//

//-- STYLES IMPORT --//
import './App.scss';


// == Composant
function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/connexion" element={<SignIn />} />
        <Route exact path="/" element={<Accueil />} />
        <Route path="/rgpd" element={<RGPD />} />
        <Route path="*" element={<BadDirection />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/update-profil" element={<UpdateProfil />} />
        <Route path="/rediger-une-annonce" element={<NewAnnonce />} />
        <Route path="/chat" element={<DirectChatPage />} />
      </Routes>
      <Footer />
    </div>
  );
}


// == Export
export default App;

