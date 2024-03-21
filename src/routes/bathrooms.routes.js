import { Router } from "express"
import { bathroomsController } from "../controllers/index.js"

const bathroomsRouter = Router();

bathroomsRouter.get("/",bathroomsController.getAllBathroomsData);
bathroomsRouter.get("/last/",bathroomsController.getLastRecords);
bathroomsRouter.get("/sensor/",bathroomsController.getSensorRecords);
bathroomsRouter.get("/actuator/",bathroomsController.getActuatorRecords);
bathroomsRouter.post("/",bathroomsController.createBathroomData);

export default bathroomsRouter