import RoomsGrid from '@/components/RoomsGrid';
import Heading from '@/components/ui/custom/Heading';
import { RoomWithPhotos } from '@/config/types';
import useRooms from '@/hooks/useRooms';
import HeroSection from '@/layouts/HeroSection';

function HomePage() {
  const { rooms, isLoading, error } = useRooms<RoomWithPhotos>({
    withPhotos: true
  });

  return (
    <div className="mt-8">
      <HeroSection />

      <section className="my-16">
        <Heading as="h2" className="mb-12">
          Reserve the Finest Rooms
        </Heading>

        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          <RoomsGrid rooms={rooms} />
        )}
      </section>
    </div>
  );
}

export default HomePage;
