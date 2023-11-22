import BaseService from "./BaseService"

const servicePrefix = "/users"

const Auth = (token: string) => ({
    headers: {
        Authorization: `Bearer ${token}`
    }
})


export const apiFindFriends = (token: string, search: string) => {
    return BaseService.get(`${servicePrefix}/find?search=${search}`, Auth(token))
}

export const apiFindConversation = (token: string, id: string) => {
    return BaseService.get(`${servicePrefix}/find?search=${id}`, Auth(token))
}

