import React, { useState } from 'react'
import useFetch from '../../hooks/useFetch'
import { apiGetMessages, apiSendMessage } from '../../services/Messages'
import { useAuthContext } from '../../hooks/useAuthContext'
import { IMessage } from '../../interfaces'
import useMutation from '../../hooks/useMutation'

interface IProps {
    conversationId: string
}

const Messages = ({ conversationId }: IProps) => {
  const { token, id } = useAuthContext()
  const [text, setText] = useState("")

  const { data: messages, refetch } = useFetch({
    api: apiGetMessages, 
    key: ['messages', conversationId],
    param: conversationId,
    requireAuth: true
  })

  const sendMessageMutation = useMutation(apiSendMessage, {
    onSuccess: () => {
      setText("")
      refetch()
    },
  })

  const sendMessage = () => {
    sendMessageMutation.mutate({
      conversationId,
      senderId: id!,
      text
    })
  }

  
  return (
    <div className="flex flex-1">
          {conversationId ? 
            <div className='flex flex-col flex-1'>
              <h1 className='text-xl font-semibold text-center'>
                chat {conversationId} is active
              </h1>
              <div className="flex flex-col justify-between flex-1 gap-1 bg-gray-200">
                <div className='flex flex-col flex-1 gap-1'>
                  {
                    messages?.map((message: IMessage) => 
                    <div className={`flex flex-col w-fit ${message.senderId == id && "self-end"}`}>
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