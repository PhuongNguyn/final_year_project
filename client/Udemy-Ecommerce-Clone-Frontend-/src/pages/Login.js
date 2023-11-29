import { useState } from "react"
import InputWithFloatLabel from "../components/Form/InputWithFloatLabel"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useQuery, useToast } from "@chakra-ui/react"
import APIService from "../services"
import { SUCCESS_STATUS } from "../utils/constants"
import { useDispatch } from "react-redux"
import { changeLoadingState } from "../redux/slice/theme.slice"
import { login as loginAction } from "../redux/slice/user.slice"

const Login = () => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const searchParams = new URLSearchParams(document.location.search)
    const toast = useToast()
    const navigate = useNavigate()
    const handleSubmitForm = async (e) => {
        const api = new APIService()
        e.preventDefault()
        if (!email || email.length < 6) {
            toast({ status: "error", title: "Tên đăng nhập phải lớn hơn 6 kí tự", position: 'top' })
            return;
        }

        if (!password || password.length < 6) {
            toast({ status: "error", title: "Mật khẩu phải lớn hơn 6 kí tự", position: 'top' })
        }
        try {
            dispatch(changeLoadingState(true))
            const result = await api.login({ phoneNumber: email, password })
            if (result.data?.status == SUCCESS_STATUS) {
                toast({ status: "success", title: "Đăng nhập thành công", position: "top" })
                dispatch(loginAction({ user: result.data.result?.user, token: result.data.result?.accessToken }))
                if(searchParams.get("from")){
                    navigate(`/${searchParams.get("from")}`)
                    return;
                }
                navigate('/')
            } else {
                toast({ status: "success", title: "Đăng nhập thất bại", position: "top" })
            }
        } catch (error) {
            console.log(error)
            toast({ status: "error", title: error.response?.data?.message || "Đăng nhập thất bại", position: 'top' })
        } finally {
            dispatch(changeLoadingState(false))
        }
    }

    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }
    console.log(searchParams.get("from"))
    return (
        <div className="">
            <div className="login-container mx-auto fs-16 fw-7">
                <p>Đăng nhập vào tài khoản Coursean của bạn</p>
                <form onSubmit={handleSubmitForm}>
                    <div className="mt-2">
                        <InputWithFloatLabel label={'Phone Number'} onChange={handleChangeEmail} value={email} />
                    </div>
                    <div className="mt-2">
                        <InputWithFloatLabel type={"password"} label={'Password'} onChange={handleChangePassword} value={password} />
                    </div>
                    <div className="mt-2">
                        <button type="submit" className="login-sign-up-button">
                            Đăng nhập
                        </button>
                    </div>
                </form>
                <hr className="mt-4" />
                <p className="login-note mt-4 fw-4 text-center">Bạn không có tài khoản? Hãy <span className="redirect-to-sign-up"><Link to={'/sign-up'}>đăng ký</Link></span></p>
            </div>
        </div>
    )
}

export default Login