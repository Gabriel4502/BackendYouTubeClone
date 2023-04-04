import {Router} from 'express';
import { login } from '../middleware/login';
import { VideoRepository } from '../modules/user/videos/repositories/VideosRepository';

const videosRoutes = Router();
const videoRepository = new VideoRepository();

videosRoutes.post('/create-video', login, (request, response) =>{
    videoRepository.create(request, response);
})

videosRoutes.get('/get-videos', login, (request, response) =>{
    videoRepository.getVideos(request, response);
})

videosRoutes.get('/search', login, (request, response) =>{
    videoRepository.searchVideos(request, response);
})

export {videosRoutes};