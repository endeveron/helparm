import {
  IArticleTextItem,
  IArticleRenderData,
  IArticle,
  IArticleItem,
} from 'types/article';

export const createCardListFromArticles = (
  articles: IArticle[]
): IArticleItem[] => {
  const findText = (textData: IArticleTextItem[], textId: string) => {
    const index = textData.findIndex((item) => item.id === textId);
    return index > -1 ? textData[index].value : 'No Data';
  };

  return articles.map((article) => {
    const defaultValue = 'No Data';
    let title = defaultValue;
    let description = defaultValue;
    const name = article.name;
    const iconName = name;
    const navLink = `/articles/${name}`;
    const cardData = article.data[0].ui;
    if (!cardData?.length) return { title, description, iconName, navLink };

    const cardTitleItem = cardData[0];
    if (cardTitleItem.id === 'c_ttl') {
      title = cardTitleItem.value;
    } else {
      title = findText(cardData, 'c_ttl');
    }

    const cardDescriptionItem = cardData[1];
    if (cardDescriptionItem.id === 'c_dsc') {
      description = cardDescriptionItem.value || 'No Data';
    } else {
      description = findText(cardData, 'c_dsc');
    }

    return { title, description, iconName, navLink };
  });
};

export const createTextMap = (
  textItems: IArticleTextItem[]
): Map<string, string> => {
  const map = new Map();
  for (let item of textItems) {
    map.set(item.id, item.value);
  }
  return map;
};

export const getText = (textId: string, data: IArticleRenderData): string => {
  return data?.textMap.get(textId) || '';
};

export const getLink = (linkId: string, data: IArticleRenderData): string => {
  return data?.linkMap?.get(linkId) || '';
};

export const getUIText = (textId: string, data: IArticleRenderData): string => {
  return data?.uiMap?.get(textId) || '';
};
