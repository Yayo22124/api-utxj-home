import { Router } from "express"
import { kitchensController } from "../controllers/index.js"

const kitchenRouter = Router(); 

kitchenRouter.get('/', kitchensController.getAllkitchensData);
kitchenRouter.get('/last/', kitchensController.getLastRecords);
kitchenRouter.get('/sensor/', kitchensController.getSensorRecords);
kitchenRouter.get('/actuator/', kitchensController.getActuatorRecords);
kitchenRouter.post('/', kitchensController.createkitchenData);

export default kitchenRouter; 