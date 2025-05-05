import roomModel from '../models/room.model.js';
async function getAllRooms(req, res) {
    try {
        const queryParams = req.query;
        const rooms = await roomModel.getAll(queryParams);
        res.send(rooms);
    }
    catch (error) {
        console.error('Error in getAllRooms:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
/*
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
*/
function getOneRoom(req, res) {
    res.send('una room');
}
function addOneRoom(req, res) {
    res.send('una room añadida');
}
function deleteOneRoom(req, res) {
    res.send('una room borrada');
}
const roomController = {
    getAllRooms,
    getOneRoom,
    addOneRoom,
    deleteOneRoom,
};
export default roomController;
