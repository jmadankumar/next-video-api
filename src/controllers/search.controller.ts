import { Request, Response } from 'express';
import { wrapAsyncError } from '../helper/error';
import ChannelService from '../service/channel.service';
import VideoService from '../service/video.service';
import { ChannelDTO } from '../types/channel';
import { VideoDTO } from '../types/video';

interface SearchResultResponse {
  channels: ChannelDTO[];
  videos: VideoDTO[];
}

interface SearchResultRequestQuery {
  query: string;
  offset: number;
  limit: number;
}

const getSearchResult = wrapAsyncError(
  async (
    req: Request<null, null, null, SearchResultRequestQuery>,
    res: Response<SearchResultResponse>,
  ) => {
    const { query, offset, limit } = req.query;
    const channels = await ChannelService.getAllChannel({ query, offset: 0, limit: 3 });
    const videos = await VideoService.getAllVideo({ query, offset, limit });
    res.status(200).json({
      channels,
      videos,
    });
  },
);

const SearchController = {
  getSearchResult,
};

export default SearchController;
