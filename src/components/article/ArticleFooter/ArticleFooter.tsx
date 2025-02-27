import Link from 'next/link';
import Image from 'next/image';

import { LinkItem } from 'types/article';

import './ArticleFooter.scss';

interface ArticleFooterProps {
  prev?: LinkItem;
  next?: LinkItem;
}

const ArticleFooter = ({ prev, next }: ArticleFooterProps) => {
  return (
    <div className="article-footer anim">
      <div className="article-footer__nav">
        <div className="article-footer__link-wrapper">
          {!!prev?.link && (
            <Link
              href={`/articles/${prev.link}`}
              className="article-footer__link article-footer__link--prev shadow--a"
            >
              <div className="article-footer__link-icon">
                <Image
                  src="/icons/ui/footer-nav-back.svg"
                  alt="Go to the previous page"
                  width="20"
                  height="20"
                />
              </div>

              <div className="article-footer__link-title">{prev.title}</div>
            </Link>
          )}
        </div>
        <div className="article-footer__link-wrapper">
          {!!next?.link && (
            <Link
              href={`/articles/${next.link}`}
              className="article-footer__link article-footer__link--next shadow--a"
            >
              <div className="article-footer__link-icon">
                <Image
                  src="/icons/ui/footer-nav-forward.svg"
                  alt="Go to the next page"
                  width="20"
                  height="20"
                />
              </div>
              <div className="article-footer__link-title">{next.title}</div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export { ArticleFooter };
