import Button from '@/components/ui/custom/Button';
import { NavLink } from 'react-router-dom';

function LateralMenu() {
  return (
    <nav className="*:whitespace-nowrap flex flex-col gap-2">
      <NavLink className="group" to="/user/dashboard">
        <Button className="text-left w-full border-none group-[.active]:bg-cyan-600 group-[.active]:text-white group-[.active]:border-cyan-600 group-[.active]:hover:bg-cyan-700 group-[.active]:active:bg-cyan-500">
          Dashboard
        </Button>
      </NavLink>
      <NavLink className="group" to="/user/rooms">
        <Button className="text-left w-full border-none group-[.active]:bg-cyan-600 group-[.active]:text-white group-[.active]:border-cyan-600 group-[.active]:hover:bg-cyan-700 group-[.active]:active:bg-cyan-500">
          Rooms Management
        </Button>
      </NavLink>
      <NavLink className="group" to="/user/availability">
        <Button className="text-left w-full border-none group-[.active]:bg-cyan-600 group-[.active]:text-white group-[.active]:border-cyan-600 group-[.active]:hover:bg-cyan-700 group-[.active]:active:bg-cyan-500">
          Room Availability
        </Button>
      </NavLink>
      <NavLink className="group" to="/user/requests">
        <Button className=" text-left w-full border-none group-[.active]:bg-cyan-600 group-[.active]:text-white group-[.active]:border-cyan-600 group-[.active]:hover:bg-cyan-700 group-[.active]:active:bg-cyan-500">
          Booking Requests
        </Button>
      </NavLink>
    </nav>
  );
}

export default LateralMenu;
