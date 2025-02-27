import Image from 'next/image';
import classNames from 'classnames';

import './LinkBox.scss';
import Link from 'next/link';

export interface ILinkBox {
  title: string;
  url: string;
  description?: string;
}

const LinkBox = ({ title, url }: ILinkBox) => {
  const domain = new URL(url);
  const hostname = domain.hostname;

  // const isOffline = useAppSelector(selectIsOffline);

  const externalLinkIcon = (
    <div className="link-box__icon link-box__icon--external-link anim">
      <Image
        src="/icons/ui/nav-link-external.svg"
        alt="Open in new browser tab / window"
        width="20"
        height="20"
      />
    </div>
  );

  // const offlineIcon = (
  //   <div className="link-box__icon link-box__icon--offline anim">
  //     <Image
  //       src="/icons/ui/navLinkExternal20.svg"
  //       alt="Open in new browser tab / window"
  //       width="20"
  //       height="20"
  //     />
  //   </div>
  // );

  // const descriptionEl = isOffline ? 'Відсутній доступ до інтернету.' : hostname;

  return (
    <Link
      href={url}
      target="_blank"
      className="link-box shadow--a"
      // className={classNames('link-box shadow--a', {
      //   'link-box--offline': isOffline,
      // })}
    >
      {/* {isOffline ? offlineIcon : externalLinkIcon} */}
      {externalLinkIcon}
      <div className="link-box__content">
        <div className="link-box__title">{title}</div>
        {/* <div className="link-box__description anim">{descriptionEl}</div> */}
        <div className="link-box__description anim">{hostname}</div>
      </div>
    </Link>
  );
};

export { LinkBox };
