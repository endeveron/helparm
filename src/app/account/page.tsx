import { Metadata } from 'next';
import { getServerSession } from 'next-auth/next';

import { SignOut } from 'components/auth/SignOut/SignOut';
import { Heading } from 'components/Heading';
import { authConfig } from 'configs/auth';

import './account.scss';
import Link from 'next/link';
import { OfferContainer } from 'features/offers/components/OfferContainer/OfferContainer';

export const metadata: Metadata = {
  title: 'Акаунт – HelpArm',
  description: 'Акаунт',
};

const Account = async () => {
  // Get session data on the server component
  const session = await getServerSession(authConfig);

  return (
    <main className="account anim">
      <div className="account__header anim">
        <div className="account__header__user">
          <Heading as="h1" className="account__title">
            Вітаємо, {session?.user.name}!
          </Heading>
          {!!session?.user?.email && (
            <div className="account__email">{session.user.email}</div>
          )}
        </div>
        <div className="account__header__sign-out">
          <SignOut title="Вийти" />
        </div>
      </div>

      {/* Offers */}
      <div className="account__offers anim">
        <h3 className="account__title">
          Ваші оголошення
          <Link
            href="/offers/create"
            className="account__title-link inline-link"
          >
            створити
          </Link>
        </h3>
        <OfferContainer userOwnOnly />
      </div>
    </main>
  );
};

export default Account;
