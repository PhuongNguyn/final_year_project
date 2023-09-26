import { Spinner } from "@chakra-ui/react"
import styled from "styled-components"


const Loading = () => {
    return (
        <BlurGlass><div className="blur-glass">
            <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
            />
        </div></BlurGlass>
    )
}

export default Loading

const BlurGlass = styled.div`
    .blur-glass{
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: rgba(0,0,0,0.2);
        display: flex;
        justify-content:center;
        align-items: center;
        z-index: 1;
    }
`