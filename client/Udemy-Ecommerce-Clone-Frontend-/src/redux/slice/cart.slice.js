import { createSlice } from '@reduxjs/toolkit'
import { createStandaloneToast } from "@chakra-ui/react";

const initialState = {
    products: [],
}
const {toast} = createStandaloneToast({defaultOptions: {position: 'top'}});

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct: (state, action) => {
            const checkIsExist = state.products.find(product => product.id == action.payload?.id)
            if(checkIsExist){
                toast({ title: "Sản phẩm đã tồn tại", status: "error" });
            }
            state.products = [...state.products, action.payload]
            toast({ title: "Thêm sản phẩm vào giỏ hàng thành công", status: "success" });
        },
        removeProduct: (state, action) => {
            state.products = state.products.filter(product => product.id != action.payload)
            toast({ title: "Xoá sản phẩm khỏi giỏ hàng thành công", status: "success" });
        },
        clearCart: (state, action) => {
            state.products = []
        }
    },
})

// Action creators are generated for each case reducer function
export const { addProduct, removeProduct, clearCart } = cartSlice.actions

export default cartSlice.reducer