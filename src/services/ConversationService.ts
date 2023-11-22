import { IConversation } from "../interfaces"
import BaseService from "./BaseService"

const servicePrefix = "/conversations"

const Auth = (token: string) => ({
    headers: {
        Authorization: `Bearer ${token}`
    }
})


export const apiGetConversation = (token: string, data: IConversation) => {
    return BaseService.post(`${servicePrefix}/retrieve`, data, Auth(token))
}

export const apiGetConversations = (token: string, id: string) => {
    return BaseService.get(`${servicePrefix}/${id}`, Auth(token))
}

