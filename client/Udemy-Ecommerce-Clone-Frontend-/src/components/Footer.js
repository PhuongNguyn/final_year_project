import { Divider } from "@chakra-ui/react"
import { Link } from "react-router-dom"


const Footer = () => {
    return (
        <div className="app-footer mt-4">
            <div className="app-footer-teaching container mb-4 flex flex-wrap flex-between gap-4">
                <div className="app-footer-teaching-title">
                    <p className="fs-19 fw-7">Giảng dạy online cho cả thế giới</p>
                    <p className="fs-14">Tạo một khóa học video online, tiếp cận học viên trên toàn cầu và kiếm tiền</p>
                </div>
                <div className="app-footer-teaching-button">
                    <button className="fs-16 border-thin-solid-white p-2 button-teaching">Giảng dạy trên COURSEAN</button>
                </div>
            </div>
            <Divider />
            <div className="app-footer-wrapper mt-4 gap-4 container flex-wrap flex">
                <div className="app-footer-column">
                    <ul>
                        <Link to={'/#'}><li>Coursean Business</li></Link>
                        <Link to={'/#'}><li>Giảng dạy tại Coursean</li></Link>
                        <Link to={'/#'}><li>Giới thiệu</li></Link>
                        <Link to={'/#'}><li>Liên hệ</li></Link>
                    </ul>
                </div>
                <div className="app-footer-column">
                    <ul>
                        <Link to={'/#'}><li>Coursean Business</li></Link>
                        <Link to={'/#'}><li>Giảng dạy tại Coursean</li></Link>
                        <Link to={'/#'}><li>Giới thiệu</li></Link>
                        <Link to={'/#'}><li>Liên hệ</li></Link>
                    </ul>
                </div>
                <div className="app-footer-column">
                    <ul>
                        <Link to={'/#'}><li>Coursean Business</li></Link>
                        <Link to={'/#'}><li>Giảng dạy tại Coursean</li></Link>
                        <Link to={'/#'}><li>Giới thiệu</li></Link>
                        <Link to={'/#'}><li>Liên hệ</li></Link>
                    </ul>
                </div>
            </div>
            <div className="app-footer-note flex mt-6 container flex-between">
                <p className="fs-20 fw-7">COURSEAN</p>
                <p className="fs-12">© 2023 Coursean, Inc.</p>
            </div>
        </div>
    )
}

export default Footer
