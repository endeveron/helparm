// import { UnlockPremium } from 'components';
// import { selectAuthToken } from 'features/auth';
// import { useAppSelector } from 'store';
// import { selectIsOffline } from 'store/ui';
// import { OfferPromo } from 'features/offer';

import { OfferPromo } from 'components/promo/OfferPromo/OfferPromo';
import { UnlockPremium } from 'components/premium/UnlockPremium/UnlockPremium';
import { getAuthStatus } from 'utils/auth';

import './PromoContainer.scss';

const PromoContainer = async () => {
  // // const { premiumAccess } = useUser();
  // const isOffline = useAppSelector(selectIsOffline);

  const isAuth = await getAuthStatus();

  return (
    <div className="promo-container anim--main-promo-box">
      {isAuth ? <OfferPromo /> : <UnlockPremium />}
    </div>
  );
};

export { PromoContainer };
