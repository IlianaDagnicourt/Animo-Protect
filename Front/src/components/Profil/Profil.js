import { CardImg, Card, ListGroup, ListGroupItem, Row, Col, Button } from 'react-bootstrap';
import { useState, useEffect } from "react";
import CardHeader from 'react-bootstrap/esm/CardHeader';
import instance from '../../services/axios';
import pin from '../../assets/Img/catpin.svg';
import dm from '../../assets/Img/catdm.svg';
import mail from '../../assets/Img/catmail.svg';
import catphone from '../../assets/Img/catphone.svg';
import update from '../../assets/Img/34.svg';
import trash from '../../assets/Img/35.svg';
import { useNavigate } from 'react-router-dom';
import './profil.scss';

function Profil() {

  const [currentUser, setCurrentUser] = useState([]);
  const [imageSelected, setImageSelected] = useState("")
  const [posts, setPosts] = useState([]);

  let navigate = useNavigate();

  function UpdateProfil() {
    navigate('/update-profil');
  }

  useEffect(() => {
    getDataUser()
  }, []);


  //! On récupère l'objet user du localStorage
  const user = JSON.parse(window.localStorage.getItem('user'));

  //! On vérifie si le user est une association ou un bénévole pour récupérer les données dans la table correspondante
  let getDataUser = () => {
    let path = '';
    if (user.role === 'benevole') {
      path = 'benevoles';
    } else if (user.role === 'association') {
      path = 'associations';
    }
    instance
      .get(path + '/' + user.id)
      .then((response) => {
        console.log(response.data);
        const userData = response.data;
        setCurrentUser(userData);
      })
      .catch((error) => {
        console.log(error, 'not okay')
      })
  }

  const { name, description, adress, email, city, zip_code, first_name, last_name, phone, username, picture } = currentUser;

  return (
    <Row>
      <div as={Col} md="auto" className="mt-5 d-flex justify-content-center profil-container">
        <Card className="card-profil">
          <CardHeader className="d-flex justify-content-center card-profil-header">
            <Card.Title className="profil-header pt-3">{name} {first_name} {last_name}</Card.Title>
          </CardHeader>
          <Card.Body>
            <div className='d-flex justify-content-center'>
              <CardImg variant="top" src={picture} classname='main-img' />
            </div>
            <div className='d-flex justify-content-end'>
              <img
                className='icon'
                src={update}
                onClick={UpdateProfil}
                style={{ cursor: 'pointer' }}
              />
              <img
                className='icon'
                src={trash}
              />
            </div>
            <div className='d-flex justify-content-between mt-3'>
              <Card.Text>{description}</Card.Text>
            </div>
            <div className='mb-0 list-container'>
              <ListGroup className="list-group-flush list-profil list-item">
                <ListGroupItem className="list-item d-inline-flex justify-content-between align-items-baseline">
                  <img
                    className='align-items-baseline cat-icon'
                    src={dm}
                    width={100}
                    height={80}
                  />
                  <p className='profil-p'>{username}</p>
                </ListGroupItem>
                <ListGroupItem className="list-item d-inline-flex justify-content-between align-items-baseline">
                  <img
                    className='align-items-baseline cat-icon'
                    src={pin}
                    width={100}
                    height={80}
                  />
                  <p className='profil-p'>{adress},  {zip_code}, {city}</p>
                </ListGroupItem>
                <ListGroupItem className="list-item d-inline-flex justify-content-between align-items-baseline">
                  <img
                    className='align-items-baseline cat-icon'
                    src={mail}
                    width={100}
                    height={80}
                  />
                  <p className='profil-p'>{email}</p>
                </ListGroupItem>
                <ListGroupItem className="list-item d-inline-flex justify-content-between align-items-baseline">
                  <img
                    className='align-items-baseline cat-icon'
                    src={catphone}
                    width={100}
                    height={80}
                  />
                  <p className='profil-p'>{phone}</p>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Card.Body>
        </Card>
      </div>
    </Row>
  )
};

export default Profil;
