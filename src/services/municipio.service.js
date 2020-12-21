import http from "../http-common";

class DataService {
  getAll() {
    return http.get("/departamento");
  }

  get(municipio) {
    return http.get(`/departamento/${municipio}`);
  }

  create(municipio) {
    return http.post("/departamento", municipio);
  }

  update(municipio, data) {
    return http.put(`/departamento/${municipio}`, data);
  }

  delete(municipio) {
    return http.delete(`/departamento/${municipio}`);
  }

}

export default new DataService();