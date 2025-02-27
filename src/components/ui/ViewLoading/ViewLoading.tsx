import { LoadingSpinner } from 'components/ui/LoadingSpinner/LoadingSpinner';

import './ViewLoading.scss';

const ViewLoading = () => {
  return (
    <div className="view-loading anim">
      <LoadingSpinner className="accent" />
    </div>
  );
};

export { ViewLoading };
