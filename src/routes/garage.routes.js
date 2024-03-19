import { Router } from "express"
import { garageController } from "../controllers/index.js"

3
const garageRouter = Router(); 

garageRouter.get('/', garageController.getAllgarageData);
garageRouter.get('/last/', garageController.getLastRecords);
// bedroomsRouter.get('/', bedroomsController.getAllBedroomsDataByName)
garageRouter.post('/', garageController.creategarageData);

export default garageRouter