import { useState } from "react"
import InputWithFloatLabel from "../components/Form/InputWithFloatLabel"
import { useToast } from "@chakra-ui/react"

const SignUp = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")

    const toast = useToast()

    const handleSubmitForm = (e) => {
        e.preventDefault()
        toast({ status: "error", title: "Failed", position: 'top' })
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
                        <InputWithFloatLabel label={'Họ tên'} onChange={handleChangeEmail} value={email} />
                    </div>
                    <div className="mt-2">
                        <InputWithFloatLabel label={'Email'} onChange={handleChangeName} value={username} />
                    </div>
                    <div className="mt-2">
                        <InputWithFloatLabel label={'Password'} onChange={handleChangePassword} value={password} />
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