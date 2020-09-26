import { Router } from 'express';
import SearchController from '../controllers/search.controller';
import { parsePaginationQuery } from '../middleware/pagination';

const searchRouter = Router();

searchRouter.get('/', parsePaginationQuery, SearchController.getSearchResult);

export default searchRouter;
