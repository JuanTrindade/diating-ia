import axios from "axios";

const key = process.env.REACT_APP_OPENAIKEY;

const header = {
    "Authorization": `Bearer ${key}`
}

const api = axios.create({
    baseURL: "https://api.openai.com/v1/",
    headers: header
})

export default api;