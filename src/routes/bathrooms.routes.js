import { Router } from "express"
import { bathroomsController } from "../controllers/index.js"
const bathroomsRouter = Router();

bathroomsRouter.get("/",bathroomsController.getAllBathroomsData);
bathroomsRouter.post("/",bathroomsController.createBathroomData);

export default bathroomsRouter