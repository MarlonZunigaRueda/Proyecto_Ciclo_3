import http from "../http_client/http-common";
import authHeader from '../gestor_autenticacion/headers.service';

class SaleDataService {

    create(data) {
        return http.post("/sales/create", data, { headers: authHeader()});
    }

    get(id) {
        return http.get(`sales/retrieve/${id}`, { headers: authHeader()});
    }

    getAll() {
        return http.get("/users/retrieve", { headers: authHeader()});
    }

    update(id, data) {
        return http.put(`/sales/update/${id}`, data, { headers: authHeader()});
    }

    findByName(name) {
        return http.get(`/sales/search/${name}`, { headers: authHeader()});
    }

    findById(id) {
        return http.get(`/sales/search/${id}`, { headers: authHeader()});
    }
}

export default new SaleDataService();