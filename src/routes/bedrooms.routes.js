import { Router } from "express"
import { bedroomsController } from "../controllers/index.js"

const bedroomsRouter = Router(); 

bedroomsRouter.get('/', bedroomsController.getAllBedroomsData);
bedroomsRouter.get('/last/', bedroomsController.getLastRecords);
bedroomsRouter.get('/sensor/', bedroomsController.getSensorRecords);
bedroomsRouter.get('/actuator/', bedroomsController.getActuatorRecords);
// bedroomsRouter.get('/', bedroomsController.getAllBedroomsDataByName)
bedroomsRouter.post('/', bedroomsController.createBedroomData);

export default bedroomsRouter