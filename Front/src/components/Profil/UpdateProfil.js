import { CardImg, Card, ListGroup, ListGroupItem, Row, Col, Button, FormGroup } from 'react-bootstrap';
import { useState, useEffect } from "react";
import axios from 'axios';
import { Form } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import CardHeader from 'react-bootstrap/esm/CardHeader';
import instance from '../../services/axios';
import pin from '../../assets/Img/catpin.svg';
import dm from '../../assets/Img/catdm.svg';
import mail from '../../assets/Img/catmail.svg';
import catphone from '../../assets/Img/catphone.svg';
import pug from '../../assets/Img/pug.svg';
import cathigh from '../../assets/Img/cathhighpaw.svg';
import './profil.scss';

function UpdateProfil() {

  const [imageSelected, setImageSelected] = useState("");
  const [responseCloudinary, setResponseCloudinary] = useState("");
  const [isItAssociation, setIsItAssociation] = useState(null);


  // useEffect(() => {
  //   getDataUser()
  // }, []);

  useEffect(() => {
    const isItAssociation = localStorage.isAssociation;
    setIsItAssociation(isItAssociation);
    console.log(isItAssociation);
  });


  // On récupère l'objet user du localStorage
  const user = JSON.parse(window.localStorage.getItem('user'));

  const { handleSubmit, register, formState: { errors } } = useForm();

  // ! On vérifie si le user est une association ou un bénévole pour récupérer les données dans la table correspondante

  // let getDataUser = () => {
  //   let path = '';
  //   let currentuser = '';
  //   if (user.role === 'benevole') {
  //     path = 'benevoles';
  //     currentuser = 'benevoles';
  //   } else if (user.role === 'association') {
  //     path = 'associations';
  //     currentuser = 'associations';
  //   }
  //   instance
  //     .patch(path + '/' + user.id,
  //       {
  //         headers: {
  //           'Authorization': `Basic ${currentuser.token}`
  //         }
  //       }).then((response) => {
  //         console.log(response.data);
  //       })
  //     .catch((error) => {
  //       console.log(error, 'not okay')
  //     })
  // }

  // const handleSubmit = (data, e) => {
  //   e.preventDefault();
  // }

  const patchProfileData = (data, e) => {
    e.preventDefault();
    if (isItAssociation === false) {
      console.log('on est bien là');
      instance
        .patch('benevoles' + '/' + user.id, data,
          {
            headers: {
              'Authorization': `Basic ${benevoles.token}`
            }
          }).then((response) => {
            console.log(response);
          })
        .catch((error) => {
          console.log(error, 'not okay')
        })
    } else if (isItAssociation === true) {
      instance
        .patch('associations' + '/' + user.id,
          {
            headers: {
              'Authorization': `Basic ${associations.token}`
            }
          }).then((response) => {
            console.log('envoyé');
          })
        .catch((error) => {
          console.log(error, 'not okay')
        })
    }
  }

  const UploadImageToCloudinary = (e) => {
    e.preventDefault();
    const FormRequest = new FormData();
    FormRequest.append("file", imageSelected)
    FormRequest.append("upload_preset", "Aosci947792");
    axios
      .post(
        "https://api.cloudinary.com/v1_1/anim-o-protect/image/upload", FormRequest
      ).then((response) => {
        console.log(response);
        setResponseCloudinary(response.data.url);
      })
  };

  return (
    <div className=" mt-5 d-flex justify-content-center profil-container">
      <Card className="card-profil" style={{ width: '70vh' }}>
        <Form onSubmit={handleSubmit(patchProfileData)}>
          <CardHeader className="d-flex justify-content-center card-profil-header">
            <Card.Title className="profil-header pt-3 update-title">
              {/* On modifie l'affichage selon le rôle de l'utilisateur */}
              {isItAssociation === "true" ?
                <>
                  <FormGroup>
                    <Form.Control
                      {...register('name', { required: false })}
                      type="text"
                      placeholder="Entrez le nom de l'organisation"
                    />
                  </FormGroup>
                </>
                :
                <>
                  <FormGroup className='name-update'>
                    <Form.Control
                      {...register('last_name', { required: false })}
                      type="text"
                      placeholder="Entrez votre nom"
                    />
                  </FormGroup>
                  <FormGroup className='first-name-update'>
                    <Form.Control
                      {...register('first_name', { required: false })}
                      type="text"
                      placeholder="Entrez votre prénom"
                    />
                  </FormGroup>
                </>
              }
            </Card.Title>
          </CardHeader>
          <Card.Body>
            <div className='d-flex justify-content-center'>
              <Form.Group>
                <Form.Label>Photo de profil</Form.Label>
                <Form.Control
                  {...register('picture', { required: false })}
                  type="file"
                  onChange={(event) => {
                    setImageSelected(event.target.files[0]);
                  }}
                />
                <button className='button-update-profil mt-2' onClick={UploadImageToCloudinary}>
                  Voir votre photo
                </button>
              </Form.Group>
            </div>
            <div className='d-flex justify-content-center'>
              <CardImg variant="top" style={{ height: '300px', width: 'auto' }} src={responseCloudinary} />
            </div>
            <div>
              <Card.Text>
                <FormGroup className='mt-3'>
                  <Form.Control
                    {...register('description', { required: false })}
                    type="text"
                    placeholder="Entrez votre description"
                    as="textarea"
                    rows={5}
                  />
                </FormGroup>
              </Card.Text>
            </div>
            <div className='mb-0 list-container'>
              <ListGroup className="list-group-flush list-profil list-item">
                {/* Adresse */}
                <ListGroupItem className="list-item d-flex justify-content-between">
                  <img
                    className='align-items-baseline'
                    src={pin}
                    width={100}
                    height={80}
                  />
                  <FormGroup className='profil-p update-adress' controlId='adress'>
                    <Form.Control
                      {...register('adress', { required: false })}
                      type="text"
                      placeholder="Adresse"
                    />
                  </FormGroup>

                  <FormGroup className='profil-p update-adress-cp' controlId='code postal'>
                    <Form.Control
                      {...register('zip_code', { required: false })}
                      type="text"
                      placeholder="Code Postal"
                    />
                  </FormGroup>
                  <FormGroup className='profil-p update-adress-city' controlId='ville'>
                    <Form.Control
                      {...register('city', { required: false })}
                      type="text"
                      placeholder="Ville"
                    />
                  </FormGroup>
                </ListGroupItem>

                {/* Telephone */}
                <ListGroupItem className="list-item d-inline-flex justify-content-between align-items-baseline">
                  <img
                    className='align-items-baseline'
                    src={catphone}
                    width={100}
                    height={80}
                  />
                  <FormGroup className='profil-p update'>
                    <Form.Control
                      {...register('phone', { required: false })}
                      type="phone"
                      placeholder="Téléphone"
                    />
                  </FormGroup>
                </ListGroupItem>
              </ListGroup>
            </div>
            <div className='d-flex justify-content-center'>
              <Button
                className='button-update-profil'
                type="submit"
              >
                Confirmer
              </Button>
            </div>
          </Card.Body>
        </Form>
      </Card>
      <div className='image-profil-side-container'>
        <img
          className='cathigh'
          src={cathigh}
        />
        <img
          className='pug'
          src={pug}
        />
      </div>
    </div >
  )
};

export default UpdateProfil;
