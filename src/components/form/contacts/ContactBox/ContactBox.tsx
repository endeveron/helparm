import { ReactElement } from 'react';
import Link from 'next/link';

import './ContactBox.scss';

interface ContactBoxProps {
  link: string;
  icon: ReactElement;
  title?: string;
}

const ContactBox = ({ icon, link, title }: ContactBoxProps) => {
  return (
    <div className="contact-box">
      <Link className="contact-box__link" target="_blank" href={link}>
        <div className="contact-box__icon">{icon}</div>
        {title && <div className="contact-box__title">{title}</div>}
      </Link>
    </div>
  );
};

export { ContactBox };
