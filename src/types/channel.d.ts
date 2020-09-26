import { UserDTO } from "./user";

export interface ChannelDTO {
  id: string;
  name: string;
  description: string;
  coverImageUrl?: string;
  imageUrl?: string;
  createdBy: string;
  updatedBy: string;
  ownerId: string;
}

export interface ChannelSubcriptionDTO {
  id: string;
  channel: ChannelDTO;
  user: UserDTO;
  createdBy: string;
  updatedBy: string;
}
