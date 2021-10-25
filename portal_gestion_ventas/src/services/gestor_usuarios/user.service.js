import http from "../http_client/http-common";
import authHeader from '../gestor_autenticacion/headers.service';

class UserDataService {

    getAll() {
        return http.get("/users/retrieve", { headers: authHeader() });
    }


    getAllClients() {
        return http.get("/users/clients", { headers: authHeader() });
    }

    getAllEmployees() {
        return http.get("/users/employees", { headers: authHeader() });
    }


    get(id) {
        return http.get(`users/retrieve/${id}`, { headers: authHeader() });
    }

    update(id, data) {
        var req =http.put(`/users/update/${id}`,data ,{ headers: authHeader() } )
        return req;
    }

    findByName(name) {
        return http.get(`/users/search/${name}`, { headers: authHeader() });
    }

    getRole(role) {
        return http.get(`users/getRole/${role}`, { headers: authHeader() });
    }
}

export default new UserDataService();