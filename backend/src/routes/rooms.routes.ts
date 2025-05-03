import express from 'express';
import roomController from '../controllers/room.controllers';

const roomsRouter = express.Router();

// Todas las rutas que lleguen aquí YA TIENEN /rooms

roomsRouter.get('/', roomController.getAllRooms);

roomsRouter.get('/:roomId', roomController.getOneRoom);

roomsRouter.post('/', roomController.addOneRoom);

roomsRouter.delete('/:roomId', roomController.deleteOneRoom);

export default roomsRouter;
