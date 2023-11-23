import React, { useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import { apiGetMessages, apiSendMessage } from '../../services/Messages'
import { useAuthContext } from '../../hooks/useAuthContext'
import { IMessage } from '../../interfaces'
import useMutation from '../../hooks/useMutation'
import { Socket } from 'socket.io-client'

interface IProps {
    conversationId: string
    socket: Socket
}

let currentConversationId = ''

const Messages = ({ conversationId, socket }: IProps) => {
  const { token, id } = useAuthContext()
  const [text, setText] = useState("")
  const [messages, setMessages] = useState<IMessage[]>([])


  const { data, refetch } = useFetch({
    api: apiGetMessages, 
    key: ['messages', conversationId],
    param: conversationId,
    requireAuth: true,
    onSuccess: (data) => {
      if (currentConversationId != conversationId) {
        setMessages(data)
        currentConversationId = conversationId
      }
    }
  })

  // console.log({ messages })

  const sendMessageMutation = useMutation(apiSendMessage, {
    onSuccess: () => {
      setText("")
      // refetch()
    },
  })

  useEffect(() => {
    const handleMessage = (message: IMessage) => {
      console.log("new message from", message)
      if (message.conversationId !== conversationId) {
        /// send notification
      }
      console.log("setting message", message.conversationId, message.text)
      setMessages(prev => {
        console.log("setting message for socket", message.text)
        return [...prev, message]})
    }

    socket.on("new message", handleMessage)

    return () => {
      socket.off('new message', handleMessage);
    };
  }, [])

  const sendMessage = () => {
    const data = {
      conversationId,
      senderId: id!,
      text
    }
    sendMessageMutation.mutate(data)
    socket.emit("new message", data)
  }

  
  return (
    <div className="flex flex-1">
          {conversationId ? 
            <div className='flex flex-col flex-1'>
              <h1 className='text-xl font-semibold text-center'>
                chat {conversationId} is active
              </h1>
              <div className="flex flex-col justify-between flex-1 gap-1 bg-gray-200">
                <div className='flex flex-col flex-1 gap-1 overflow-scroll'>
                  {
                    messages?.map((message: IMessage, index) => 
                    <div key={index} className={`flex flex-col w-fit ${message.senderId == id && "self-end"}`}>
                        {message.text}
                      </div>
                    )
                  }
                </div>
                <div className="flex gap-2 py-2 bg-gray-400">
                  <input 
                    type="text" 
                    placeholder='enter message' 
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                  <button onClick={sendMessage}>Send</button>
                </div>
              </div>
            </div>
            :
            <div className="flex items-center justify-center flex-1 bg-gray-200">
                <p>No chats yet</p>
            </div>
          }          
        </div>
  )
}

export default Messages