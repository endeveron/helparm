import { FieldErrors } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { contactForm, createOfferForm } from 'configs/form';
import { IFormInputs } from 'types/form';

const PASSWORD_REQUIREMENTS_MESSAGE =
  'Від 6 символів, мінімум одна велика літера та цифра';

const baseAuth = {
  email: yup
    .string()
    .email('Це поки що не схоже на email')
    .required('Будь ласка введіть еmail'),
  password: yup
    .string()
    .required('Будь ласка введіть пароль')
    .matches(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,20}$/,
      PASSWORD_REQUIREMENTS_MESSAGE
    ),
};

const loginSchema = yup.object().shape(baseAuth);

const signupSchema = yup.object().shape({
  ...baseAuth,
  name: yup
    .string()
    .required("Будь ласка введіть ваше ім'я")
    .min(2, "Закоротке ім'я")
    .max(20, 'Задовге')
    .matches(/[а-щьюяґєіїa-z]+$/i, '2-20 символів, тільки літери'),
});

const offerTitleMinLng = createOfferForm.TITLE_MIN_LENGTH;
const offerTitleMaxLng = createOfferForm.TITLE_MAX_LENGTH;
const offerTextMinLng = createOfferForm.TEXTAREA_MIN_LENGTH;
const offerTextMaxLng = createOfferForm.TEXTAREA_MAX_LENGTH;
const offerPhoneMinLng = createOfferForm.PHONE_MIN_LENGTH;
const offerPhoneMaxLng = createOfferForm.PHONE_MAX_LENGTH;

const createOfferSchema = yup.object().shape({
  title: yup
    .string()
    .required('Будь ласка введіть заголовок')
    .min(offerTitleMinLng, `Мінімум ${offerTitleMinLng} символів`)
    .max(offerTitleMaxLng, `Максимум ${offerTitleMaxLng} символів`)
    .matches(
      /[а-щьюяґєіїa-zżźćńółęąś.,()\-+!`%$€\s\d]+$/i,
      `${offerTitleMinLng}-${offerTitleMaxLng} символів, тільки літери та цифри`
    ),
  textarea: yup
    .string()
    .required('Будь ласка введіть текст')
    .min(offerTextMinLng, `Мінімум ${offerTextMinLng} символів`)
    .max(offerTextMaxLng, `Максимум ${offerTextMaxLng} символів`)
    .matches(
      /[а-щьюяґєіїa-zżźćńółęąś.,()\-+!`%$€\s\d]+$/im,
      `${offerTextMinLng}-${offerTextMaxLng} символів, тільки літери та цифри`
    ),
  phone: yup
    .string()
    .required('Будь ласка введіть номер телефону')
    .min(
      offerPhoneMinLng,
      `Закороткий номер телефону. Мінімум ${offerPhoneMinLng} цифр`
    )
    .max(
      offerPhoneMaxLng,
      `Задовгий номер телефону. Максимум ${offerPhoneMaxLng} цифр`
    )
    .matches(
      /[\+]?[0-9 ()+-]{9,18}$/,
      `Номер телефону має містити від ${offerPhoneMinLng} до ${offerPhoneMaxLng} цифр`
    ),
  // phone2: yup.string().max(18, `Задовгий номер телефону. Максимум 18 цифр`),
});

const contactsMessageMinLng = contactForm.MESSAGE_MIN_LENGTH;
const contactsMessageMaxLng = contactForm.MESSAGE_MAX_LENGTH;

const contactsSchema = yup.object().shape({
  name: yup
    .string()
    .required("Будь ласка введіть ваше ім'я")
    .min(2, "Закоротке ім'я")
    .max(20, 'Задовге')
    .matches(/^[а-щьюяґєії a-z]+$/i, '2-20 символів, тільки літери та пробіл'),
  email: yup
    .string()
    .email('Це поки що не схоже на email')
    .required('Будь ласка введіть еmail'),
  message: yup
    .string()
    .required('Будь ласка введіть текст повдомлення')
    .min(contactsMessageMinLng, `Мінімум ${contactsMessageMinLng} символів`)
    .max(contactsMessageMaxLng, `Максимум ${contactsMessageMaxLng} символів`)
    .matches(
      /^[а-щьюяґєіїa-z.,()%/$€\s\d]+$/i,
      `${contactsMessageMinLng}-${contactsMessageMaxLng} символів, тільки літери та цифри`
    ),
});

export const yupValidation = {
  loginResolver: yupResolver(loginSchema),
  signupResolver: yupResolver(signupSchema),
  contactsResolver: yupResolver(contactsSchema),
  createOfferResolver: yupResolver(createOfferSchema),
};

export const isFormControlInvalid = (
  fieldName: string,
  errors: FieldErrors<IFormInputs>
): boolean => {
  const error = errors[fieldName];
  const patternError = error?.type === 'pattern';

  return !!error || patternError;
};
