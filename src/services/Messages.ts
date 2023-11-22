import { IConversation, IMessage } from "../interfaces"
import BaseService from "./BaseService"

const servicePrefix = "/messages"

const Auth = (token: string) => ({
    headers: {
        Authorization: `Bearer ${token}`
    }
})


export const apiGetMessages = (token: string, conversationId: string) => {
    return BaseService.get(`${servicePrefix}/${conversationId}`, Auth(token))
}

export const apiSendMessage = (data: IMessage, token: string) => {
    return BaseService.post(`${servicePrefix}`, data, Auth(token))
}

