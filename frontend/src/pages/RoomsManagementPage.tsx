import Heading from '@/components/ui/custom/Heading';
import useRooms from '@/hooks/useRooms';
import useUserContext from '@/hooks/useUserContext';

function RoomsManagementPage() {
  const { user } = useUserContext();

  const { rooms } = useRooms({ withPhotos: true, userId: user?.id });
  console.log(rooms);

  return (
    <div>
      <Heading>Your Rooms</Heading>
    </div>
  );
}

export default RoomsManagementPage;
