import { IControllerResult } from 'types/common';
import { IContactsData, IContactsResData } from 'types/contacts';
import logger from 'utils/logger';
import { sendEmail } from 'utils/mailer';

export const sendContactsMail = async ({
  name,
  email,
  message,
}: IContactsData): IControllerResult<IContactsResData> => {
  if (!name || !email || !message)
    return {
      data: null,
      error: 'Відсутні необхідні дані (name, email або password).',
    };

  try {
    const from = email;
    const to = process.env.CONTACT_EMAIL!;
    const subject = 'Техпідтримка';
    const html = `<p><b style="margin-right:1rem;">${name}</b><a href="mailto:${email}">${email}</a></p><p>${message}</p>`;

    const isSent = await sendEmail({
      from,
      to,
      subject,
      html,
    });

    return {
      data: {
        isSent: isSent,
      },
    };
  } catch (err: any) {
    logger.r('controllers/contacts sendContactsMail', err);
    return {
      data: null,
      error: 'Помилка серверу. Будь ласка спробуйте пізніше.',
    };
  }
};
