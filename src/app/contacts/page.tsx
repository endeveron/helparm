import { ContactsClient } from 'components/form/contacts/ContactsClient/ContactsClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Контакти – HelpArm',
  description: 'Контакти',
};

const Contacts = async () => <ContactsClient />;

export default Contacts;
