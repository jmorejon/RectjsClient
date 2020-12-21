import React, { useState } from "react";
import MunicipioDataService from "../services/municipio.service";

const AddMunicipio = () => {
  const initialMunicipioState = {
    id: null,
    nombre: "",
    fiscalia: "",
    direccion: "",
    telefono: ""
  };
  const [Municipio, setMunicipio] = useState(initialMunicipioState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setMunicipio({ ...Municipio, [name]: value });
  };

  const saveMunicipio = () => {
    var data = {
      nombre: Municipio.nombre,
      fiscalia: Municipio.fiscalia
    };

    MunicipioDataService.create(data)
      .then(response => {
        setMunicipio({
          id: response.data.id,
          nombre: response.data.nombre,
          fiscalia: response.data.fiscalia,
          direccion: response.data.direccion
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newMunicipio = () => {
    setMunicipio(initialMunicipioState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newMunicipio}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="nombre">nombre</label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              required
              value={Municipio.nombre}
              onChange={handleInputChange}
              name="nombre"
            />
          </div>

          <div className="form-group">
            <label htmlFor="fiscalia">fiscalia</label>
            <input
              type="text"
              className="form-control"
              id="fiscalia"
              required
              value={Municipio.fiscalia}
              onChange={handleInputChange}
              name="fiscalia"
            />
          </div>

          <button onClick={saveMunicipio} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddMunicipio;