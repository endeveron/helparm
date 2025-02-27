'use client';

import { Error as ErrorComponent } from 'components/ui/Error/Error';

const Error = ({ error }: { error: Error }) => {
  return <ErrorComponent error={error} />;
};

export default Error;
