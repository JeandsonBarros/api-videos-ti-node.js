const router = require("express").Router()
const VideoController = require("../controller/VideoController")

router.get("/", VideoController.apiGetAllVideo)
router.get("/:id", VideoController.apiGetVideo)
router.post("/", VideoController.apiPostVideo)
router.put("/:id", VideoController.apiPutVideo)
router.delete("/:id", VideoController.apiDeleteVideo)
router.get("/find-by/:key/:content", VideoController.apiGetBy)

module.exports = router
