import { pool } from '../../../../mysql';
import {v4 as uuidv4} from 'uuid';
import {hash, compare} from 'bcrypt';
import {sign} from 'jsonwebtoken';
import { Request, Response } from 'express';

class VideoRepository {

    create(request: Request, response: Response){
    const {title, description, user_id, imageUrl} = request.body;
    pool.getConnection((err: any, connection : any) =>{
        connection.query(
            'INSERT INTO videos (video_id, user_id, title, description, imageUrl ) VALUES (?, ?, ?, ?, ?)',
            [uuidv4(), user_id, title, description, imageUrl],
            (error: any, result: any, fields: any) =>{
                connection.release();
                if (error){
                    return response.status(400).json({error: 'Erro ao cadastrar video'})
                }
                response.status(200).json({message: 'Video criado com sucesso'});
            }
        )
        })
    }

    getVideos(request: Request, response: Response){
        const {user_id} = request.query;
        pool.getConnection((err: any, connection : any) =>{
            connection.query(
                'SELECT * FROM videos WHERE user_id = ?',
                [user_id],
                (error: any, results: any, fields: any) =>{
                    connection.release();
                    if (error){
                        return response.status(400).json({error: "Erro ao buscar os videos!"})
                    }
                    return response.status(200).json({message: 'Videos retornados com sucesso', videos: results})
                }
            )
        })
    }

    getAllVideos(request: Request, response: Response){
        pool.getConnection((err: any, connection: any) =>{
            connection.query(
                'SELECT name, title, description, imageUrl, data_Upload, views FROM videos  JOIN users on videos.user_id = users.user_id',
                (error: any, results: any, fields: any)=>{
                    connection.release();
                    if (error){
                        return response.status
                    }
                    return response.status(200).json({message: 'Videos retornados', results})

                }
            )
        })
    }

    searchVideos(request: Request, response: Response){
        const search = request.query.search;
        pool.getConnection((err: any, connection : any) =>{
            connection.query(
                'SELECT * FROM videos WHERE title LIKE?',
                [ `%${search}%` ],
                (error: any, results: any, fields: any) =>{
                    connection.release();
                    if (error){
                        return response.status(400).json({error: "Erro ao buscar os videos!"})
                    }
                    return response.status(200).json({message: 'Videos retornados com sucesso', videos: results})
                }
            )
        })
    }

}

export { VideoRepository}