import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { AiFillPlayCircle } from 'react-icons/ai'

const ModalCourse = ({ isOpen, onOpen, onClose, courses }) => {
    const [selectedCourse, setSelectedCourse] = useState()
    useEffect(() => {
        setSelectedCourse(courses[0])
    }, [courses])
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent bg={'#1C1D1F'}>
                <ModalHeader color="white">Xem trước khoá học</ModalHeader>
                <ModalCloseButton color="white" />
                <ModalBody>
                    <div className='single-course-list'>
                        <iframe width="100%" height="auto" src={`https://www.youtube.com/embed/${selectedCourse?.videoUrl}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                        <p className='single-course-list-title text-white mb-4 mt-2'>Video mẫu miễn phí: </p>
                        {courses.map(course => {
                            return <div onClick={() => setSelectedCourse(course)} className={`single-course-item text-white pointer ${selectedCourse?.id == course.id ? 'single-course-item-active' : ""}`}>
                                <p className='flex fw-6 gap-2 px-2 py-2'><AiFillPlayCircle size={22} /> <span>{course?.name}</span></p>
                            </div>
                        })}
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ModalCourse