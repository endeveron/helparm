import { WithChildren } from 'types/common';

import './ArticleMain.scss';

interface ArticleMainProps extends WithChildren {}

const ArticleMain = ({ children }: ArticleMainProps) => {
  return <div className="article-main anim">{children}</div>;
};

export { ArticleMain };
