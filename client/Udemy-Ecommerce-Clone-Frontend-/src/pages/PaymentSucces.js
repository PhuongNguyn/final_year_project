import { FaCheck } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/slice/cart.slice";
import { useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import APIService from "../services";
import { useParams } from "react-router";

const PaymentSuccess = () => {
    const dispatch = useDispatch()
    const searchParams = new URLSearchParams(document.location.search)
    const status = searchParams.get("resultCode")
    const params = useParams()
    const updateSuccessInvoice = async () => {
        try {
            const api = new APIService()
            const result = await api.updatePayment(params?.invoiceNumber, "0")
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        if(status == "0"){
            dispatch(clearCart())
            updateSuccessInvoice()
        }
    },[])

    return (
        <div id="payment-result">
            <div className="card">
                <div className="check-wrapper">
                    {status == "0" ? <FaCheck size={100} className="icon-check" /> : <IoMdClose size={100} className="icon-fail" />}
                </div>
                <h1 className={status != 0 ? "order-fail" : ""}>{status == "0" ? "Thành công" : "Thất bại"}</h1>
                <p className="text-center">Thanh toán {status == "0" ? "Thành công" : "Thất bại"}</p>
                <p>Quay lại giỏ hàng và thử lại</p>
            </div>
        </div>
    )
}

export default PaymentSuccess