import { Navbar, Nav, Container, NavItem, Button, Modal, NavLink } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import SignUp from './Sign-Up-A/Sign-Up-A';
import { useNavigate } from 'react-router-dom';
import './Header.scss'


const Header = () => {

  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isLogged, setIsLogged] = useState(null);
  const [isItAssociation, setIsItAssociation] = useState(null);



  useEffect(() => {
    const isUserLogged = localStorage.logged;
    setIsLogged(isUserLogged);
  });

  useEffect(() => {
    const isItAssociation = localStorage.isAssociation;
    setIsItAssociation(isItAssociation);
  });


  function logout() {
    window.localStorage.clear();
    navigate('/');
    window.location.reload(false);
  }

  function navigateLogin() {
    navigate('/connexion');
  }

  return (
    <>
      <Container>
        <Navbar collapsedOnSelect expand="lg" className='navbar'>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className='container-fluid'>
              <NavItem>
                <Nav.Link className='navItem' href="/">Accueil</Nav.Link>
              </NavItem>
              {isLogged === "true" ? <>
                <NavItem>
                  <Nav.Link className='navItem' href="/profil">Profil</Nav.Link>
                </NavItem>
                <NavItem>
                  <Nav.Link className='navItem' href="/chat">Conversations</Nav.Link>
                </NavItem>
              </>
                :
                <>
                </>}
              {isItAssociation === "true" ? <>
                <NavItem>
                  <Nav.Link className='navItem' href="/rediger-une-annonce">Rédiger une annonce</Nav.Link>
                </NavItem>
              </> :
                <></>}
            </Nav>

            <Nav className='justify-content-end'>

              {isLogged ? <>
                <NavItem>
                  <Button className='sign-up shadow-none' onClick={logout}>Se déconnecter</Button>
                </NavItem>
              </>
                :
                <>
                  <NavItem>
                    <Button className='sign-up shadow-none' onClick={handleShow}>S'inscrire</Button>
                  </NavItem>
                  <NavItem>
                    <Button className='sign-up shadow-none' onClick={navigateLogin}>Connexion</Button>
                  </NavItem>
                </>}
              {/* <Nav.Link href="/signup">Inscription/Se connecter</Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
      <div>
        <Modal size="lg" show={show} onHide={handleClose} className="sign-up-modal d-flex align-items-center">
          <Modal.Header closeButton><h2>S'inscrire</h2>
          </Modal.Header>
          <Modal.Footer><SignUp /></Modal.Footer>
        </Modal>
      </div>
    </>);
};

export default Header;
