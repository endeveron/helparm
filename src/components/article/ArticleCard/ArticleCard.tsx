import Link from 'next/link';

import { articleIconMap } from 'data/article';
import { IArticleItem } from 'types/article';
import { getIcon } from 'utils/icon';

import './ArticleCard.scss';

interface ArticleCardProps extends IArticleItem {}

const ArticleCard = ({
  title,
  description,
  navLink,
  iconName,
}: ArticleCardProps) => {
  return (
    <Link
      // className={classNames('article-card card card--a anim shadow--a', {
      //   'article-card--premium': premiumAccess,
      // })}
      className="article-card card card--a anim shadow--a"
      href={navLink}
    >
      {/* {premiumBadgeEl} */}
      <div className="article-card__content article-card__content--left">
        <div className="article-card__icon">
          {getIcon(iconName, articleIconMap)}
        </div>
      </div>
      <div className="article-card__content article-card__content--right">
        <div className="article-card__title">{title}</div>
        <div className="article-card__description">{description}</div>
      </div>
    </Link>
  );
};

export { ArticleCard };
