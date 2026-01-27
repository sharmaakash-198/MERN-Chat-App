import { useEffect } from "react";
import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";

const Home = () => {
	const { authUser } = useAuthContext();
	const { setSelectedConversation, setMessages } = useConversation();

	useEffect(() => {
		// Reset conversation and messages when user changes
		setSelectedConversation(null);
		setMessages([]);
	}, [authUser, setSelectedConversation, setMessages]);

	return (
		<div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
			<Sidebar />
			<MessageContainer />
		</div>
	);
};
export default Home;
