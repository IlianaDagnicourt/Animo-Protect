import { Container, FormGroup, FormText } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';

function ContactUs() {

  const [state, handleSubmit] = useForm("mjvzovpp");
  if (state.succeeded) {
    return <p>Merci de votre message !</p>;
  }

  return (
    <Container fluid className='container-contact-us'>
      <Form onSubmit={handleSubmit}>
        <Row>
          <FormGroup as={Col} className="md-6 mt-3">
            <Form.Label htmlFor="email">
              Email
            </Form.Label>
            <Form.Control
              id="email"
              type="email"
              name="email"
            />
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
            />
          </FormGroup>
        </Row>
        <Row>
          <FormGroup as={Col} className="md-6 mt-3">
            <Form.Label>
              Votre message
            </Form.Label>
            <Form.Control
              as='textarea'
              id="message"
              name="message"
              row="5"
            />
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
            />
          </FormGroup>
        </Row>
        <Button type="submit" className='mt-5 mb-5 button-light-gold shadow-none' disabled={state.submitting}>
          Envoyer
        </Button>
      </Form>
    </Container>
  );
}

export default ContactUs;
