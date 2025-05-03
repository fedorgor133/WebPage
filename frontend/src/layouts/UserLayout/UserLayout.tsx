import LateralMenu from '@/components/LateralMenu';
import { Outlet } from 'react-router-dom';

function UserLayout() {
  return (
    <div className="grid lg:grid-cols-[min-content_1fr] gap-8 relative my-8">
      <LateralMenu />
      <Outlet />
    </div>
  );
}

export default UserLayout;
