import { Metadata } from 'next';

import { CreateOfferClient } from 'features/offers/components/CreateOfferClient/CreateOfferClient';

export const metadata: Metadata = {
  title: 'Нове оголошення – HelpArm',
  description: 'Нове оголошення',
};

const Offers = () => <CreateOfferClient />;

export default Offers;
