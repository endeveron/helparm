import { Metadata } from 'next';
import Image from 'next/image';

import { Heading } from 'components/Heading';
import { MainArticleList } from 'components/article/MainArticleList/MainArticleList';
import { PromoContainer } from 'components/promo/PromoContainer/PromoContainer';
import { Social } from 'components/social/Social/Social';
import { UserCounter } from 'features/analytics/components/UserCounter/UserCounter';
import { NewsContainer } from 'features/news/components/NewsContainer/NewsContainer';

import './main.scss';

export const metadata: Metadata = {
  title: 'Головна – HelpArm',
  description: 'Головна',
};

const Main = async () => {
  // Get articles using Server Actions
  // const articles = await getArticles();

  // // Get articles using Services (Fetch API)
  // // Can use the fetch revalidate option
  // const articles = await fetchArticles();

  // // Get articles using DB Controllers
  // const { data: articles, error } = await getArticles();
  // if (error) logger.r('Main getArticles()', error);

  return (
    <div className="main anim">
      <div className="main__header">
        <UserCounter />
        <div className="main__header__logo anim--main-header-logo">
          <Image src="/images/logo.svg" width="100" height="67" alt="Logo" />
        </div>
        <div className="main__header__content anim--main-header-content">
          <Heading as="h1" className="main__header__title">
            Українцям <br /> в Польщі
          </Heading>
          <div className="main__header__description">
            Корисна інформація
            <br /> з перевірених джерел
          </div>
        </div>
        <div className="main__header__bg anim--main-header-bg" />
      </div>
      <div className="main__content anim">
        <div className="main__column">
          <PromoContainer />
          <MainArticleList />
          <Social />
        </div>
        <div className="main__column">
          <NewsContainer title="Про головне" />
        </div>
      </div>
    </div>
  );
};

export default Main;
