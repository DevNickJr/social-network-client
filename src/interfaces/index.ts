export interface IRegister {
    userName: string
    email: string
    password: string
}

export interface ILogin {
    email: string
    password: string
}

export interface IConversation {
    members: string[]
}

export interface IMessage {
    conversationId: string
    senderId: string
    text: string
}