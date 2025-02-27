'use client';

import { useRouter } from 'next/navigation';

import { Button } from 'components';
import { Heading } from 'components/Heading';
import { PromoBox } from 'components/promo/PromoBox/PromoBox';

import './OfferPromo.scss';

const OfferPromo = () => {
  const router = useRouter();

  // const handleNavigate = (path: string): void => {
  //   router.push(`${path}?callbackUrl=${BASE_URL}`)
  // };

  return (
    <div className="offer-promo">
      <PromoBox>
        <div className="promo-box__content">
          <Heading as="h2" className="promo-box__title">
            Дошка оголошень
          </Heading>
          <div className="promo-box__description">
            Допоможе швидко знайти роботу
            <br /> або замовити послугу
          </div>
        </div>
        <div className="promo-box__actions">
          <Button
            variant="accent"
            onClick={() => router.push('/offers')}
            className="promo-box__button"
          >
            Переглянути
          </Button>
        </div>
      </PromoBox>
    </div>
  );
};

export { OfferPromo };
