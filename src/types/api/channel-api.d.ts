import { ChannelDTO } from '../dto/channel';

export interface CreateChannelResponse {
  message: string;
  channel: ChannelDTO;
}

export interface UpdateChannelResponse {
  message: string;
  channel: ChannelDTO;
}

export interface GetChannelByIdResponse {
  channel: ChannelDTO;
}
export interface GetAllChannelResponse {
  channels: ChannelDTO[];
  count: number;
}

export interface DeleteChannelResponse {
  message: string;
}
