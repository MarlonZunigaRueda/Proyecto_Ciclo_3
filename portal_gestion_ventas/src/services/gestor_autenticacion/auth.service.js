import http from "../http_client/http-common";
import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

class AuthDataService {

    login(email, password) {
        return axios
            .post(API_URL + "signin", {
                email,
                password
            })
            .then(response => {debugger;
                if (response.data.user && response.data.user.isEmployee && response.data.user.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data.user));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(data) {
        return axios.post(API_URL + "signup", data);
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }

}

export default new AuthDataService();