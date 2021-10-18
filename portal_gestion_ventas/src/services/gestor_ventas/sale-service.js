import http from "../http_client/http-common";

class SaleDataService {

    create(data) {
        return http.post("/sales/create", data);
    }

    get(id) {
        return http.get(`sales/retrieve/${id}`);
    }

    getAll() {
        return http.get("/users/retrieve");
    }

    update(id, data) {
        return http.put(`/sales/update/${id}`, data);
    }

    findByName(name) {
        return http.get(`/sales/search/${name}`);
    }

    findById(id) {
        return http.get(`/sales/search/${id}`);
    }
    
}

export default new SaleDataService();