import { Metadata } from 'next';
import Image from 'next/image';

import './share.scss';

export const metadata: Metadata = {
  title: 'QR код – HelpArm',
  description: 'QR код',
};

const Contacts = async () => {
  return (
    <main className="share">
      <div className="share__card appear">
        <Image
          className="share__logo"
          src="/images/share/share-logo.svg"
          width="200"
          height="200"
          alt="Logo"
        />
        <Image
          className="share__qr-code"
          src="/images/share/share-qr.svg"
          width="200"
          height="200"
          alt="QR code"
        />
      </div>
    </main>
  );
};

export default Contacts;
