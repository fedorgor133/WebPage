import { Room } from '@/config/types';
import RoomItem from '../RoomItem';
import { motion } from 'motion/react';

type RoomsGridProps = {
  rooms: Room[];
};

function RoomsGrid(props: RoomsGridProps) {
  const { rooms } = props;
  
  // Ensure rooms is always an array before trying to map
  if (!Array.isArray(rooms)) {
    return <div>No rooms available</div>; // Handle error scenario
  }

  const gridVariants = {
    hidden: {}, // Estado inicial vacío porque no animamos el padre
    show: {
      transition: {
        staggerChildren: 0.3 // Retraso de 0.3 segundos entre los hijos
      }
    }
  };

  return (
    <motion.div
      variants={gridVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
    >
      {rooms.map((room) => (
        <RoomItem key={room.id} room={room} />
      ))}
    </motion.div>
  );
}


export default RoomsGrid;
