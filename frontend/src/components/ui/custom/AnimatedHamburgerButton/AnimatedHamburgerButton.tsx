import { motion, MotionConfig } from 'motion/react';
import { twMerge } from 'tailwind-merge';

type AnimatedHamburgerButtonProps = {
  className?: string;
  onClick: () => void;
  isActive: boolean;
};

function AnimatedHamburgerButton(props: AnimatedHamburgerButtonProps) {
  const { className, onClick, isActive, ...rest } = props;

  function handleClick() {
    // setActive((pv) => !pv);
    onClick();
  }

  const classes = twMerge(
    'ml-auto relative z-50 h-20 w-20 rounded-lg transition-colors hover:bg-black/10',
    className
  );
  return (
    <MotionConfig
      transition={{
        duration: 0.2,
        ease: 'easeInOut'
      }}
    >
      <motion.button
        initial={false}
        animate={isActive ? 'open' : 'closed'}
        onClick={handleClick}
        className={classes}
        {...rest}
      >
        <motion.span
          variants={VARIANTS.top}
          className="absolute h-1 w-10 bg-black"
          style={{ y: '-50%', left: '50%', x: '-50%', top: '35%' }}
        />
        <motion.span
          variants={VARIANTS.middle}
          className="absolute h-1 w-10 bg-black"
          style={{ left: '50%', x: '-50%', top: '50%', y: '-50%' }}
        />
        <motion.span
          variants={VARIANTS.bottom}
          className="absolute h-1 w-5 bg-black"
          style={{
            x: '-50%',
            y: '50%',
            bottom: '35%',
            left: 'calc(50% + 10px)'
          }}
        />
      </motion.button>
    </MotionConfig>
  );
}

const VARIANTS = {
  top: {
    open: {
      rotate: ['0deg', '0deg', '45deg'],
      top: ['35%', '50%', '50%']
    },
    closed: {
      rotate: ['45deg', '0deg', '0deg'],
      top: ['50%', '50%', '35%']
    }
  },
  middle: {
    open: {
      rotate: ['0deg', '0deg', '-45deg']
    },
    closed: {
      rotate: ['-45deg', '0deg', '0deg']
    }
  },
  bottom: {
    open: {
      rotate: ['0deg', '0deg', '45deg'],
      bottom: ['35%', '50%', '50%'],
      left: '50%'
    },
    closed: {
      rotate: ['45deg', '0deg', '0deg'],
      bottom: ['50%', '50%', '35%'],
      left: 'calc(50% + 10px)'
    }
  }
};

export default AnimatedHamburgerButton;
