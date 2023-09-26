import { useState } from "react"
import InputWithFloatLabel from "../components/Form/InputWithFloatLabel"
import { Link } from "react-router-dom"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const handleSubmitForm = (e) => {
        e.preventDefault()
    }

    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }
    return (
        <div className="">
            <div className="login-container mx-auto fs-16 fw-7">
                <p>Đăng nhập vào tài khoản Coursean của bạn</p>
                <form onSubmit={handleSubmitForm}>
                    <div className="mt-2">
                        <InputWithFloatLabel label={'Email'} onChange={handleChangeEmail} value={email} />
                    </div>
                    <div className="mt-2">
                        <InputWithFloatLabel label={'Password'} onChange={handleChangePassword} value={password} />
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