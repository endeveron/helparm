import { Metadata } from 'next';

import { NewsClient } from 'features/news/components/NewsClient/NewsClient';

export const metadata: Metadata = {
  title: 'Новини – HelpArm',
  description: 'Новини',
};

const News = () => <NewsClient />;

export default News;
