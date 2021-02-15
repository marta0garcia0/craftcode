import { User } from "./user";

export interface Message {
    sender: User,
    receiver: User,
    text: string,
    date: Date
}