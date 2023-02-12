import { Row, Col, Badge, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import instance from '../../../services/axios';
import { useNavigate } from 'react-router-dom';

function DetailsAnnonce(annonceID) {


  let creationdate = new Date(annonceID.created_at);
  creationdate = creationdate.toLocaleDateString();

  let date = new Date(annonceID.date)
  date = date.toLocaleDateString()

  const id = annonceID.id

  const navigate = useNavigate();

  function navigateChat() {
    navigate('/chat');
  }
  const [annonceDetails, setAnnonceDetails] = useState([]);
  const { description, quotas, city, status, title, username, tasks } = annonceDetails;


  useEffect(() => {
    getDetailsAnnonce(id);
  }, []);

  let getDetailsAnnonce = (id) =>
    instance
      .get('/annonces/' + id)
      .then((response) => {
        const detailsAnnonce = response.data;
        setAnnonceDetails(detailsAnnonce)
      })
      .catch((error) => {
        console.log(error, 'not okay details')
      })

  return (
    <div>
      <Row>
        <div as={Col} md="12" className=" mt-3 d-flex justify-content-between">
          <h1>{title}</h1>
          <h1>
            {status === 'Urgent' ? <>
              <Badge md={2} className="card-label badge-annonce bg-success">En cours</Badge>
            </>
              :
              <>
                <Badge md={2} className="card-label badge-annonce bg-danger">Urgent</Badge>
              </>
            }
          </h1>
        </div>
        <div as={Col} md="12" className='mt-2'>
          <p className='text-muted'>Date de l'évènement: {date}</p>
        </div>
        <div as={Col} md="12" className='mt-1 d-flex justify-content-between'>
          <p className='text-muted'>Nombre de bénévoles recherchés: {quotas}</p>
          <p className='text-muted'>Lieu de l'évènement: {city}</p>
        </div>
      </Row>
      <Row>
        <div as={Col} md="12" className='d-flex mt-5 justify-content-center'>
          <p>{description}</p>
        </div>
      </Row>
      <Row>
        <footer as={Col} md="12" className='d-flex mt-5 justify-content-center'>
          <p>Annonce postée le {creationdate} par {username}</p>
        </footer>
      </Row>
      <Row>
        <div as={Col} md="6" className='d-flex justify-content-center mt-3'>
          <Button className="button-light-gold shadow-none" onClick={navigateChat}>Contacter {username}</Button>{' '}
        </div>
      </Row>
    </div>
  );
}

export default DetailsAnnonce;
