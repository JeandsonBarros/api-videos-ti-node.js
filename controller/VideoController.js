const VideoService = require("../service/VideoService")

module.exports = class VideoController {

    static async apiGetAllVideo(req, res) {
        try {
            const videos = await VideoService.getAllVideo()
            res.status(videos.status).json(videos.response)

        } catch (error) {
            res.status(500).json({ message: "error" })
        }
    }

    static async apiGetVideo(req, res) {
        try {
            req.params.id
            const video = await VideoService.getVideo(req.params.id)
            res.status(video.status).json(video.response)

        } catch (error) {
            res.status(500).json({ message: "error" })
        }
    }

    static async apiPostVideo(req, res) {
        try {
            const video = await VideoService.postVideo(req.body)
            res.status(video.status).json(video.response)

        } catch (error) {
            res.status(500).json({ message: "error" })
        }
    }

    static async apiPutVideo(req, res) {
        try {
            const id = req.params.id
            const video = await VideoService.putVideo(id, req.body)
            res.status(video.status).json(video.response)

        } catch (error) {
            res.status(500).json({ message: "error" })
        }

    }

    static async apiDeleteVideo(req, res) {
        try {
            const id = req.params.id
            const video = await VideoService.deleteVideo(id)
            res.status(video.status).json(video.response)

        } catch (error) {
            res.status(500).json({ message: "error" })
        }
    }
}