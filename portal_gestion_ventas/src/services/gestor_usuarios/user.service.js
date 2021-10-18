import http from "../http_client/http-common";

class UserDataService {

    create(data) {
        return http.post("/users/create", data);
    }

    getAll() {
        return http.get("/users/retrieve");
    }


    getAllClients() {
        return http.get("/users/clients");
    }

    getAllSellers() {
        return http.get("/users/sellers");
    }


    get(id) {
        return http.get(`users/retrieve/${id}`);
    }

    update(id, data) {
        return http.put(`/users/update/${id}`, data);
    }

    findByName(name) {
        return http.get(`/users/search/${name}`);
    }

    verify(token) {
        return http.get(`users/verify/${token}`);
    }
}

export default new UserDataService();