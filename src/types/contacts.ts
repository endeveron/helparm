export interface IContactsData {
  name: string;
  email: string;
  message: string;
}

export interface IContactFormData extends IContactsData {
  [key: string]: string;
}

export interface IContactsResData {
  isSent: boolean;
}
