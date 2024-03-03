import { Router } from "express"
import { bedroomsController } from "../controllers/index.js"

const bedroomsRouter = Router(); 

bedroomsRouter.get('/', bedroomsController.getAllBedroomsData)
bedroomsRouter.get('/?location', bedroomsController.getAllBedroomsDataByName)

export default bedroomsRouter