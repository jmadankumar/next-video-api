import { UserDTO } from './user';
import { VideoDTO } from './video';

export interface ChannelDTO {
  id?: string;
  name: string;
  description?: string;
  coverImageUrl?: string;
  imageUrl?: string;
  createdBy: string;
  updatedBy: string;
  ownerId: string;
  videos?: VideoDTO[];
  totalVideo?: number;
  subscribers?: number;
}

export interface ChannelSubcriptionDTO {
  id: string;
  channel: ChannelDTO;
  user: UserDTO;
  createdBy: string;
  updatedBy: string;
}
