import { Metadata } from 'next';
import { v4 as uid } from 'uuid';

import { Table } from 'components/Table/Table';
import { ArticleFooter } from 'components/article/ArticleFooter/ArticleFooter';
import { ArticleHeader } from 'components/article/ArticleHeader/ArticleHeader';
import { ArticleMain } from 'components/article/ArticleMain/ArticleMain';
import { ArticleSection } from 'components/article/ArticleSection/ArticleSection';
import { AccentBox, AccentBoxStatus } from 'components/ui/AccentBox/AccentBox';
import { List } from 'components/ui/List/List';
import { ILinkBox, LinkBox } from 'components/ui/nav/LinkBox/LinkBox';
import { LinkBoxList } from 'components/ui/nav/LinkBoxList/LinkBoxList';
import { getArticleByName, getArticles } from 'controllers/article';
import {
  ArticleSectionEl,
  IArticleRenderData,
  IArticleSection,
  LinkItem,
} from 'types/article';
import { TableData } from 'types/table';
import { createTextMap, getLink, getText, getUIText } from 'utils/article';

interface ArticleProps {
  params: {
    name: string;
  };
}

// // SSG
// export const generateStaticParams = async () => {
//   const { data, error } = await getArticles();
//   if (data) {
//     const articles: any[] = data;
//     return articles.map((article) => ({
//       slug: article.name,
//     }));
//   }

//   return [];
// };

// export const revalidate = 3600; // revalidate at most every hour

export const generateMetadata = async ({
  params: { name = '' },
}: ArticleProps): Promise<Metadata> => {
  let pageTitle = 'Статті';
  const { data } = await getArticleByName(name);
  if (data) pageTitle = data.data[0].text[1].value;
  return {
    title: `${pageTitle} – HelpArm`,
    description: 'Article Page',
  };
};

const Article = async ({ params: { name = '' } }: ArticleProps) => {
  const { data: articleData, error } = await getArticleByName(name);
  if (error) throw new Error(error);
  if (!articleData) throw new Error('Помилка отримання даних статті.');

  // dataList[0] => lang:ua
  const textItems = articleData?.data[0].text;
  const linkItems = articleData?.data[0].links;
  const uiItems = articleData?.data[0].ui;

  const textMap = createTextMap(textItems);
  const linkMap = linkItems && createTextMap(linkItems);
  const uiMap = uiItems && createTextMap(uiItems);

  // Configure article data for render
  const data: IArticleRenderData = {
    name: articleData.name,
    header: articleData.view.header,
    sections: articleData.view.sections,
    footer: articleData.view.footer,
    textMap,
    linkMap,
    uiMap,
  };

  const renderArticleHeader = () => {
    return (
      <ArticleHeader
        title={getText('h_ttl', data)}
        iconName={data.header.icon}
      />
    );
  };

  const renderArticleSectionEl = ({ type, data: elData }: ArticleSectionEl) => {
    if (!type) return null;

    // { "type": "text", "content": "" },
    const renderTextEl = (textId: string) => {
      if (!textId) return null;
      return <p key={textId}>{getText(textId, data)}</p>;
    };

    // { "type": "html", "content": "" },
    const renderHtmlEl = (textId: string) => {
      if (!textId) return null;
      const html = getText(textId, data);
      return <p dangerouslySetInnerHTML={{ __html: html }} key={uid()} />;
    };

    // { "type": "list", "content": [""] },
    // Renders innerHTML
    const renderListEl = (textIdList: string[]) => {
      if (!textIdList?.length) return null;
      const items = textIdList.map((textId) => getText(textId, data));
      return <List items={items} key={uid()} />;
    };

    // { "type": "accent", "content": { "text": "", "status": "" } },
    // Renders innerHTML
    const renderAccentEl = ({
      status,
      text,
    }: {
      status: AccentBoxStatus;
      text: string;
    }) => {
      if (!text) return null;
      const content = getText(text, data);
      return <AccentBox content={content} status={status} key={uid()} />;
    };

    // { "type": "links", "content": [ { "title": "", "url": "" } ] }
    const renderLinksEl = (linkList: ILinkBox[]) => {
      if (!linkList?.length) return null;
      if (linkList.length === 1) {
        const link = linkList[0];
        return (
          <LinkBox
            title={getText(link.title, data)}
            url={getLink(link.url, data)}
            key={uid()}
          />
        );
      }
      const itemsWithParsedText = linkList.map((link: ILinkBox) => ({
        title: getText(link.title, data),
        url: getLink(link.url, data),
        description: link?.description && getText(link.description, data),
      }));
      return <LinkBoxList items={itemsWithParsedText} key={uid()} />;
    };

    // { "type": "html", "content": "" },
    const renderTableEl = ({ head, body, caption }: TableData) => {
      if (!head || !body?.length) return null;
      const headData = getText(head, data).split('_');
      const bodyData = body.map((row) => getText(row, data).split('_'));
      const captionData = caption && getText(caption, data);
      if (!headData?.length || !bodyData?.length) return null;
      return (
        <Table
          head={headData}
          body={bodyData}
          caption={captionData}
          key={uid()}
        />
      );
    };

    switch (type) {
      case 'text':
        return renderTextEl(elData);
      case 'html':
        return renderHtmlEl(elData);
      case 'list':
        return renderListEl(elData);
      case 'accent':
        return renderAccentEl(elData);
      case 'links':
        return renderLinksEl(elData);
      case 'table':
        return renderTableEl(elData);
    }
  };

  const renderArticleSection = ({ title, content }: IArticleSection) => {
    if (!title || !content.length) return null;

    const sectionTitle = getText(title, data);

    return (
      <ArticleSection title={sectionTitle} key={uid()}>
        {content.map((elData: ArticleSectionEl) =>
          renderArticleSectionEl(elData)
        )}
      </ArticleSection>
    );
  };

  const renderArticleMain = () => {
    const sections: IArticleSection[] = data.sections;
    if (!sections?.length) return null;

    return (
      <ArticleMain>
        {sections.map((section) => renderArticleSection(section))}
      </ArticleMain>
    );
  };

  const renderArticleFooter = () => {
    const footerNavList = data?.footer.nav;
    if (!footerNavList?.length) return null;
    let prev: LinkItem = { link: '', title: '' };
    let next: LinkItem = { link: '', title: '' };

    const configureLinkItem = (navItem: {
      to: string;
      link: string;
      title: string;
    }) => ({
      link: `/${navItem.link}`,
      title: getUIText(navItem.title, data),
    });

    for (let navItem of footerNavList) {
      const to = navItem?.to;
      if (!to) continue;

      switch (to) {
        case 'prev':
          prev = configureLinkItem(navItem);
          break;
        case 'next':
          next = configureLinkItem(navItem);
      }
    }

    return (
      <ArticleFooter
        next={next?.link ? next : undefined}
        prev={prev?.link ? prev : undefined}
      />
    );
  };

  const headerEl = renderArticleHeader();
  const mainEl = renderArticleMain();
  const footerEl = renderArticleFooter();

  return (
    <main className="article anim anim-children">
      {headerEl}
      {mainEl}
      {footerEl}
    </main>
  );
};

export default Article;
