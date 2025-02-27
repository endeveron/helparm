'use client'; // Error components must be Client Components

import { useRouter } from 'next/navigation';

import { Button } from 'components';
import { Heading } from 'components/Heading';

import './Error.scss';

type ErrorProps = {
  error: Error;
  // reset: () => void;
};

const Error = ({ error }: ErrorProps) => {
  const router = useRouter();
  return (
    <div className="error">
      <div className="error__content shadow--a">
        <Heading as="h2" className="error__title">
          Щось пішло не так
        </Heading>
        <div className="error__message">
          {error?.message ? error.message : ''}
        </div>
        <div className="error__message">
          Перепрошуємо за тимчасові незручності.
        </div>
        <div className="error__actions">
          <Button onClick={() => router.push('/')}>На головну</Button>
        </div>
      </div>
    </div>
  );
};

export { Error };
