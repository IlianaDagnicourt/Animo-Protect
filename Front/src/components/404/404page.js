import React from "react";
import { Row, Col, NavItem } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import './cat.scss';
import cat from '../../assets/Img/crying-cat.svg';
import fish from '../../assets/Img/fish.svg';

const BadDirection = () => {
  return (
    <div className="d-flex justify-content-center">
      <Row>
        <img   
        src={ cat }
        width={300}
        height={300}
         />
        <h1 className="cry d-flex justify-content-center">
          Aw ne pleure pas, ce n'est qu'une erreur
        </h1>
        <h1 className="error d-flex justify-content-center">
          404
        </h1>
        <h1 className="cry d-flex justify-content-center">
        Clique sur le poisson pour retrouver ton chemin !
        </h1>
      <Navbar.Brand href="/" className="d-flex justify-content-center">
        <img   
        className="mb-5"
        src={ fish }
        width={100}
        height={100}
         />
         </Navbar.Brand>
      </Row>
    </div>
  )
} 

export default BadDirection;
