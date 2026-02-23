import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const { authUser } = useAuthContext();

	useEffect(() => {
		if (authUser) {
			// const newSocket = io("http://localhost:4000", {
			// 	query: {
			// 		userId: authUser._id,
			// 	},
			// });
			
			const URL =
			import.meta.env.VITE_SOCKET_URL || window.location.origin;
			
			const newSocket = io(URL, {
				query: {
					userId: authUser._id,
				},
			});
			{/* above will be used in production */}
			
			setSocket(newSocket);

			newSocket.on("getOnlineUsers", (users) => {
				setOnlineUsers(users);
			});

			return () => newSocket.close();
		} else {
			setSocket(null);
			setOnlineUsers([]);
		}
	}, [authUser]);

	return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
};
