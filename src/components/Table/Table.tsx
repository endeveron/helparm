import { v4 as uid } from 'uuid';

import { montserrat } from 'app/layout';

import './Table.scss';
import { Heading } from 'components/Heading';

interface TableProps {
  head: string[];
  body: string[][];
  showFooter?: boolean;
  caption?: string;
  className?: string;
}

const Table = ({ head, body, caption, showFooter = false }: TableProps) => {
  const captionEl = caption && (
    <caption className="table__caption">{caption}</caption>
  );
  const headerEl = (
    <Heading as="thead" className="table__header">
      <tr className="table__row" key={uid()}>
        {head.map((headerCellData) => (
          <th key={uid()}>{headerCellData}</th>
        ))}
      </tr>
    </Heading>
  );
  const bodyEl = (
    <tbody className="table__body">
      {body.map((row) => (
        <tr className="table__row" key={uid()}>
          {row.map((cellData) => (
            <td key={uid()}>{cellData}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
  const footerEl = showFooter && (
    <tfoot className="table__footer">
      <tr className="table__row" key={uid()}>
        {headerEl}
      </tr>
    </tfoot>
  );

  return (
    <div className="table__container">
      <table className="table">
        {captionEl}
        {headerEl}
        {bodyEl}
        {footerEl}
      </table>
    </div>
  );
};

export { Table };
