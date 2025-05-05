import { and, eq } from 'drizzle-orm';
import db from '../db/connection.js';
import { rooms } from '../db/schema.js';
async function getAll(queryParams) {
    const { withPhotos, userId } = queryParams;
    const filters = [];
    if (userId)
        filters.push(eq(rooms.hostId, userId));
    return await db.query.rooms.findMany({
        where: and(...filters),
        with: withPhotos
            ? {
                roomPhotos: {
                    columns: {
                        id: true,
                        photoUrl: true,
                    },
                },
            }
            : undefined,
    });
}
async function getAllActive() {
    return await db.select().from(rooms).where(eq(rooms.isDeleted, false));
}
async function getAllWithPhotos() {
    return await db.query.rooms.findMany({
        limit: 20,
        with: {
            roomPhotos: {
                columns: {
                    id: true,
                    photoUrl: true,
                },
            },
        },
    });
}
function getOne() {
    return 'una room';
}
function addOne() {
    return 'una room añadida';
}
function deleteOne() {
    return 'una room borrada';
}
const roomModel = {
    getAll,
    getAllActive,
    getAllWithPhotos,
    getOne,
    addOne,
    deleteOne,
};
export default roomModel;
