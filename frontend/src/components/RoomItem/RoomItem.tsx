import { motion } from 'motion/react';
import { Room, RoomWithPhotos } from '@/config/types';

type RoomItemProps = {
  room: Room | RoomWithPhotos;
};

function RoomItem(props: RoomItemProps) {
  const { room } = props;

  // console.log(room);
  const roomVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 }, // Estado inicial
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5 } // Duración de cada animación
    }
  };

  return (
    <motion.div
      variants={roomVariants}
      className="rounded-lg overflow-hidden  shadow-lg"
    >
      {'roomPhotos' in room && (
        <div className="aspect-square">
          <img
            className="w-full h-full object-cover"
            src={room.roomPhotos[0].photoUrl}
            alt="Photo of the room"
          />
        </div>
      )}
      <div className="p-4">
        <h3 className="text-md font-bold">
          {room.title.split(' ').slice(0, 3).join(' ')}
        </h3>
        <p className="text-sm mt-2">{room.location}</p>
        <div className="flex gap-2 justify-between mt-2">
          <p className="text-sm">{room.pricePerNight} € / night</p>
          <p className="text-sm">Max. {room.maxGuests} guests</p>
        </div>
      </div>
    </motion.div>
  );
}

export default RoomItem;
