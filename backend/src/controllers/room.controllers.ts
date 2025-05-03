import { Request, Response } from 'express';
import roomModel from '../models/room.model.js';

async function getAllRooms(req: Request, res: Response) {
  const queryParams = req.query;

  const rooms = await roomModel.getAll(queryParams);

  // let allRooms;

  // if (withPhotos === 'true') {
  //   allRooms = await roomModel.getAllWithPhotos();
  // } else {
  //   allRooms = await roomModel.getAllActive();
  // }

  res.send(rooms);
}

function getOneRoom(req: Request, res: Response) {
  res.send('una room');
}

function addOneRoom(req: Request, res: Response) {
  res.send('una room añadida');
}

function deleteOneRoom(req: Request, res: Response) {
  res.send('una room borrada');
}

const roomController = {
  getAllRooms,
  getOneRoom,
  addOneRoom,
  deleteOneRoom,
};

export default roomController;
