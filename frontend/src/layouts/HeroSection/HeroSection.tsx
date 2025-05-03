import SearchForm from '@/components/SearchForm';
import Heading from '@/components/ui/custom/Heading';
import Text from '@/components/ui/custom/Text';

import heroImg from '@/assets/img/hero-image.jpg';
import DataCounter from '@/components/DataCounter';

function HeroSection() {
  return (
    <div className="grid lg:grid-cols-[3fr_2fr] relative">
      <div>
        <Heading variant="primary" className="lg:mt-16">
          Find Your Future
        </Heading>
        <Heading className="mb-6">Dream Accommodation</Heading>
        <Text>
          Want to find an accommodation? We are ready to help you find one that
          suits your lifestyle and needs.
        </Text>
        <div className="flex gap-12 my-8">
          <DataCounter count={4235} label="Rooms" plusIcon />
          <DataCounter count={535} label="Reservation/Semester" plusIcon />
          <DataCounter count={19905} label="Students" plusIcon />
        </div>
      </div>

      <div className="h-64 lg:h-auto rounded overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={heroImg}
          alt="hero-image"
        />
      </div>

      <SearchForm />
    </div>
  );
}

export default HeroSection;
