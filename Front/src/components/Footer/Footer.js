import Logo from '../../assets/Img/Benchmark.svg'
import { Navbar, Nav, Container, NavItem } from 'react-bootstrap';
import './footer.scss';

function Footer() {
  return (
    <>
      <Navbar fixed="bottom" className='navbar mt-5' >
        <Container>
          <Navbar.Brand href="/">
            <img
              src={Logo}
              width="40"
              height="40"
              className="d-inline-block"
            />
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <NavItem>
              <Nav.Link className='navItem' href="/rgpd">RGPD/Nous contacter</Nav.Link>
            </NavItem>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Footer;
