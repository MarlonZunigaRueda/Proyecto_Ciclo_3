import http from "../http_client/http-common";
import axios from 'axios';
import authHeader from '../gestor_autenticacion/headers.service';

class UserDataService {

    create(data) {
        return http.post("/users/create", { headers: authHeader() }, data);
    }

    getAll() {
        return http.get("/users/retrieve", { headers: authHeader() });
    }


    getAllClients() {
        return http.get("/users/clients", { headers: authHeader() });
    }

    getAllSellers() {
        return http.get("/users/sellers", { headers: authHeader() });
    }


    get(id) {
        return http.get(`users/retrieve/${id}`, { headers: authHeader() });
    }

    update(id, data) {
        return http.put(`/users/update/${id}`, { headers: authHeader() }, data);
    }

    findByName(name) {
        return http.get(`/users/search/${name}`, { headers: authHeader() });
    }

    getRole(role) {
        return http.get(`users/getRole/${role}`, { headers: authHeader() });
    }
}

export default new UserDataService();