import { Form, Row, Col, Button, FormGroup, FormText, FormControl, FormLabel, FormCheck, Container } from "react-bootstrap";
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import React, { useState } from 'react';
import RangeSlider from 'react-bootstrap-range-slider';
import { useNavigate } from 'react-router-dom';
import instance from '../../services/axios';
import './newAnnonce.scss';



//title description quota association_id (a voir avec jwt token) statut_id date city
const NewAnnonce = () => {


  const navigate = useNavigate();

  const association = JSON.parse(localStorage.getItem('user'));
  console.log(association);

  // const token = JSON.parse(localStorage.getItem('user'));
  // console.log(token.token);

  //Je mets en place mes champs controllés


  const [benevoleValue, setBenevoleValue] = useState(0);
  const [nameNewAnnonce, setNameNewAnnonce] = useState('');
  const [localisationNewAnnonce, setLocalisationNewAnnonce] = useState('');
  const [titleNewAnnonce, setTitleNewAnnonce] = useState('');
  const [descriptionNewAnnonce, setDescriptionNewAnnonce] = useState('');
  const [dateNewAnnonce, setDateNewAnnonce] = useState('');


  const [checkNewAnnonce, setCheckNewAnnonce] = useState(0);


  //Je fais mon appel API

  const handleSubmit = (e) => {
    e.preventDefault();
    instance
      .post('https://animo-protect.herokuapp.com/api/annonces/',
        {
          association_id: association.id,
          title: titleNewAnnonce,
          description: descriptionNewAnnonce,
          city: localisationNewAnnonce,
          quotas: benevoleValue,
          status_id: checkNewAnnonce,
          date: dateNewAnnonce
        },
        {
          headers: {
            'Authorization': `Basic ${association.token}`
          }
        }).then((resp) => {
          console.log(resp + 'annonce envoyé')
          navigate("/")
        }).catch((error) => {
          console.log(error + 'Pas bon')
        })
    console.log(`Form submitted`);

  }

  const handleChangeLocalisationNewAnnonce = (value) => {
    setLocalisationNewAnnonce(value);
  }

  const handleChangeTitleNewAnnonce = (value) => {
    setTitleNewAnnonce(value);
  }

  const handleChangeDescriptionNewAnnonce = (value) => {
    setDescriptionNewAnnonce(value);
  }

  const handleChangeDateNewAnnonce = (value) => {
    setDateNewAnnonce(value);
  }

  const handleChangeCheckNewAnnonce = (value) => {
    setCheckNewAnnonce(value);
    console.log(typeof (value));
  }

  return (
    <div>
      <Row>
        <header as={Col} className="mt-3 d-flex align-items-center flex-column">
          <h1 className="title-new-annonce">Poster votre annonce</h1>
        </header>
      </Row>
      <Container fluid className="new-annonce">
        <Form onSubmit={handleSubmit}>
          <Row>
            <FormGroup as={Col} className="mt-3">
              <Form.Label>Localisation</Form.Label>
              <Form.Control
                value={localisationNewAnnonce}
                onChange={(e) => {
                  handleChangeLocalisationNewAnnonce(e.target.value)
                }}
                type="text"
                placeholder="Ville"
                required
              />
            </FormGroup>

            <FormGroup as={Col} className="mt-1">
              <FormLabel>Nombre de bénévole</FormLabel>
              <RangeSlider
                value={benevoleValue}
                min={1}
                max={10}
                onChange={changeEvent => setBenevoleValue(changeEvent.target.value)}
              />
            </FormGroup>
          </Row>

          <Row>
            <FormGroup as={Col} className="md-6 mt-3">
              <Form.Label>Titre</Form.Label>
              <Form.Control
                value={titleNewAnnonce}
                onChange={(e) => {
                  handleChangeTitleNewAnnonce(e.target.value)
                }}
                type="text"
                placeholder="Titre"
                required
              />
            </FormGroup>

            <FormGroup as={Col} className="md-6 mt-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                value={dateNewAnnonce}
                onChange={(e) => {
                  handleChangeDateNewAnnonce(e.target.value)
                }}
                type="date"
                required
              />
            </FormGroup>
          </Row>

          <Row>
            <FormGroup as={Col} className="md-12 mt-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                onChange={(e) => {
                  handleChangeDescriptionNewAnnonce(e.target.value)
                }}
                value={descriptionNewAnnonce}
                type="textarea"
                as="textarea"
                rows={5}
                placeholder="Description"
                required />
            </FormGroup>
          </Row>
          <Row>

            <div className="d-flex justify-content-around">
              <FormCheck
                className="mt-3"
                value={1}
                label="Urgent"
                onChange={(e) => {
                  handleChangeCheckNewAnnonce(e.target.value)
                }}
              />
              <FormCheck
                className="mt-3"
                value={2}
                label="Non urgent"
                onChange={(e) => {
                  handleChangeCheckNewAnnonce(e.target.value)
                }}
              />
            </div>
          </Row>

          <Row>

            <Button type="submit" className="mt-5 w-25 button-light-gold shadow-none">
              Poster
            </Button>
          </Row>
        </Form>
      </Container>
    </div>
  )
};

export default NewAnnonce;
