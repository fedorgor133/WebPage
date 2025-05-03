import { ComponentProps } from 'react';
import logoImg from '../../assets/img/room-seekers-logo.png';

type LogoProps = {
  className?: string;
} & ComponentProps<'img'>;

function Logo(props: LogoProps) {
  const { className, ...rest } = props;

  return (
    <>
      <img
        className={className}
        src={logoImg}
        alt="Logo de Rooms Seeker"
        {...rest}
      />
    </>
  );
}

export default Logo;
