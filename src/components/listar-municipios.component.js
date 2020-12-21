import React, { useState, useEffect } from "react";
import DataService from "../services/municipio.service";
import { Link } from "react-router-dom";

const MunicipioList = () => {
  const [Municipio, setMunicipio] = useState([]);
  const [currentMunicipio, setCurrentMunicipio] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    retrieveMunicipio();
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveMunicipio = () => {
    DataService.getAll()
      .then(response => {
        setMunicipio(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveMunicipio();
    setCurrentMunicipio(null);
    setCurrentIndex(-1);
  };

  const setActiveMunicipio = (Municipio, index) => {
    setCurrentMunicipio(Municipio);
    setCurrentIndex(index);
  };

  const removeAllMunicipio = () => {
    DataService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    DataService.findByTitle(searchTitle)
      .then(response => {
        setMunicipio(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Municipio List</h4>

        <ul className="list-group">
          {Municipio &&
            Municipio.map((Municipio, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveMunicipio(Municipio, index)}
                key={index}
              >
                {Municipio.title}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllMunicipio}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentMunicipio ? (
          <div>
            <h4>Municipio</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentMunicipio.title}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentMunicipio.description}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentMunicipio.published ? "Published" : "Pending"}
            </div>

            <Link
              to={"/Municipio/" + currentMunicipio.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Municipio...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MunicipioList;