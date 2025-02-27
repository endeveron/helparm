import { WithChildren } from 'types/common';

import './ArticleSection.scss';

interface ArticleSectionProps extends WithChildren {
  title?: string;
}

const ArticleSection = ({ title, children }: ArticleSectionProps) => {
  return (
    <div className="article-section anim">
      {title && <h3 className="article-section__title">{title}</h3>}
      {children}
    </div>
  );
};

export { ArticleSection };
