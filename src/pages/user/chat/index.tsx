import { useEffect, useState } from 'react'
import { io } from "socket.io-client";
import Layout from "../../../layout"
import { useAuthContext } from '../../../hooks/useAuthContext';
import { apiFindFriends } from '../../../services/UserService';
import useFetch from '../../../hooks/useFetch';
import { apiGetConversation, apiGetConversations } from '../../../services/ConversationService';
import Messages from '../../../components/Messages';


const socket = io("http://localhost:4500");

function Chat() {
  const [count, setCount] = useState("")
  const [conversationId, setConversationId] = useState("")
  const [search, setSearch] = useState("")
  const { token, id } = useAuthContext()
  // const [friends, setFriends] = useState([])

  const { data: friends } = useFetch({
    api: apiFindFriends, 
    key: ['findFriends', search],
    param: search,
    enabled: !!search,
    requireAuth: true
  })

  const { data: conversations } = useFetch({
    api: apiGetConversations, 
    key: ['conversations'],
    param: id,
    requireAuth: true
  })

  // console.log({friends, conversations})

  const handleFindFriend = async () => {
    try {
      // const response = await apiFindFriends(search)
      // const friends = response.data
      // setFriends(friends)
    } catch (error) {
      console.log({error})
    }
  }

  useEffect(() => {
    const socket = io("http://localhost:4500");
    
    const fetchTest = async () => {
      const p = await fetch("http://localhost:4500/ping")
      const r = await p.json()
      console.log({r})

    } 
    fetchTest() 

    socket.on('chat message', (msg) => {
      // console.log(msg)
      setCount(msg)
    });

  

    return () => {
      console.log("running")
      socket.emit("chat message", "remociing o")

      socket.disconnect()
    }
  }, [])


  const handle = () => {
    socket.emit("chat message", "i love you")
  }


  const chatRooms = [
    { id: '1', name: 'General Chat' },
    { id: '2', name: 'Tech Talk' },
    { id: '3', name: 'Designers Lounge' },
    // Add more chat rooms as needed
  ];

  const handleNewChat = async (friendId: string) => {
    console.log([id!, friendId]) 
    try {
      const response = await apiGetConversation(token!, {
        members: [id!, friendId]
      })
      
      const chat = response.data

      console.log({chat})

      setConversationId(chat._id)

    } catch (error) {
      console.log("failed to start chat")
    }
  }

  return (
    <Layout>
      <main className="flex min-h-screen bg-white lg:h-screen">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md max-w-60">
          <h1 className="mb-6 text-3xl font-bold">Welcome to Chat Application</h1>

          {/* Chat Interface */}
          <div className="pb-4 mt-4 border-b-2 border-gray-200">
            {/* Chat Input */}
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Find friend..."
                className="flex-grow px-4 py-2 border rounded-md focus:outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button onClick={handleFindFriend} className="px-4 py-2 ml-2 text-white bg-blue-500 rounded-md">
                Search
              </button>
            </div>
          </div>
          {/* List of Chat Rooms */}
          <div className="my-6">
            <h2 className="mb-4 text-xl font-semibold">Select a Chat Room:</h2>
            <ul className="grid gap-2">
              {conversations?.map((conversation: any) => (
                <li 
                  key={conversation?._id}    
                  className="w-full px-4 py-2 text-white bg-blue-500 rounded-md cursor-pointer"
                  onClick={() => setConversationId(conversation._id)}
                >
                  {
                    conversation?.isGroupChat ?

                    conversation?.name
                    :
                    conversation?.members?.find((con: string) => con !== id)
                  }
                </li>
              ))}
            </ul>
          </div>
          {/* Friend search */}
          <div className="my-6">
            <h2 className="mb-4 text-xl font-semibold">Start Chat:</h2>
            <ul className="grid gap-2">
              {friends?.data?.map((friend: any) => (
                <li 
                  key={friend?._id}    
                  className="w-full px-4 py-2 text-white bg-blue-500 rounded-md cursor-pointer"
                  onClick={() => handleNewChat(friend._id)}
                >
                  {friend.userName}
                </li>
              ))}
            </ul>
          </div>
        </div>
       <Messages conversationId={conversationId} />
      </main>
    </Layout>
  );
};


export default Chat
