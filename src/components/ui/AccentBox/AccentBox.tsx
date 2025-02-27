import classNames from 'classnames';

import './AccentBox.scss';

export type AccentBoxStatus = 'info' | 'warning' | 'success' | 'error';

interface AccentBoxProps {
  content: string;
  status?: AccentBoxStatus;
}

const AccentBox = ({ content, status = 'info' }: AccentBoxProps) => {
  return (
    <div
      className={classNames('accent-box shadow--a', `accent-box--${status}`)}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export { AccentBox };
