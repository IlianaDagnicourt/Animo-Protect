import React from "react";
import { Container } from "react-bootstrap";
// import catHighPaw from '../../../assets/Img/cathhighpaw.svg';
// import bird from '../../../assets/Img/oiseau.svg';
// import pug from '../../../assets/Img/pug.svg';
// import duck from '../../../assets/Img/duck.svg';
// import rabbit from '../../../assets/Img/rabbit.svg';
// import horse from '../../../assets/Img/horse.svg'
import './ourstory.scss';

const OurStory = () => {
  return (
    <div className="d-flex align-items-center flex-column mt-5">
    <Container fluid className="banner-our-story"></Container>
      <p className='welcome mt-3'>Bienvenue !</p>
      <div className="container-p d-flex justify-content-center mb-5">
      <p className="description-our-story">Notre objectif avec la création d'<span className="animo">Anim'O Protect </span>
       est de faciliter la tâche de recrutement des associations de protection animale.<br />
      Notre principe repose sur un système très simple. <br/>
      Les associations
      postent des annonces pour expliciter leur recherche et les personnes interessées peuvent
      les contacter via notre chat ! <br/><br />
      Alors, qu'attendez vous
      pour vous lancer ?</p>
      </div>
    </div>
  )
};

export default OurStory;
