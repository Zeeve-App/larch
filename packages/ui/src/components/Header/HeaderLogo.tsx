import React from 'react';
import { twMerge } from 'tailwind-merge';

interface HeaderLogoProps {
  logoImgSrc: string;
  logoHref: string;
  className?: string;
  logoImgClassName?: string;
}

const HeaderLogo: React.FC<HeaderLogoProps> = (props) => {
  const {
    logoImgSrc, logoHref, className, logoImgClassName,
  } = props;

  return (
    <a
      className={twMerge('flex flex-row items-center gap-x-2', className)}
      href={logoHref}
    >
      <img
        src={logoImgSrc}
        alt='Larch Logo'
        className={twMerge('', logoImgClassName)}
      />
    </a>
  );
};

export { type HeaderLogoProps, HeaderLogo };
