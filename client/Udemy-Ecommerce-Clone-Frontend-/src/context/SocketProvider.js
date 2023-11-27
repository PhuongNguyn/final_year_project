import * as React from 'react';
import io from 'socket.io-client'

const SocketContext = React.createContext({});

export const useSocket = () => {
    return React.useContext(SocketContext).socket
};

const SocketProvider = ({token, children, user}) => {
    const [socket, setSocket] = React.useState();

    let newSocket;

    React.useEffect(() => {
        if (token) {

            const params = {token};
            const options = {query: params, transports: ['websocket']};
            newSocket = io(`http://localhost:3005`, options);
            newSocket.on("connect", () => {
                console.log('Socket is connected')
            })

            // SOCKET APP GLOBAL STATE
            setSocket(newSocket);
        }
    }, [token, user]);

    return (
        <SocketContext.Provider
            value={socket}>{children}
        </SocketContext.Provider>
    )
};

export default SocketProvider;