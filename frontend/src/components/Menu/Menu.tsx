import { Link, NavLink } from 'react-router-dom';
import Button from '../ui/custom/Button';
import useUserContext from '@/hooks/useUserContext';
import { FaRegUser } from 'react-icons/fa';
import { GiAllSeeingEye } from 'react-icons/gi';
import { GiCoins } from 'react-icons/gi';
import HoverBox from '../HoverBox';
import { twMerge } from 'tailwind-merge';

type MenuProps = {
  vertical?: boolean;
  toggle?: () => void;
};

function Menu({ vertical, toggle }: MenuProps) {
  const { user, logOut } = useUserContext();

  const userIconMap = {
    guest: <FaRegUser />,
    host: <GiCoins />,
    admin: <GiAllSeeingEye />
  };

  const verticalClasses =
    'flex-col h-full text-4xl justify-center items-center';
  const defaultClasses = `flex gap-6 items-center grow *:text-gray-400 *:font-semibold *:text-sm [&_*.active]:text-gray-600`;

  const classes = twMerge(defaultClasses, vertical ? verticalClasses : '');

  return (
    <nav className={classes}>
      <NavLink
        onClick={toggle}
        to="/"
        className={`${!vertical ? 'ml-auto' : ''}`}
      >
        Home
      </NavLink>
      <NavLink onClick={toggle} to="/about">
        About Us
      </NavLink>

      {!user && (
        <NavLink
          onClick={toggle}
          to="/login"
          className={`${!vertical ? 'ml-auto' : ''}`}
        >
          Log In
        </NavLink>
      )}
      {!user && (
        <NavLink onClick={toggle} to="/signup">
          Register
        </NavLink>
      )}

      <Link onClick={toggle} to="/#rent">
        <Button className="text-base text-gray-600">Rent a Room</Button>
      </Link>

      {user && (
        <HoverBox
          position="bottom"
          boxContent={
            <div className="flex flex-col items-center gap-3">
              <Link onClick={toggle} to="/user/dashboard">
                Dashboard
              </Link>
              <Button onClick={logOut} className="m-0 border-none">
                Log Out
              </Button>
            </div>
          }
        >
          <Button className="flex items-center gap-2" filled>
            {userIconMap[user.role]}
            {user.name}
          </Button>
        </HoverBox>
      )}
    </nav>
  );
}

export default Menu;
