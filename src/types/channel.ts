export type ChannelType = "CITY" | "COMPANY" | "LOCATION" | "UNIVERSITY" | "SEASON";

export interface Channel {
  id: string;
  name: string;
  type: ChannelType;
  parentId?: string;
  children?: Channel[];
}

export interface Message {
  id: string;
  content: string;
  userId: string;
  userName: string;
  userAvatar: string;
  timestamp: Date;
  channelId: string;
}

export interface ChannelGroup {
  location: string;
  companies: {
    name: string;
    channels: Channel[];
  }[];
}