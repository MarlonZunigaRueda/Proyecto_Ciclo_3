import axios from "axios";
export default axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-type": "application/json; charset=utf-8",
        "Vary": "Origin",
        "Access-Control-Allow-Origin": "http://localhost:3000",
        'x-access-token': ''
    }
});