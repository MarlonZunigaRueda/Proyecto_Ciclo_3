import http from "../http_client/http-common";
class AuthDataService {

    login(email, password) {
        return http
            .post("/auth/signin", {
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
        return http.post("/auth/signup", data);
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }

}

export default new AuthDataService();