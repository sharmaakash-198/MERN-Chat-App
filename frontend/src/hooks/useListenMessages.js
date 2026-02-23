import { useEffect } from "react";

import { useAuthContext } from "../context/AuthContext";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
	const { socket } = useSocketContext();
	const { authUser } = useAuthContext();
	const { setMessages, selectedConversation } = useConversation();

	useEffect(() => {
		socket?.on("newMessage", (newMessage) => {
			const myId = String(authUser?._id);
			const otherId = selectedConversation ? String(selectedConversation._id) : null;
			const senderId = String(newMessage.senderId);
			const receiverId = String(newMessage.receiverId);

			// Only add to UI if this message belongs to the currently open chat
			const isForCurrentChat =
				otherId &&
				((senderId === myId && receiverId === otherId) || (senderId === otherId && receiverId === myId));

			if (isForCurrentChat) {
				newMessage.shouldShake = true;
				setMessages((prev) => [...prev, newMessage]);
			}

			// Play sound when we receive a message (we are the receiver)
			if (receiverId === myId) {
				const sound = new Audio(notificationSound);
				sound.play();
			}
		});

		return () => socket?.off("newMessage");
	}, [socket, setMessages, authUser?._id, selectedConversation]);
};
export default useListenMessages;
