import { Metadata } from 'next';

import { OffersClient } from 'features/offers/components/OffersClient/OffersClient';

export const metadata: Metadata = {
  title: 'Сервіс оголошень – HelpArm',
  description: 'Сервіс оголошень',
};

const Offers = () => <OffersClient />;

export default Offers;
