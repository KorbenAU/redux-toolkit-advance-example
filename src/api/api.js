import axios from "axios";

const api = axios.create({
    baseURL: `https://jsonplaceholder.typicode.com`,
    headers: {
        "Content-Type": "application/json"
    }
});

export const getAllUsers = async () => {
    try {
        const response = await api.get("/users");
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getAllPosts = async () => {
    try {
        const response = await api.get("/posts");
        return response.data;
    } catch (error) {
        throw error;
    }
};
