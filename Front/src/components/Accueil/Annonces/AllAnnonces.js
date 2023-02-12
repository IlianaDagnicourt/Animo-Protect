import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Annonce from './Annonce';
import { useEffect, useState } from 'react';
import instance from '../../../services/axios';
import { InputGroup, Button, FormControl, Container } from 'react-bootstrap';
import './AllAnnonce.scss';


function AllAnnonces() {

  const [annonces, setAnnonces] = useState([]);

  useEffect(() => {
    getDataAllAnnonce();
  }, []);


  const getDataAllAnnonce = () => {
    instance
      .get('/annonces')
      .then((response) => {
        setAnnonces(response.data.allAnnonce);
        console.log(response.data.allAnnonce);
      })
      .catch((error) => {
        console.log(error, 'not okay annonces')
      })
  }

  var sorted_annonces = annonces.sort((a, b) => {
    return new Date(a.created_at).getTime() -
      new Date(b.created_at).getTime()
  });

  return (

    <>
      <div className="mt-3 d-flex align-items-center flex-column">
        <div className="container-filter-bar">
          <div className="justify-content-center align-items-center"></div>
          <InputGroup className="col-6 search-bar">
            <FormControl
              type="text"
              placeholder={"Rechercher annonce"} />
            <Button className="button-light-gold shadow-none" id="button-addon2">
              Search
            </Button>
          </InputGroup>
        </div>
      </div>
      <div>
        <Container fluid>
          <Row className="mb-5 d-flex justify-content-around">
            {sorted_annonces.map((annonce) => (
              <Col md={12} lg={6} className="mb-1 all-annonce-card">
                <Annonce
                  key={annonce.id}
                  {...annonce} />
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </>
  );
}

export default AllAnnonces;
