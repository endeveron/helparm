import moment from 'moment';
import 'moment/dist/locale/uk';
import { v4 as uid } from 'uuid';

import { INewsArticle } from 'features/news/types';
import Image from 'next/image';
import { isUrl } from 'utils/http';

import './NewsArticle.scss';

interface NewsArticleProps extends INewsArticle {}

const NewsArticle = (props: NewsArticleProps) => {
  if (!props) return null;

  // Check image url
  const imgSrc = props.imgSrc;
  const isValidUrl = isUrl(imgSrc);

  // Get date
  moment.locale('uk');
  const fromNow = moment(props.date).fromNow();

  const imgEl = isValidUrl && (
    <div className="news-article__image anim">
      <Image
        priority
        src={props.imgSrc}
        alt={props.title}
        sizes="(max-width: 1279px) 100vw, (min-width: 1280px) 38vw"
        fill
      />
    </div>
  );

  const metaEl = (
    <div className="news-article__meta anim">
      <div className="news-article__source">
        <a className="inline-link" href={props.url} target="_blank">
          {props.sourceTitle}
        </a>
      </div>
      <div className="news-article__date">{fromNow}</div>
    </div>
  );

  const titleEl = <div className="news-article__title anim">{props.title}</div>;

  const leadEl = !!props.lead && (
    <div className="news-article__lead anim">{props.lead}</div>
  );

  const text = props?.paragraphs;
  const paragraphsEl = text?.map((p) => (
    <p className="news-article__text anim" key={uid()}>
      {p}
    </p>
  ));

  return (
    <div className="news-article anim">
      {imgEl}
      {titleEl}
      {leadEl}
      {paragraphsEl}
      {metaEl}
    </div>
  );
};

export { NewsArticle };
