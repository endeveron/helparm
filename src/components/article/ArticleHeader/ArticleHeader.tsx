'use client';

import { Heading } from 'components/Heading';
import { articleIconMap } from 'data/article';
import { getIcon } from 'utils/icon';

import './ArticleHeader.scss';

interface ArticleHeaderProps {
  title: string;
  iconName: string;
}

const ArticleHeader = ({ title, iconName }: ArticleHeaderProps) => {
  const isonEl = getIcon(iconName, articleIconMap);

  return (
    <div className="article-header anim">
      <div className="article-header__icon-box shadow--a">
        <div className="article-header__icon">{isonEl}</div>
      </div>

      <Heading as="h2" className="article-header__title">
        {title}
      </Heading>
    </div>
  );
};

export { ArticleHeader };
