import React from "react";
import { useEffect, useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import instance from "../../../services/axios";

const FilterBar = () => {


  return (
    <div className="mt-3 d-flex align-items-center flex-column">
        <div className="container-filter-bar">
          <div className="justify-content-center align-items-center"></div>
          <InputGroup className="col-6 search-bar">
            <FormControl
              placeholder="Search"
              aria-label="Search"
              aria-describedby="basic-addon2"
            />
            <Button className="button-light-gold shadow-none" id="button-addon2">
              Search
            </Button>
          </InputGroup>
        </div>
    </div>
  );
}

export default FilterBar
