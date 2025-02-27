'use client';

import { useAnalytics } from 'features/analytics/useAnalytics';

import './UserCounter.scss';

const UserCounter = () => {
  const { visitorsNumber } = useAnalytics();

  return (
    !!visitorsNumber && (
      <div className="user-counter anim--main-header-counter">
        <div className="user-counter__title">Користувачів</div>
        <div className="user-counter__value">{visitorsNumber}</div>
      </div>
    )
  );
};

export { UserCounter };
