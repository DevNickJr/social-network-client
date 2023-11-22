import { ReactNode, Reducer, createContext, useEffect, useReducer } from "react";


const user = sessionStorage.getItem("user") 

export interface IUser {
    id: string | undefined
    token: string | null
    role: string | undefined
}
interface IAuthContext {
    id: string | undefined
    isLoggedIn: boolean
    token: string | null
}


const initialState: IAuthContext = user ? JSON.parse(user) : {
    id: "",
    isLoggedIn: false,
    token: ''
};

type IActionType = "LOGIN" | "LOGOUT"
interface IAction {
    type: IActionType
    payload: IUser
}
interface IAuthContextProvider extends IAuthContext {
    dispatch: React.Dispatch<IAction>
}

const initAuthContext: IAuthContextProvider = {
    id: '',
    isLoggedIn: false,
    token: '',
    dispatch: (): void => {}
}
export const AuthContext = createContext<IAuthContextProvider>(initAuthContext)


// export const AuthContext = createContext(initialState)

const authReducer = (state: IAuthContext, action: IAction) => {
    switch (action.type) {
        case "LOGIN":
            sessionStorage.setItem("user", JSON.stringify(action.payload))
            return {
                id: action.payload.id,
                isLoggedIn: true,
                token: action.payload.token
            }
        case "LOGOUT":
            sessionStorage.setItem("user", '')
            return {
                id: action.payload.id,
                isLoggedIn: false,
                token: ''
            }
        default:
            return state
    }
}

export const AuthContextProvider = ({children}: { children: ReactNode }) => {
    // const [state, dispatch] = useReducer(authReducer, initialState)
    const [state, dispatch] = useReducer<Reducer<IAuthContext, IAction>>(authReducer, initialState)


    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem("user")!)
        if (user) {
            dispatch({type: "LOGIN", payload: user})
        }
    }, [dispatch])
    
    // console.log("Auth State", state)
    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}