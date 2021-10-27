import http from "../http_client/http-common";
import authHeader from '../gestor_autenticacion/headers.service';


class ProductDataService {

    create(data) {
        return http.post("/products/create", data, { headers: authHeader()});
    }

    getAll() {
        return http.get("/products/retrieve", { headers: authHeader()});
    }

    get(id) {
        return http.get(`products/retrieve/${id}`, { headers: authHeader()});
    }

    update(id, data) {
        return http.put(`/products/update/${id}`, data, { headers: authHeader()});
    }

    findByName(name) {
        return http.get(`/products/search/${name}`, { headers: authHeader()});
    }

}

export default new ProductDataService();