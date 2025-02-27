'use client';

import { useRouter } from 'next/navigation';

import { Button } from 'components';
import { Heading } from 'components/Heading';
import { PromoBox } from 'components/promo/PromoBox/PromoBox';
import { BASE_URL } from 'configs/constants';

import './UnlockPremium.scss';

const UnlockPremium = () => {
  const router = useRouter();

  const handleNavigate = (path: string): void => {
    router.push(`${path}?callbackUrl=${BASE_URL}/offers`);
  };

  return (
    <div className="unlock-premium">
      <PromoBox>
        <div className="promo-box__content">
          <Heading as="h2" className="promo-box__title">
            Дошка оголошень
          </Heading>
          <div className="promo-box__description">
            Знаходьте та створюйте оголошення
            <br /> з питань роботи, житла та послуг
          </div>
        </div>
        <div className="promo-box__actions">
          <Button
            variant="accent"
            onClick={() => handleNavigate('/auth/sign-up')}
            className="promo-box__button"
          >
            Створити акаунт
          </Button>
          <div className="promo-box__actions__row">
            <span className="promo-box__actions__text">або</span>
            <span
              className="promo-box__actions__link"
              onClick={() => handleNavigate('/auth/sign-in')}
            >
              Увійти
            </span>
          </div>
        </div>
      </PromoBox>
    </div>
  );
};

export { UnlockPremium };
