export interface IOffer {
  category: string;
  author: {
    _id: string;
    name: string;
  };
  contacts: {
    phones: string[];
  };
  content: {
    title: string;
    text: string;
  };
  created?: string;
  updated?: string;
  _id?: string;
}

export interface IOfferCategory {
  name: string;
  title: string;
  selectTitle: string;
}

export interface IOfferCategoryItem extends Pick<IOfferCategory, 'title'> {
  isActive: boolean;
}

// Form

export interface IOfferFormYupData {
  title: string;
  textarea: string;
  phone: string;
  [key: string]: string;
}

export interface IOfferFormData {
  category: string;
  title: string;
  textarea: string;
  phone: string;
  phone2: string;
  [key: string]: string;
}

// API

// Redux

export interface IOfferSlice {
  list: IOffer[];
  searchQuery: string;
  clearSearch: boolean;
}
