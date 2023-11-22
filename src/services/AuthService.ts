import { ILogin, IRegister } from "../interfaces"
import BaseService from "./BaseService"

const servicePrefix = "/auth"

export const apiRegister =  (data: IRegister) => {
    return BaseService.post(`${servicePrefix}/signup`, data)
}

export const apiLogin =  (data: ILogin) => {
    return BaseService.post(`${servicePrefix}/signin`, data)
}
