import axios from "axios";

import config from "../config";
import { createStandaloneToast } from "@chakra-ui/react";

const toast = createStandaloneToast();
const instance = axios.create({
    baseURL: config.API_URL,
});

export default class APIService {
    constructor() {
        instance.interceptors.request.use(
            (config) => {
                const accessToken = this.getToken();
                if (accessToken) {
                    config.headers.Authorization = `Bearer ${accessToken}`;
                }

                return config;
            },
            (error) => Promise.reject(error)
        );
        instance.interceptors.response.use(
            (response) => response,
            (error) => {
                if (
                    error.response.status === 401 &&
                    location.pathname !== "/login"
                ) {
                    toast({
                        title: "Phiên đăng nhập hết hạn!",
                        status: "error",
                        position: "top",
                    });
                    localStorage.removeItem("userData");
                    localStorage.removeItem("accessToken");
                }
                return Promise.reject(error);
            }
        );
        this.instance = instance;
    }

    getToken() {
        return JSON.parse(localStorage.getItem("accessToken"));
    }

    setToken(value) {
        localStorage.setItem("accessToken", value);
    }


}
