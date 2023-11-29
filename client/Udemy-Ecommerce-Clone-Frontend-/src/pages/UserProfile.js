import { Avatar } from "@chakra-ui/react"
import { useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import UserInformation from "../components/UserInformation"
import MyCourse from "../components/MyCourse"

const UserProfile = () => {
    const [user, setUser] = useState()
    const [tab, setTab] = useState("profile")
    const users = useSelector((state) => state.users)

    const handleSetTab = (tab) => {
        setTab(tab)
    }
    return (
        <div className="container profile-wrapper">
            <div className="profile-page">
                <div className="sidebar-profile">
                    <div className="sidebar-profile-header">
                        <Avatar size={'2xl'} name={users?.user?.fullname}/>
                        <p>{users?.user?.fullname}</p>
                    </div>
                    <div className="sidebar-profile-menu">
                        <ul>
                           <li className={tab == "profile" ? "sidebar-profile-menu-selected" : ""} onClick={()=>handleSetTab("profile")}>Hồ Sơ Người dùng</li>
                            <li className={tab == "my-course" ? "sidebar-profile-menu-selected" : ""} onClick={()=>handleSetTab("my-course")}>Khoá học của bạn</li>
                            <li className={tab == "my-class" ? "sidebar-profile-menu-selected" : ""} onClick={()=>handleSetTab("my-class")}>Lớp học của bạn</li>
                        </ul>
                    </div>
                </div>
                <div className="content-profile">
                    <div className="content-profile-header">
                        <h1>Public profile</h1>
                    </div>
                    <div className="mt-4 user-info-wrapper">
                        {tab == "profile" && <UserInformation user={users?.user}/>}
                        {tab == "my-course" && <MyCourse />}
                </div>
                </div>
          
            </div>
        </div>
    )
}

export default UserProfile