import { useEffect, useState } from "react"
import InputWithFloatLabel from "../Form/InputWithFloatLabel"


const UserInformation = ({ user }) => {
    const [fullname, setFullname] = useState(user?.fullname)
    const [email, setEmail] = useState(user?.email)
    const [address, setAddress] = useState(user?.address)
    const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber)
    const handleSubmitForm = () => {

    }

    const handleChangeUsername = () => {

    }

    const handleChangeEmail = () => {

    }

    const handleChangePhoneNumber = () => {

    }

    const handleChangeAddress = () => {

    }

    useEffect(()=>{
        setFullname(user?.fullname)
        setEmail(user?.email)
        setPhoneNumber(user?.phoneNumber)
        setAddress(user?.address)
    },[])
    return (
        <form onSubmit={handleSubmitForm}>
            <div className="mt-2">
                <InputWithFloatLabel label={'Họ và Tên'} onChange={handleChangeUsername} value={fullname} />
            </div>
            <div className="mt-2">
                <InputWithFloatLabel type={"email"} label={'Email'} onChange={handleChangeEmail} value={email} />
            </div>
            <div className="mt-2">
                <InputWithFloatLabel label={'Số điện thoại'} onChange={handleChangePhoneNumber} value={phoneNumber} />
            </div>
            <div className="mt-2">
                <InputWithFloatLabel label={'Địa chỉ'} onChange={handleChangeAddress} value={address} />
            </div>
            {/* <div className="mt-2">
                <button type="submit" className="login-sign-up-button">
                    Đăng nhập
                </button>
            </div> */}
        </form>
    )
}

export default UserInformation