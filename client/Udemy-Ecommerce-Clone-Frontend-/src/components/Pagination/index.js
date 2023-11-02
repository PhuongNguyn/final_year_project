import {
    Previous,
    Paginator,
    PageGroup,
    Page,
    Next,
    generatePages
} from 'chakra-paginator';
import { CgChevronLeft, CgChevronRight } from 'react-icons/cg'

const Pagination = ({ pagesQuantity, handlePageChange }) => {
    console.log(pagesQuantity)
    const normalStyles = {
        bg: 'white'
    };

    const activeStyles = {
        bg: 'blue.300'
    };
    return (
        <div className='flex'>
            <Paginator
                onPageChange={(number) => handlePageChange(number)}
                pagesQuantity={pagesQuantity}>
                <Previous bg="white">
                    <CgChevronLeft />
                </Previous>
                <PageGroup>
                    {generatePages(pagesQuantity)?.map((page) => (
                        <Page
                            key={`paginator_page_${page}`}
                            page={page}
                            normalStyles={normalStyles}
                            activeStyles={activeStyles}
                        />
                    ))}
                </PageGroup>
                <Next bg="white">
                    <CgChevronRight />
                </Next>
            </Paginator>
        </div>
    )
}

export default Pagination