import { Router } from "express"
import { bathroomsController } from "../controllers/index.js"

const bathroomsRouter = Router();

bathroomsRouter.get("/",bathroomsController.getAllBathroomsData);
bathroomsRouter.get("/last/",bathroomsController.getLastRecords);
bathroomsRouter.post("/",bathroomsController.createBathroomData);

export default bathroomsRouter