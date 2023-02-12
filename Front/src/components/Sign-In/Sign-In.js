import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Row, Col, FormGroup, Container } from 'react-bootstrap';
import { useState } from 'react';
import instance from '../../services/axios.js';
import { useNavigate } from 'react-router-dom';
import './sign-in.scss';

function SignIn() {

  const [mailSignIn, setMailSignIn] = useState('');
  const [passwordSignIn, setPasswordSignIn] = useState('');
  const [checkboxSignIn, setCheckboxSignIn] = useState(false);
  const navigate = useNavigate();

  const handleChangeMailSignIn = (value) => {
    setMailSignIn(value);
  }

  const handleChangePasswordSignIn = (value) => {
    setPasswordSignIn(value);
  }

  const handleChangeCheckboxSignIn = (value) => {
    setCheckboxSignIn(value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    instance
      .post('login',
        {
          password: passwordSignIn,
          email: mailSignIn
        }
      ).then((resp) => {
        console.log(resp);
        const user = resp.data
        if (user.token) {
          instance.defaults.headers.common.Authorization = `Bearer ${user.token}`;
          const userData = JSON.stringify(user);
          localStorage.setItem("user", userData);
          localStorage.setItem("logged", true);
          if (user.role === 'association') {
            localStorage.setItem("isAssociation", true)
          } else {
            localStorage.setItem("isAssociation", false)
          }
          navigate("/");
          window.location.reload(false);
        }
      })
      .catch((error) => {
        console.log(error, 'not okay')
      })
  }



  return (
    <>
      <div className='h1-sign-in d-flex justify-content-center'>
        <h1>Se connecter</h1>
      </div>
      <Container fluid>
        <div className="d-flex justify-content-center container-sign-in">
          <Form onSubmit={handleSubmit}>
            <Row>
              <Form.Group as={Col} md="12" className="mb-5 mt-5" controlId="formBasicEmail">
                <Form.Label className='d-flex justify-content-center'>Email</Form.Label>
                <Form.Control
                  onChange={(e) => {
                    handleChangeMailSignIn(e.target.value)
                  }}
                  value={mailSignIn}
                  type="email"
                  placeholder="Email" />
                <Form.Text className="text-muted d-flex justify-content-center">
                  Nous ne partagerons jamais vos données personnelles.
                </Form.Text>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} className="mb-3" md="12" controlId="formBasicPassword">
                <Form.Label className='d-flex justify-content-center'>Mot de passe</Form.Label>
                <Form.Control
                  onChange={(e) => {
                    handleChangePasswordSignIn(e.target.value)
                  }}
                  value={passwordSignIn}
                  type="password"
                  placeholder="Mot de Passe" />
              </Form.Group>
              <Form.Group as={Col} md="6" className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                  onChange={(e) => {
                    handleChangeCheckboxSignIn(e.target.value)
                  }}
                  value={checkboxSignIn}
                  type="checkbox"
                  label="Rester connecté" />
              </Form.Group>
              <Row>
                <FormGroup as={Col} className="mb-3 d-flex justify-content-center" md="12">
                  <Button className='button-light-gold shadow-none' type="submit">
                    Connexion
                  </Button>
                </FormGroup>
              </Row>
            </Row>
          </Form>
        </div>
      </Container>
    </>
  );
}

export default SignIn;
