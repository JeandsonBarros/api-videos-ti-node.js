const VideoModel = require("../model/Video")

module.exports = class VideoService {

    //Obtém todos os vídeos
    static async getAllVideo() {
        try {
            const videos = await VideoModel.find()
            return { status: 200, response: videos }

        } catch (error) {
            return { status: 404, response: "Nada encontrado" }
        }
    }

    //Obtém um vídeo
    static async getVideo(id) {
        try {
            const video = await VideoModel.findOne({ _id: id })

            if(!video){
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
            const { name, url, matter, type, channel } = video

            if (!name || !url || !matter || !type || !channel) {
                return { status: 500, response: "Dados invalidos ou faltando!" }
            }

            const videoSalve = {
                name,
                url,
                matter,
                type,
                channel
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
    
            const { name, url, matter, type, channel } = video
    
            if (!name || !url || !matter || !type || !channel) {
                return { status: 500, response: "Dados invalidos ou faltando!" }
            }
    
            const videoEdit = {
                name,
                url,
                matter,
                type,
                channel
            }
    
            await VideoModel.updateOne({_id:id}, videoEdit)
    
            return { status: 201, response: "Vídeo editado" }
    
        } catch (error) {
            return { status: 500, response: "Erro ao editar vídeo" }
        }

    }

    //Deleta um vídeo
    static async deleteVideo(id){
        try {

            const asVideo = await VideoModel.findOne({ _id: id })
    
            if (!asVideo) {
                return { status: 404, response: "Vídeo não encontrada" }
            }
    
            await VideoModel.remove({_id:id})

            return { status: 201, response: "Vídeo deletado" }
    
        } catch (error) {
            return { status: 500, response: "Erro ao deletar vídeo" }
            
        }

    }

    

}