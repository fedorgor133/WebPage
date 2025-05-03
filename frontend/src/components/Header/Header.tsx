import { Link } from 'react-router-dom';
import Logo from '../Logo';

import Menu from '../Menu';
import Sidebar from '../Sidebar';
import useToggle from '@/hooks/useToggle';
import AnimatedHamburgerButton from '../ui/custom/AnimatedHamburgerButton';
import { AnimatePresence } from 'motion/react';

function Header() {
  const [isOpenSidebar, toggleSidebar] = useToggle(false);
  return (
    <header className="container flex items-center py-4">
      <Link to="/">
        <Logo className="w-40" />
      </Link>
      <div className="hidden lg:block grow">
        <Menu />
      </div>
      <AnimatedHamburgerButton
        isActive={isOpenSidebar}
        className="lg:hidden"
        onClick={toggleSidebar}
      />
      <AnimatePresence>
        {isOpenSidebar && <Sidebar toggle={toggleSidebar} />}
      </AnimatePresence>
    </header>
  );
}

export default Header;
