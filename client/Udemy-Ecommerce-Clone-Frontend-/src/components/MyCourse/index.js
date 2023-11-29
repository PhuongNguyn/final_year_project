import { useSelector } from "react-redux"
import APIService from "../../services"
import { useEffect, useState } from "react"
import CourseItem from "../CourseItem"


const MyCourse = () => {
    const [courses, setCourses] = useState([])

    const getUserCourse = async () => {
        try {
            const api = new APIService()
            const result = await api.getMyCourse()

            setCourses(result.data?.courses)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getUserCourse()
    },[])

    return (
        <div>
            {courses.map(course => {
                return <CourseItem course={course}/>
            })}
        </div>
    )
}

export default MyCourse