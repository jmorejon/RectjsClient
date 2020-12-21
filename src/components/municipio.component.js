import React, { useState, useEffect } from "react";
import MunicipioDataService from "../services/municipio.service";

const Municipio = props => {
  const initialMunicipioState = {
    id: null,
    nombre: "",
    fiscalia: "",
    direccion: "",
    telefono: ""
  };
  const [currentMunicipio, setCurrentMunicipio] = useState(initialMunicipioState);
  const [message, setMessage] = useState("");

  const getMunicipio = id => {
    MunicipioDataService.get(id)
      .then(response => {
        setCurrentMunicipio(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateMunicipio = () => {
    MunicipioDataService.update(currentMunicipio.id, currentMunicipio)
      .then(response => {
        console.log(response.data);
        setMessage("Actualizacion del municipio");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteMunicipio = () => {
    MunicipioDataService.remove(currentMunicipio.id)
      .then(response => {
        console.log(response.data);
        props.history.push("/Municipios");
      })
      .catch(e => {
        console.log(e);
      });
  };
  useEffect(() => {
    getMunicipio(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentMunicipio({ ...currentMunicipio, [name]: value });
  };
  return (
    <div>
      {currentMunicipio ? (
        <div className="edit-form">
          <h4>Municipio</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Fiscalia</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentMunicipio.fiscalia}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Direccion</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentMunicipio.direccion}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="title">Telefono</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentMunicipio.Telefono}
                onChange={handleInputChange}
              />
            </div>
            
          </form>

          {currentMunicipio.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(true)}
            >
              Publish
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={deleteMunicipio}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateMunicipio}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Municipio...</p>
        </div>
      )}
    </div>
  );
};

export default Municipio;