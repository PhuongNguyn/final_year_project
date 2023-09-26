import { useState } from "react"
import InputWithFloatLabel from "../components/Form/InputWithFloatLabel"
import { useToast } from "@chakra-ui/react"
import { useDispatch } from "react-redux"
import { changeLoadingState } from "../redux/slice/theme.slice"
import APIService from "../services"
import { SUCCESS_STATUS } from "../utils/constants"
import { useNavigate } from "react-router"

const SignUp = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")

    const dispatch = useDispatch()
    const toast = useToast()
    const navigate = useNavigate()

    const handleSubmitForm = async (e) => {
        e.preventDefault()
        const api = new APIService()
        if (!email || email.length < 6) {
            toast({ status: "error", title: "Tên đăng nhập phải lớn hơn 6 kí tự", position: 'top' })
            return;
        }

        if (!password || password.length < 6) {
            toast({ status: "error", title: "Mật khẩu phải lớn hơn 6 kí tự", position: 'top' })
        }

        if (!username) {
            toast({ status: "error", title: "Tên người dùng không được bỏ trống", position: 'top' })
            return;
        }

        try {
            dispatch(changeLoadingState(true))

            const result = await api.signUp({ fullname: username, password, phoneNumber: email })
            if (result.data?.status == SUCCESS_STATUS) {
                toast({ status: "success", title: "Đăng kí thành công", position: "top" })
                navigate('/login')
            } else {
                toast({ status: "success", title: "Đăng kí thất bại", position: "top" })
            }
        } catch (error) {
            console.log(error)
            toast({ status: "error", title: error.response?.data?.message || "Đăng kí thất bại", position: 'top' })
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

    const handleChangeName = (e) => {
        setUsername(e.target.value)
    }
    return (
        <div className="">
            <div className="login-container mx-auto fs-16 fw-7">
                <p>Đăng kí tài khoản Coursean của bạn</p>
                <form onSubmit={handleSubmitForm}>
                    <div className="mt-2">
                        <InputWithFloatLabel label={'Full name'} onChange={handleChangeName} value={username} />
                    </div>
                    <div className="mt-2">
                        <InputWithFloatLabel label={'Phone Number'} onChange={handleChangeEmail} value={email} />
                    </div>
                    <div className="mt-2">
                        <InputWithFloatLabel type="password" label={'Password'} onChange={handleChangePassword} value={password} />
                    </div>
                    <div className="mt-2">
                        <button type="submit" className="login-sign-up-button">
                            Đăng kí
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp