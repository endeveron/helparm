import { useEffect } from 'react';

import { BASE_URL } from 'configs/constants';
import {
  selectVisitorsNumber,
  setVisitorsNumber,
} from 'features/analytics/store';
import { useAppDispatch, useAppSelector } from 'redux/store';

export const useAnalytics = () => {
  const dispatch = useAppDispatch();
  const visitorsNumber = useAppSelector(selectVisitorsNumber);

  useEffect(() => {
    if (visitorsNumber) return;

    // Fetch and store visitors number
    (async () => {
      const errMsg = 'Analytics: Could not fetch visitors number.';
      try {
        console.log('Analytics: Fetching the visitors number...');
        const res = await fetch(`/api/analytics/visitors`);
        if (!res.ok) console.log(errMsg);
        const resData = await res.json();
        const fetchedVisitorsNumber = resData.data;
        if (fetchedVisitorsNumber) {
          console.log('Analytics: Visitors number is fetched.');
          dispatch(setVisitorsNumber(fetchedVisitorsNumber));
        }
      } catch (err) {
        console.error(errMsg);
      }
    })();

    //eslint-disable-next-line
  }, [dispatch]);

  return { visitorsNumber };
};
