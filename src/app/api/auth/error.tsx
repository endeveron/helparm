'use client';

const Error = ({ error }: { error: Error }) => {
  return <div className="error">Oops! {error.message}</div>;
};

export default Error;
