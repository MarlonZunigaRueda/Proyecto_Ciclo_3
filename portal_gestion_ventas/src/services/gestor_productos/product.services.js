import http from "../http_client/http-common";

class ProductDataService {

    create(data) {
        return http.post("/products/create", data);
    }

    getAll() {
        return http.get("/products/retrieve");
    }
    
    get(id) {
        return http.get(`products/retrieve/${id}`);
    }

    update(id, data) {
        return http.put(`/product/update/${id}`, data);
    }

    findByName(name) {
        return http.get(`/products/search/${name}`);
    }

    
}

export default new ProductDataService();