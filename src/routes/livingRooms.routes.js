import { Router } from "express";

export const livingRoomsRouter = {}

livingRoomsRouter.get('/', livingRoomsController.getAll);
livingRoomsRouter.get('/:_id', livingRoomsController.getOne);
livingRoomsRouter.post('/', livingRoomsController.insertOne);
livingRoomsRouter.put('/:_id', livingRoomsController.updateOne);
livingRoomsRouter.delete('/:_id', livingRoomsController.deleteOne);