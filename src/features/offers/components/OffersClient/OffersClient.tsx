'use client';

import { Heading } from 'components/Heading';
import { OfferContainer } from 'features/offers/components/OfferContainer/OfferContainer';

import './OffersClient.scss';

const OffersClient = () => {
  return (
    <div className="offers anim anim-children">
      <Heading as="h1" className="offers__title view-title anim">
        Сервіс оголошень
      </Heading>
      <div className="offers__notification anim">
        Адміністрація порталу не несе відповідальності за контент наданий
        користувачами.
      </div>
      <OfferContainer isFloatButton />
    </div>
  );
};

export { OffersClient };
