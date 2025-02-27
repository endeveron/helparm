'use client';

import { useEffect, useState } from 'react';

import { Heading } from 'components/Heading';
import { ContactBox } from 'components/form/contacts/ContactBox/ContactBox';
import { ContactForm } from 'components/form/contacts/ContactForm/ContactForm';
import { FACEBOOK_CHANNEL, SUPPORT_EMAIL } from 'configs/constants';
import { IContactFormData, IContactsResData } from 'types/contacts';
import FacebookIcon from '/public/icons/contacts/facebook.svg';
import MailIcon from '/public/icons/contacts/mail.svg';

import './ContactsClient.scss';

const sendContactsMail = async (contactsData: IContactFormData) => {
  const errMsg = 'Помилка відправки. Будь ласка спробуйте пізніше.';
  try {
    const res = await fetch(`/api/contacts/mail`, {
      method: 'POST',
      body: JSON.stringify(contactsData),
    });
    if (!res.ok) return { error: errMsg, data: null };
    const data = await res.json();
    return data;
  } catch (err: any) {
    return { error: err?.message || errMsg, data: null };
  }
};

const ContactsClient = () => {
  const [data, setData] = useState<IContactsResData>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (contactsData: IContactFormData) => {
    if (!contactsData) throw new Error('Invalid contacts data');

    // Send POST to /api/contacts/mail
    setIsLoading(true);
    const { data: resData, error: errMsg } = await sendContactsMail(
      contactsData
    );
    setIsLoading(false);
    if (errMsg) setError(errMsg);
    if (resData) setData(resData);
  };

  useEffect(() => {
    if (error) {
      console.error('ContactsClient sendContactsMail', error);
    }
  }, [error]);

  const responseOkMessage = data?.isSent && (
    <div className="contacts__message anim shadow--a">
      <div className="contacts__message__title">Дякуємо за звернення!</div>
      <div className="contacts__message__description">
        Ми намагатимемося обробити його якнайшвидше.
      </div>
    </div>
  );

  const responseErrorMessage = error && (
    <div className="contacts__message anim shadow--a">
      <div className="contacts__message__title contacts__message__title--error">
        Йосип босий!
      </div>
      <div className="contacts__message__description">
        Дуже прикро, але це повідомлення не було відправлено.
        <br /> Будь ласка, спробуйте трохи згодом. Вибачте за незручності.
      </div>
    </div>
  );

  return (
    <div className="contacts anim anim-children">
      <Heading as="h1" className="contacts__title view-title">
        Контакти
      </Heading>

      <div className="contacts__links anim">
        <ContactBox
          title={SUPPORT_EMAIL}
          icon={MailIcon()}
          link={`mailto:${SUPPORT_EMAIL}`}
        />
        <ContactBox
          title="facebook"
          icon={FacebookIcon()}
          link={FACEBOOK_CHANNEL}
        />
      </div>

      <div className="contacts__tech-support anim">
        <div className="contacts__response-message anim">
          {responseOkMessage}
          {responseErrorMessage}
        </div>
        {!data?.isSent && (
          <div className="contacts__form anim">
            <div className="contacts__subtitle">Техпідтримка</div>
            <div className="contacts__description">
              Будь ласка дайте нам знати, якщо ви маєте цікаву ідею або
              зауваження щодо роботи порталу.
            </div>
            <ContactForm
              isLoading={isLoading}
              onSubmitted={handleSubmit}
              isSuccess={!!data?.isSent}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export { ContactsClient };
