import { Router } from 'express';
import {
  createWatchHistory,
  deleteWatchHistory,
  getAllWatchHistory,
  getWatchHistoryById,
  updateWatchHistory,
} from '../controllers/watch-history.controller';

const watchHistoryRouter = Router();

watchHistoryRouter.get('/', getAllWatchHistory);

watchHistoryRouter.get('/:id', getWatchHistoryById);

watchHistoryRouter.post('/', createWatchHistory);

watchHistoryRouter.put('/:id', updateWatchHistory);

watchHistoryRouter.delete('/:id', deleteWatchHistory);

export default watchHistoryRouter;
