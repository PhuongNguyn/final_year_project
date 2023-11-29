import axios from "axios";

import config from "../config";

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
                    error.response?.status === 401
                ) {

                    localStorage.removeItem("userData");
                    localStorage.removeItem("accessToken");
                }
                return Promise.reject(error);
            }
        );
        this.instance = instance;
    }

    getToken() {
        return JSON.parse(localStorage.getItem("accessToken") != undefined ? localStorage.getItem("accessToken") : "null");
    }

    setToken(value) {
        localStorage.setItem("accessToken", value);
    }

    login(data) {
        return instance.post('/auth/users/login', data)
    }

    signUp(data) {
        return instance.post('/auth/users/register', data)
    }

    // categories
    async getCategoryHome() {
        return instance.get('/products/categories/getCateHome')
    }

    // course 
    async getCourseByCate(slug, pageSize = 10, pageIndex = 1, search = "") {
        return instance.get(`/products/product/getByCateSlug?slug=${slug}&pageSize=${pageSize}&pageIndex=${pageIndex}&search=${search}`)
    }

    async getCourseBySlug(slug) {
        return instance.get(`/products/product/getBySlug/${slug}`)
    }

    async momoPay(data){
        return instance.post('/products/invoices/momo', data)
    }

    async updatePayment(invoiceId, status){
        return instance.put(`/products/invoices/pay-result/${invoiceId}`, {status})
    }

    async  getMyCourse(){
        return instance.get('/products/invoices/my-course')
    }
}
