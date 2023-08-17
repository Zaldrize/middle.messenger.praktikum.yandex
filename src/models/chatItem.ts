import { userInfo } from "./user";

export default class ChatItem 	
  {
    id: number;
    title: string;
    avatar: string;
    unread_count: number;
    last_message: {
      user: userInfo,
      time: Date,
      content: string
    }
  }
