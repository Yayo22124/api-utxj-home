import { Router } from "express"
import { bedroomsController } from "../controllers/index.js"

const bedroomsRouter = Router(); 

bedroomsRouter.get('/', bedroomsController.getAllBedroomsData)
bedroomsRouter.get('/:name', bedroomsController.getOneBedroomByName)

export default bedroomsRouter