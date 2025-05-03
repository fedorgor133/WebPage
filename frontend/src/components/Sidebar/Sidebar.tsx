import { motion } from 'motion/react';

import Menu from '../Menu';

type SidebarProps = {
  toggle: () => void;
};

function Sidebar(props: SidebarProps) {
  const { toggle } = props;

  return (
    <div className="lg:hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.2 }}
        className="fixed inset-0 z-10 bg-black/50"
      />
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.3 }}
        className="fixed right-0 z-20 top-0 h-screen w-1/2 bg-white"
      >
        <Menu vertical toggle={toggle} />
      </motion.div>
    </div>
  );
}

export default Sidebar;
