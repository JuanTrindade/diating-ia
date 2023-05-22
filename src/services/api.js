import axios from "axios";

const key = "key"; 

const header = {
    "Authorization": `Bearer ${key}`
}

const api = axios.create({
    baseURL: "https://api.openai.com/v1/",
    headers: header
})

export default api;