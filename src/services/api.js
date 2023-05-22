import axios from "axios";

const key = "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"; 

const header = {
    "Authorization": `Bearer ${key}`
}

const api = axios.create({
    baseURL: "https://api.openai.com/v1/",
    headers: header
})

export default api;