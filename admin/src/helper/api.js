import axios from "axios";

import config from "@/config";
import { store } from "@/app/store";
import { handleLogout } from "@/app/auth";
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
          location.pathname !== "/auth/login"
        ) {
          toast({
            title: "Phiên đăng nhập hết hạn!",
            status: "error",
            position: "top",
          });
          store.dispatch(handleLogout());
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

  login(...args) {
    return instance.post("/auth/users/login", ...args);
  }

  //Users
  getUsers(pageSize = 10, pageIndex = 1, search = "") {
    return instance.get(
      `/auth/users/get-paging?pageSize=${pageSize}&pageIndex=${pageIndex}&search=${search}`
    );
  }
  getUser(id) {
    return instance.get(`/auth/users/${id}`);
  }

  addUser(data) {
    return instance.post(`/auth/users`, data);
  }
  updateUser(id, data) {
    return instance.put(`/auth/users/${id}`, data);
  }
  resetPassowordUser(id, data) {
    return instance.put(`/auth/users/reset-password/${id}`, data);
  }
  deleteUser(id) {
    return instance.delete(`/auth/users/${id}`);
  }

  //Roles
  getAllRoles() {
    return instance.get(`/auth/roles/get-all`);
  }
  getRoleById(id) {
    return instance.get(`/auth/roles/permission/${id}`);
  }
  createRole(data) {
    return instance.post(`/auth/roles`, data);
  }
  updateRole(id, data) {
    return instance.put(`/auth/roles/${id}`, data);
  }

  //Categories

  getCategories(pageSize = 10, pageIndex = 1, search = "") {
    return instance.get(
      `/products/categories?pageSize=${pageSize}&pageIndex=${pageIndex}&search=${search}`
    );
  }

  getAllCategory() {
    return instance.get(`/products/categories/get-all`);
  }

  getCategory(id) {
    return instance.get(`/products/categories/getById/${id}`);
  }
  createCategories(data) {
    return instance.post(`/products/categories`, data);
  }

  getUnits(pageSize = 10, pageIndex = 1, search = "") {
    return instance.get(
      `/products/unit?pageSize=${pageSize}&pageIndex=${pageIndex}&search=${search}`
    );
  }
  getUnit(id) {
    return instance.get(`/products/unit/getById/${id}`);
  }
  createUnit(data) {
    return instance.post(`/products/unit`, data);
  }
  updateCategories(id, data) {
    return instance.put(`/products/categories/${id}`, data);
  }
  deleteCategories(id) {
    return instance.delete(`/products/categories/${id}`);
  }

  createProduct(data) {
    return instance.post(`/products/product`, data)
  }

  getProducts(pageSize = 10, pageIndex = 1, search = "") {
    return instance.get(
      `/products/product?pageSize=${pageSize}&pageIndex=${pageIndex}&search=${search}`
    );
  }
  getProduct(id) {
    return instance.get(`/products/product/getById/${id}`);
  }
  deleteProduct(id) {
    return instance.delete(`/products/product/${id}`);
  }

  updateProduct(id, value) {
    return instance.put(`/products/product/${id}`, value)
  }

  uploadFile(data) {
    return instance.post(`/file`, data);
  }

  getAllUnit() {
    return instance.get(`/products/unit/get-all-unit`)
  }

  createWarehouse(data) {
    return instance.post(`/products/warehouse`, data)
  }

  getPagingWarehouse(pageSize = 10, pageIndex = 1, search = "") {
    return instance.get(`/products/warehouse?pageSize=${pageSize}&pageIndex=${pageIndex}&search=${search}`)
  }

  editWarehouse(id, data) {
    return instance.put(`/products/warehouse/${id}`, data)
  }

  deleteLesson(id) {
    return instance.delete(`/products/lessons/${id}`)
  }

  getPagingLessons(pageSize = 10, pageIndex = 1, search = "") {
    return instance.get(`/products/lessons/getPaging?pageSize=${pageSize}&pageIndex=${pageIndex}&search=${search}`)
  }

  createLesson(data) {
    return instance.post('/products/lessons', data)
  }

  getLesson(id) {
    return instance.get(`/products/lessons/${id}`);
  }

  updateLesson(id, data) {
    return instance.put(`/products/lessons/${id}`, data)
  }
}
