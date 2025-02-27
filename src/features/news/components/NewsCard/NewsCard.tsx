import classNames from 'classnames';
import moment from 'moment';
import 'moment/locale/uk';

import { INews } from 'features/news/types';

import './NewsCard.scss';

interface NewsCardProps extends INews {
  onClick: () => void;
}

const NewsCard = ({ title, sourceTitle, date, onClick }: NewsCardProps) => {
  // const currentArticle = useAppSelector(selectCurrentNewsArticle);

  moment.locale('uk');
  const fromNow = moment(date).fromNow();

  // const isActive = currentArticle?.date === date;
  const isActive = false;

  return (
    <div
      className={classNames('news-card card card--a anim shadow--a', {
        'news-card--active': isActive,
      })}
      onClick={onClick}
    >
      <div className="news-card__content">{title}</div>
      <div className="news-card__footer">
        <div className="news-card__source">{sourceTitle}</div>
        <div className="news-card__date">{fromNow}</div>
      </div>
    </div>
  );
};

export { NewsCard };
