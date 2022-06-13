const router = require("express").Router()
const videoModel = require("../model/Video")

//Obtém todos os videos
router.get("/", async (req, res) => {

    try {
        const videos = await videoModel.find()
        res.status(200).json(videos)

    } catch (error) {
        res.status(404).json({ message: "Nada encontrado" })
    }


})

//Obtém um video
router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id

        const video = await videoModel.findOne({_id:id})

        res.status(200).json(video)

    } catch (error) {
        res.status(404).json({message : "Vídeo não encontrado"})
    }
})

//Salva um video
router.post("/", async (req, res) => {

    try {
        const { name, url, matter, type } = req.body

        if (!name || !url || !matter || !type) {
            res.status(500).json({ message: "Dados invalidos ou faltando! " })
            return
        }

        const videos = {
            name,
            url,
            matter,
            type
        }

        await videoModel.create(videos)
        res.status(201).json({ message: "Video Salvo" })

    } catch (error) {
        res.status(500).json({ error: "Erro ao salvar video" })
    }
})

//Edita um video
router.put("/:id", async (req, res) => {

    try {

        const id = req.params.id

        const asVideo = await videoModel.findOne({ _id: id })

        if (!asVideo) {
            res.status(404).json({ message: "Vídeo não encontrada" })
            return
        }

        const { name, url, matter, type } = req.body

        if (!name || !url || !matter || !type) {
            res.status(500).json({ message: "Dados invalidos ou faltando!" })
            return
        }

        const video = {
            name,
            url,
            matter,
            type
        }

        await videoModel.updateOne({_id:id}, video)

        res.status(201).json({ message: "Vídeo editado" })

    } catch (error) {
        res.status(500).json({ message: "Erro ao editar vídeo" })
    }
})

//Deleta um video
router.delete("/:id", async (req, res) => {
    try {

        const id = req.params.id

        const asVideo = await videoModel.findOne({ _id: id })

        if (!asVideo) {
            res.status(404).json({ message: "Vídeo não encontrada" })
            return
        }

        await videoModel.remove({_id:id})

        res.status(201).json({ message: "Vídeo deletado" })

    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar vídeo" })
    }
})

module.exports = router;

