import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import { Col, Modal } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import DetailsAnnonce from './DetailsAnnonce';


const Annonce = ({ city, date, description, status_id, title, created_at, association_id, id }) => {
  console.log(id);
  let label;

  if (status_id === 1) {
    label = 'En cours';
  } else if (status_id === 2) {
    label = 'Urgent';
  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="d-flex justify-content-center">
      <Card as={Col} md="12" className="mt-5 mb-3 ml-3 mr-3 card-container">
        <Card.Body>
          <Card.Header className="d-flex justify-content-between align-items-baseline card-header">
            <Card.Title>{title}</Card.Title>
          {status_id === 1 ?  <>
            <Badge md={2} className="card-label badge-annonce bg-success">{label}</Badge>
            </> 
            :
            <>
            <Badge md={2} className="card-label badge-annonce bg-danger">{label}</Badge>
            </>
          }
          </Card.Header>
          <Card.Text className="mt-3 ml-5 mr-5 d-flex justify-content-center">
            {description}
          </Card.Text>
          <Card.Text className="mt-2 card-task d-flex justify-content-center">
            {city}
          </Card.Text>

          {/* Bouton ouvrir la modale Détails */}
          <div className="d-flex justify-content-center">
            <Button className="button-light-gold shadow-none" onClick={handleShow}>Plus de détails</Button>{' '}
          </div>
          {/* Modale détails */}
          <Modal size="lg" show={show} onHide={handleClose}>
            <Modal.Header closeButton className="annonce-button shadow-none"><h1>Détails de l'annonce</h1>
            </Modal.Header>
            <Modal.Body>
              <DetailsAnnonce
                id={id}
                date={date}
                created_at={created_at}
              />
            </Modal.Body>
          </Modal>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Annonce;
