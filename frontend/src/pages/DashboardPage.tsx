import Heading from '@/components/ui/custom/Heading';
import Text from '@/components/ui/custom/Text';
import useUserContext from '@/hooks/useUserContext';

function DashboardPage() {
  const { user } = useUserContext();
  return (
    <div>
      <Heading>Welcome back, {user?.name}</Heading>
      <Text>Track, manage and forecast your properties</Text>
    </div>
  );
}

export default DashboardPage;
