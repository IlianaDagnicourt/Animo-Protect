import React, { useState } from 'react';
import { FormGroup, Nav, NavItem, Button, Col, Form, Row } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Sign-up.scss';


function SignUp() {



  const navigate = useNavigate();

  // Je mets en place mes hook pour mes champs contrôlés

  const [isAssociation, setIsAssociation] = useState(false);
  const [isSamePassword, setIsSamePassword] = useState();
  const [imageSelected, setImageSelected] = useState("");
  const [responseCloudinary, setResponseCloudinary] = useState("");
  console.log(responseCloudinary);

  const { handleSubmit, register, formState: { errors } } = useForm();

  // Je mets a jour mon hook et stocke l'état du bouton dans isAssociation
  function handleChangeSwitch(e) {
    if (e.target.checked === true) {
      setIsAssociation(true);
    } else if (e.target.checked === false) {
      setIsAssociation(false);
    }
  };

  const UploadImageToCloudinary = () => {
    const FormRequest = new FormData();
    FormRequest.append("file", imageSelected)
    FormRequest.append("upload_preset", "Aosci947792");
    axios
      .post(
        "https://api.cloudinary.com/v1_1/anim-o-protect/image/upload", FormRequest
      ).then((response) => {
        setResponseCloudinary(response.data.url);
      })
  };


  //Soumission du formulaire
  const onSubmit = data => {
    //Je vérifie que les deux mdp soient identiques et qu'isAssociation est vrai

    if (data.password === data.repeat_password && isAssociation === true) {
      setIsSamePassword(false);
      const {
        // Les données à ne pas envoyer dans mon objet final
        first_name,
        last_name,
        checkbox,
        // Les données à envoyer
        ...AssociationData
      } = data;
      console.log(AssociationData);
      AssociationData.picture = responseCloudinary
      //Je fais ma requête POST à Axios
      axios
        .post('https://animo-protect.herokuapp.com/api/register/association',
          AssociationData
        ).then((resp) => {
          navigate("/connexion");
          console.log(resp);
        }).catch((error) => {
          console.log(error + "Erreur dans l'inscription")
        })
      //Je vérifie que les mdp sont indentiques et qu'isAssociation est faux
    } else if (data.password === data.repeat_password && isAssociation === false) {
      setIsSamePassword(false);
      const {
        //les données à ne pas envoyer dans mon objet final
        name,
        siren,
        checkbox,
        //Les données à envoyer
        ...BenevoleData
      } = data
      console.log(BenevoleData)
      BenevoleData.picture = responseCloudinary
      //Je fais ma requête POST à axios
      axios
        .post('https://animo-protect.herokuapp.com/api/register/benevole',
          BenevoleData
        ).then((resp) => {
          navigate("/connexion")
          console.log(resp);
        }).catch((error) => {
          console.log(error + "Erreur dans l'inscription")
        })
      //je vérifie que les mdp sont différents et j'active ma fonction
      //permettant d'afficher le message d'erreur.
    } else if (data.password !== data.repeat_password) {
      setIsSamePassword(true)
    }
  };


  return (
    // Form
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row xs={1}>
        {/* Switch */}
        <FormGroup as={Col} md="12" className="pb-2">
          <Form.Check
            onChange={handleChangeSwitch}
            type="switch"
            id="custom-switch"
            label={isAssociation ? "Association" : "Bénévole"}
          />
        </FormGroup>
      </Row>
      <Row xs={1}>
        {/* Is association ? */}
        {isAssociation ? <>
          <Form.Group as={Col} md="6" controlId="NameAssociation">
            <Form.Label>Nom de l'organisation*</Form.Label>
            <Form.Control {...register('name', { required: true })}
              type="text"
              placeholder="Nom de l'organisation"
            />
            {errors.name && <p className='text-danger'>Le nom est requis</p>}
          </Form.Group>
          {/* SIREN INPUT */}
          <Form.Group as={Col} md="6" controlId="Siren">
            <Form.Label>SIREN*</Form.Label>
            <Form.Control {...register('siren', { required: true })}
              type="text"
              placeholder="SIREN"
            />
            {errors.siren && <p className='text-danger'>Le siren est requis</p>}
          </Form.Group>
        </>
          : <>
            {/* SURNAME INPUT */}
            <Form.Group as={Col} md="6" controlId="FirstName">
              <Form.Label>Prénom*</Form.Label>
              <Form.Control {...register('first_name', { required: true })}
                type="text"
                placeholder="Prénom"
              />
              {errors.first_name && <p className='text-danger'>Le prénom est requis</p>}
            </Form.Group>
            {/* LASTNAME INPUT */}
            <Form.Group as={Col} md="6" controlId="LastName">
              <Form.Label>Nom*</Form.Label>
              <Form.Control {...register('last_name', { required: true })}
                type="text"
                placeholder="Nom"
              />
              {errors.last_name && <p className='text-danger'>Le nom est requis</p>}
            </Form.Group>
          </>}

        {/* Partie fixe du formulaire */}

      </Row>
      <Row>
        {/* ADRESS INPUT */}
        <Form.Group as={Col} md="12" className='mt-3 mb-3' controlId="Adress">
          <Form.Label>Adresse*</Form.Label>
          <Form.Control {...register('adress', { required: true })}
            type="text"
            placeholder="Ville"
          />
          {errors.adress && <p className='text-danger'>L'adresse est requise</p>}
        </Form.Group>
      </Row>
      <Row className="mb-3">
        {/* CITY INPUT */}
        <Form.Group as={Col} md="5" controlId="City">
          <Form.Label>Ville*</Form.Label>
          <Form.Control {...register('city', { required: true })}
            type="text"
            placeholder="Ville"
          />
          {errors.city && <p className='text-danger'>La ville est requise</p>}
        </Form.Group>
        {/* ZIPCODE INPUT */}
        <Form.Group as={Col} md="4" controlId="ZipCode">
          <Form.Label>Code Postal*</Form.Label>
          <Form.Control
            {...register('zip_code', { required: true })}
            type="text"
            placeholder="Code Postal" />
          {errors.zip_code && <p className='text-danger'>Le code postal est requis</p>}
        </Form.Group>
        {/* COUNTRY INPUT */}
        <Form.Group as={Col} md="3" controlId="Pays">
          <Form.Label>Pays*</Form.Label>
          <Form.Control
            {...register('country', { required: true })}
            type="text"
            placeholder="Pays" />
          {errors.country && <p className='text-danger'>Le pays est requis</p>}
        </Form.Group>
      </Row>
      <Row>
        {/* MAIL INPUT */}
        <Form.Group as={Col} md="6" controlId="Email">
          <Form.Label>Email*</Form.Label>
          <Form.Control
            {...register('email', { required: true })}
            type="email"
            placeholder="Email" />
          {errors.email && <p className='text-danger'>Le mail est requis</p>}
        </Form.Group>
        {/* PHONE INPUT */}
        <Form.Group as={Col} md="6" controlId="Phone">
          <Form.Label>Téléphone*</Form.Label>
          <Form.Control
            {...register('phone', { required: true })}
            type="tel"
            placeholder="téléphone" />
          {errors.email && <p className='text-danger'>Le téléphone est requis</p>}
        </Form.Group>
        {/* PASSWORD INPUT */}
        <Form.Group as={Col} md="5" className="mb-3 mt-3" controlId="Password">
          <Form.Label>Mot de passe*</Form.Label>
          <Form.Control
            {...register('password', { required: true })}
            type="password"
            placeholder="Mot de Passe"
          />
          {errors.password && <p className='text-danger'>Le mot de passe est requis</p>}
        </Form.Group>

        <Form.Group as={Col} md="7" className="mb-3 mt-3" controlId="ConfirmPassword">
          {/* PASSWORD INPUT */}
          <Form.Label>Confirmation mot de passe*</Form.Label>
          <Form.Control
            {...register('repeat_password', { required: true },)}
            type="password"
            placeholder="Mot de Passe"
          />
          {errors.RepeatPassword && <p className='text-danger'>La confirmation du mot de passe est requise</p>}
          {isSamePassword ? <p className='text-danger'>Pas les memes</p> : null}
        </Form.Group>
        {/* Description */}
        <Row>
          <FormGroup as={Col} className="md-12 mt-1 mb-2">
            <Form.Label>Description</Form.Label>
            <Form.Control
              {...register('description', { required: false })}
              type="text"
              as="textarea"
              rows={3}
              placeholder="Description"
            />
          </FormGroup>
        </Row>
        <Row>
          <Form.Group as={Col} md="4" className='mb-3' controlId="Pseudo">
            <Form.Label>Pseudo*</Form.Label>
            <Form.Control {...register('username', { required: true })}
              type="text"
              placeholder="Pseudo"
            />
            {errors.username && <p className='text-danger'>Le pseudo est requis</p>}
          </Form.Group>

          <Form.Group as={Col} md="4" className='mb-3' controlId="Secret">
            <Form.Label>Mot de passe Chat*</Form.Label>
            <Form.Control {...register('secret', { required: true })}
              type="text"
              placeholder="Tchat"
            />
            {errors.secret && <p className='text-danger'>Ce mot de passe est requis</p>}
          </Form.Group>

          <Form.Group as={Col} md="4" className='mb-3' controlId="Upload">
            <Form.Label>Photo de profil</Form.Label>
            <Form.Control
              type="file"
              onChange={(event) => {
                setImageSelected(event.target.files[0]), UploadImageToCloudinary();
              }}
            />
            {/* <Button as={Col} md='3' className='button-light-gold mt-2 upload' onClick={UploadImageToCloudinary}>Envoyer</Button> */}
          </Form.Group>
        </Row>
        <Form.Group as={Col} className="mb-3 mt-3 display" controlId="Picture-url">
          <Form.Label>Picture</Form.Label>
          <Form.Control
            {...register('picture', { required: false })}
            type="text"
            value={responseCloudinary}
          />
        </Form.Group>



        <Form.Group as={Col} className="mb-3">
          <Form.Check
            {...register('checkbox', { required: true })}
            label="J'accepte les termes et conditions d'utilisation*"
          />
          {errors.checkbox && <p className='text-danger'>Confirmation requise</p>}
        </Form.Group>
        <Button
          type="submit"
          className="button-light-gold shadow-none"
        >
          Soumettre
        </Button>
      </Row>
    </Form>
  );
}

export default SignUp;
