import React from 'react';
import Image from 'next/image';

const Header = () => (
  <header className="bg-black text-white flex items-center p-4">
    <div className="flex-shrink-0">
      <Image src="../../public/icon.svg" alt="Powderlogo" width={48} height={48} />
    </div>
  </header>
);

export default Header;
