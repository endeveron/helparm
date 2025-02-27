import axios from 'axios';
import { JSDOM } from 'jsdom';
import { cache } from 'react';

import { tsn } from 'features/news/configs';
import { INews } from 'features/news/types';
import { IControllerResult } from 'types/common';

// The React cache function is used to memoize data requests.
// The revalidate option is set to 3600, meaning the data...
// ...will be cached and revalidated at most every hour.

// export const revalidate = 3600; // revalidate the data at most every hour

const fetchDocument = async (url: string) => {
  const response = await axios.get(url);
  const dom = new JSDOM(response.data);
  return dom.window.document;
};

const getElData = (item: Element, selector: string, attr?: string) => {
  if (attr) return item.querySelector(selector)?.getAttribute(attr) || null;
  return item.querySelector(selector)?.textContent || null;
};

export const sortNews = (arr: INews[]) =>
  arr.sort((a, b) => {
    if (!a.date || !b.date) return -1;
    return +new Date(b.date) - +new Date(a.date);
  });

export const getTsnNews = async (url: string) => {
  try {
    // Get the dom.window.document object'
    const document = await fetchDocument(url);
    if (!document)
      return { data: null, error: 'Could not get the TSN document.' };

    const extractNewsData = async () => {
      // Get the target section 'Останні новини'
      const targetSection = document.querySelectorAll(tsn.sectionSel)[0];
      if (!targetSection)
        return {
          data: null,
          error: "Could not get the TSN target section 'Останні новини'.",
        };

      // Get data of article.news
      const news = [...targetSection.querySelectorAll(tsn.newsSel)];
      const newsData = news.map((news) => ({
        source: 'tsn',
        title: getElData(news, tsn.newsTitleLinkSel) || '',
        sourceTitle: 'ТСН',
        url: getElData(news, tsn.newsTitleLinkSel, 'href') || '',
        date: getElData(news, tsn.newsDate, 'datetime') || '',
      }));

      return { data: newsData, error: null };
    };

    return await extractNewsData();
  } catch (err: any) {
    return { data: null, error: 'Could not fetch the obozrevatel data.' };
  }
};

export const getNews = cache(async (): IControllerResult<INews[]> => {
  let news: INews[] = [];
  let errors: string[] = [];
  let error = null;

  try {
    // https://tsn.ua/tags/польща
    const tsnNewsPage1 = await getTsnNews(tsn.page1Url);
    if (tsnNewsPage1.error) errors.push(tsnNewsPage1.error);
    if (tsnNewsPage1.data?.length) news = [...news, ...tsnNewsPage1.data];

    // https://tsn.ua/tags/польща/page-2
    const tsnNewsPage2 = await getTsnNews(tsn.page2Url);
    if (tsnNewsPage2.error) errors.push(tsnNewsPage2.error);
    if (tsnNewsPage2.data?.length) news = [...news, ...tsnNewsPage2.data];

    // Configure error message
    if (errors?.length) error = errors.join(' ');

    // Sort news by date
    const sortedNews = sortNews(news);

    return {
      data: sortedNews,
    };
  } catch (err: any) {
    return { data: null, error: 'Could not fetch the news data.' };
  }
});

export const getNewsArticle = async (url: string): IControllerResult<INews> => {
  try {
    // Get the dom.window.document object'
    const document = await fetchDocument(url);
    if (!document)
      return { data: null, error: 'Could not get the TSN document.' };

    const extractAricleData = async () => {
      let paragraphs: string[] = [];
      let errors: string[] = [];
      let error: string | undefined;

      // Get the target section 'Останні новини'
      const article = document.querySelector(tsn.newsArticleSel);
      if (!article)
        return {
          data: null,
          error: 'Could not get the TSN article section.',
        };

      // Get the article data

      // Title
      let title =
        article.querySelector(tsn.newsArticleTitleSel)?.textContent || '';
      if (!title) errors.push('Could not get the TSN article title.');
      // Remove the line break symbols
      title = title?.replace(/(\r\n|\n|\r)/gm, '');

      // Image
      const imgEl = article.querySelector(tsn.newsArticleImgSel);
      if (!imgEl) errors.push('Could not get the TSN article image.');
      const imgSrc = imgEl?.getAttribute('src') || '';

      // Body
      const articleBody = article.querySelector(tsn.newsArticleBodySel);
      if (!articleBody)
        errors.push('Could not get the TSN article body element.');

      // Lead text
      const lead =
        articleBody?.querySelector(tsn.newsArticleLeadSel)?.textContent || '';
      if (!lead) errors.push('Could not get the TSN article lead element.');

      // Date
      const date =
        article
          ?.querySelector(tsn.newsArticleDateSel)
          ?.getAttribute('datetime') || '';
      if (!lead) errors.push('Could not get the TSN article date element.');

      // Source
      const source = 'tsn';
      const sourceTitle = 'ТСН';

      // Paragraphs container
      const textContainer = articleBody?.querySelector(
        tsn.newsArticleTextContainerSel
      );
      if (!textContainer) {
        errors.push(
          'Could not get the TSN article paragraphs container element.'
        );
      } else {
        // Paragraphs container
        const scrappedParagraphs = [...textContainer.querySelectorAll('p')];
        if (!scrappedParagraphs.length) {
          errors.push('Could not get the TSN article paragraphs.');
        } else {
          // Remove the last 2 paragraphs (probably advertizements)
          const slicedParagraphs = scrappedParagraphs.slice(0, -2);
          paragraphs = slicedParagraphs.map((p) => p.textContent || '');
        }
      }

      // Configure error message
      if (errors?.length) error = errors.join(' ');

      return {
        data: {
          date,
          source,
          sourceTitle,
          title,
          imgSrc,
          url,
          lead,
          paragraphs,
        },
        error,
      };
    };

    return await extractAricleData();
  } catch (err: any) {
    return { data: null, error: 'Could not fetch the article data.' };
  }
};
