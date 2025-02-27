import { v4 as uid } from 'uuid';

import './List.scss';

interface ListProps {
  items: string[];
  type?: 'unordered' | 'ordered';
}

const List = ({ items, type = 'unordered' }: ListProps): JSX.Element | null => {
  if (!items?.length) return null;

  const renderOrderedList = () => (
    <ol className="list list--ordered">
      {items.map((item) => (
        <li dangerouslySetInnerHTML={{ __html: item }} key={uid()} />
      ))}
    </ol>
  );

  const renderUnorderedList = () => (
    <ul className="list">
      {items.map((item) => (
        <li dangerouslySetInnerHTML={{ __html: item }} key={uid()} />
      ))}
    </ul>
  );

  switch (type) {
    case 'ordered':
      return renderOrderedList();
    case 'unordered':
      return renderUnorderedList();
  }
};

export { List };
