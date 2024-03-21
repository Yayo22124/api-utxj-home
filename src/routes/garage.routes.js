import { Router } from "express"
import { garageController } from "../controllers/index.js"

3
const garageRouter = Router(); 

garageRouter.get('/', garageController.getAllgarageData);
garageRouter.get('/last/', garageController.getLastRecords);
garageRouter.get('/sensor/', garageController.getSensorRecords);
garageRouter.get('/actuator/', garageController.getActuatorRecords);
// bedroomsRouter.get('/', bedroomsController.getAllBedroomsDataByName)
garageRouter.post('/', garageController.creategarageData);

export default garageRouter