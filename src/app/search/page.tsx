import { Metadata } from 'next';

import { SearchClient } from 'features/search/components/SearchClient/SearchClient';

export const metadata: Metadata = {
  title: 'Пошук – HelpArm',
  description: 'Пошук',
};

const Search = async () => <SearchClient />;

export default Search;
