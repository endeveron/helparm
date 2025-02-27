import { v4 as uid } from 'uuid';

import { LinkBox } from 'components/ui/nav/LinkBox/LinkBox';

import './LinkBoxList.scss';

type LinkItem = {
  title: string;
  url: string;
};

interface LinkBoxListProps {
  items: LinkItem[];
}

const LinkBoxList = ({ items }: LinkBoxListProps) => {
  if (!items.length) return null;

  return (
    <div className="link-box-list">
      {items.map((link) => (
        <LinkBox title={link.title} url={link.url} key={uid()} />
      ))}
    </div>
  );
};

export { LinkBoxList };
