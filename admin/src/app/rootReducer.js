import authReducer from "./auth";
import userReducer from "@/views/Pages/Users/Reports/store/userSlice";
import roleReducer from "@/views/Roles/store";
import productReducer from "@/views/Product/store";
import categoryReducer from "@/views/Categories/store";
import unitReducer from "@/views/Ecommerce/Products/Unit/store";
import warehouseReducer from "@/views/Warehouse/store";
import lessonReducer from '@/views/ProductDetail/store'

const rootReducer = {
  auth: authReducer,
  users: userReducer,
  roles: roleReducer,
  products: productReducer,
  categories: categoryReducer,
  units: unitReducer,
  warehouses: warehouseReducer,
  lessons: lessonReducer
};

export default rootReducer;
