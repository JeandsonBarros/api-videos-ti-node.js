const VideoModel = require("../model/Video")

module.exports = class VideoService {

    //Obtém todos os vídeos
    static async getAllVideo(page) {
        try {

            let limit = 10;
            let skip = limit * (page - 1);

            //https://pt.stackoverflow.com/questions/322726/como-implementar-mongoose-paginate-no-node-express
            //https://clmeida.medium.com/mongodb-mongoose-pagina%C3%A7%C3%A3o-nosql-na-m%C3%A3o-227472643c2a
            const videos = await VideoModel.find().skip(skip).limit(limit)
            let count = await VideoModel.find().count()

            console.log(videos);

            return {
                status: 200,
                response: {
                    limit: limit,
                    skip: skip,
                    count: count,
                    data: videos,
                    totalPages: Math.ceil(count / limit)

                }
            }

        } catch (error) {
            return { status: 404, response: "Nada encontrado" }
        }
    }

    static async getBy(page, key, content) {

        try {

            let limit = 10;
            let skip = limit * (page - 1);

            /* 
            const $regex = content
            const videos = await VideoModel.find({[key]: {$regex}}).skip(skip).limit(limit) 
            let count = await VideoModel.find({[key]: {$regex}}).count()
            */

            let response = await VideoModel.find()

            let data = response.filter(item => {
                console.log(content.toLowerCase().includes(item[key].toLowerCase()), "-", item[key], "-", content);
                return (item[key].toLowerCase().includes(content.toLowerCase()) || content.toLowerCase().includes(item[key].toLowerCase()));
            })

            data = data.slice(skip, skip + limit)

            let count = data.length

            return {
                status: 200,
                response: {
                    limit: limit,
                    skip: skip,
                    count: count,
                    data: data,
                    totalPages: Math.ceil(count / limit)

                }
            }

        } catch (error) {
            return { status: 404, response: "Nada encontrado" }
        }
    }

    //Obtém um vídeo
    static async getVideo(id) {
        try {
            const video = await VideoModel.findOne({ _id: id })

            if (!video) {
                return { status: 404, response: "Vídeo não encontrado" }
            }

            return { status: 200, response: video }

        } catch (error) {
            return { status: 404, response: "Vídeo não encontrado" }
        }
    }

    //Salva um vídeo
    static async postVideo(video) {
        try {
            const { name, url, matter, type, channel, thumbnail } = video

            if (!name || !url || !matter || !type || !channel || !thumbnail) {
                return { status: 500, response: "Dados invalidos ou faltando!" }
            }

            const videoSalve = {
                name,
                url,
                matter,
                type,
                channel,
                thumbnail
            }

            await VideoModel.create(videoSalve)
            return { status: 201, response: "Vídeo Salvo" }

        } catch (error) {
            return { status: 500, response: "Erro ao salvar vídeo" }
        }

    }

    //Edita um vídeo
    static async putVideo(id, video) {
        try {

            const asVideo = await VideoModel.findOne({ _id: id })

            if (!asVideo) {
                return { status: 404, response: "Vídeo não encontrada" }
            }

            const { name, url, matter, type, channel, thumbnail } = video

            if (!name || !url || !matter || !type || !channel || !thumbnail) {
                return { status: 500, response: "Dados invalidos ou faltando!" }
            }

            const videoEdit = {
                name,
                url,
                matter,
                type,
                channel,
                thumbnail
            }

            await VideoModel.updateOne({ _id: id }, videoEdit)

            return { status: 201, response: "Vídeo editado" }

        } catch (error) {
            return { status: 500, response: "Erro ao editar vídeo" }
        }

    }

    //Deleta um vídeo
    static async deleteVideo(id) {
        try {

            const asVideo = await VideoModel.findOne({ _id: id })

            if (!asVideo) {
                return { status: 404, response: "Vídeo não encontrada" }
            }

            await VideoModel.deleteOne({ _id: id })

            return { status: 201, response: "Vídeo deletado" }

        } catch (error) {
            return { status: 500, response: "Erro ao deletar vídeo" }

        }

    }



}