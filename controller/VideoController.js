const VideoService = require("../service/VideoService")

module.exports = class VideoController {

    static async apiGetAllVideo(req, res) {
        try {

            let page = req.query.page? req.query.page : 1;
          
            const videos = await VideoService.getAllVideo(page)
           
            res.status(videos.status).json(videos.status===200? videos.response : {message: videos.response})

        } catch (error) {
            res.status(500).json({ message: "error" })
        }
    }

    static async apiGetBy(req, res){
        try {

            const key = req.params.key;
            
            const content = req.params.content;

            const page = req.query.page? req.query.page : 1;

            let videos = await VideoService.getBy(page, key, content);
           
            res.status(videos.status).json(videos.status===200? videos.response : {message: videos.response})
            
        } catch (error) {
            res.status(500).json({ message: "error" })
        }

    }

    static async apiGetVideo(req, res) {
        try {
            req.params.id
            const video = await VideoService.getVideo(req.params.id)

            res.status(video.status).json(video.status===200? video.response : {message: video.response})

        } catch (error) {
            res.status(500).json({ message: "error" })
        }
    }

    static async apiPostVideo(req, res) {
        try {
            const video = await VideoService.postVideo(req.body)

            res.status(video.status).json({message: video.response})

        } catch (error) {
            res.status(500).json({ message: "error" })
        }
    }

    static async apiPutVideo(req, res) {
        try {
            const id = req.params.id
            const video = await VideoService.putVideo(id, req.body)

            res.status(video.status).json({message: video.response})

        } catch (error) {
            res.status(500).json({ message: "error" })
        }

    }

    static async apiDeleteVideo(req, res) {
        try {
            const id = req.params.id
            const video = await VideoService.deleteVideo(id)

            res.status(video.status).json({message: video.response})

        } catch (error) {
            res.status(500).json({ message: "error" })
        }
    }
}