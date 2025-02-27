'use client';

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import {
  Button,
  FormErrorMessage,
  FormField,
  FormInput,
  FormLabel,
} from 'components';
import { FormTextarea } from 'components/form/FormTextarea';
import { createOfferForm } from 'configs/form';
import { offerCategories } from 'features/offers/data/categories';
import { IOfferFormData, IOfferFormYupData } from 'features/offers/types';
import { IFormProps } from 'types/form';
import { isFormControlInvalid, yupValidation } from 'utils/form';
import { FormSelect } from 'components/form/FormSelect';

import './OfferForm.scss';

const titleMaxLng = createOfferForm.TITLE_MAX_LENGTH;
const textMaxLng = createOfferForm.TEXTAREA_MAX_LENGTH;

const OfferForm = ({
  isLoading,
  isSuccess,
  onSubmitted,
}: IFormProps<IOfferFormData>) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IOfferFormYupData>({
    resolver: yupValidation.createOfferResolver,
  });

  const [titleCounter, setTitleCounter] = useState(0);
  const [textareaCounter, setTextareaCounter] = useState(0);
  const [select, setSelect] = useState('job');
  const [addPhone, setAddPhone] = useState('');
  const [addPhoneError, setAddPhoneError] = useState('');

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleCounter(e.target.value.length);
  };

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaCounter(e.target.value.length);
  };

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelect(e.currentTarget.value);
  };

  const handleAddPhoneChange = (e: FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setAddPhone(value);
  };

  const onSubmit: SubmitHandler<IOfferFormYupData> = (data) => {
    const isAddPhoneValid = addPhone.match(/[\+]?[0-9 ()+-]{0,18}$/);
    if (isAddPhoneValid) {
      if (addPhoneError) setAddPhoneError('');
      onSubmitted({
        ...data,
        category: select,
        phone2: addPhone,
      });
    } else {
      setAddPhoneError(
        `Задовгий номер телефону. Максимум ${createOfferForm.PHONE_MAX_LENGTH} цифр`
      );
    }
  };

  useEffect(() => {
    if (isSuccess) {
      reset();
    }
  }, [isSuccess, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="offer-form anim"
      autoComplete="off"
      noValidate
    >
      <div className="offer-form__fields-wrapper">
        <div className="offer-form__field-stack">
          {/* Category */}
          <FormField className="offer-form__field" isRequired>
            <FormLabel>Категорія</FormLabel>
            <FormSelect
              optionList={offerCategories}
              defaultValue="job"
              onChange={handleSelect}
              className="offer-form__select"
            />
          </FormField>

          {/* Title */}
          <FormField
            className="offer-form__field"
            isInvalid={isFormControlInvalid('title', errors)}
            isRequired
          >
            <FormLabel>
              Заголовок
              <div className="offer-form__label__counter">
                {titleCounter} / {titleMaxLng}
              </div>
            </FormLabel>
            <FormInput
              maxLength={titleMaxLng}
              {...register('title', { onChange: (e) => handleTitleChange(e) })}
            />
            <FormErrorMessage fieldName="title" errors={errors} />
          </FormField>
        </div>

        {/* Textarea */}
        <FormField
          className="offer-form__field"
          isInvalid={isFormControlInvalid('textarea', errors)}
          isRequired
        >
          <FormLabel>
            Текст пропозиції
            <div className="offer-form__label__counter">
              {textareaCounter} / {textMaxLng}
            </div>
          </FormLabel>
          <FormTextarea
            rows={6}
            maxLength={textMaxLng}
            {...register('textarea', {
              onChange: (e) => handleTextareaChange(e),
            })}
          />
          <FormErrorMessage fieldName="textarea" errors={errors} />
        </FormField>

        <div className="offer-form__field-stack">
          {/* Phone */}
          <FormField
            className="offer-form__field"
            isInvalid={isFormControlInvalid('phone', errors)}
            isRequired
          >
            <FormLabel>Контактний телефон</FormLabel>
            <FormInput {...register('phone')} />
            <FormErrorMessage fieldName="phone" errors={errors} />
          </FormField>

          {/* Add Phone */}
          <FormField className="offer-form__field">
            <FormLabel>Додатковий телефон (не обов&apos;язково)</FormLabel>
            <FormInput onChange={handleAddPhoneChange} />
            {addPhoneError && (
              <div className="form-error-message">{addPhoneError}</div>
            )}
          </FormField>
        </div>
      </div>
      <div className="offer-form__actions-wrapper">
        <Button
          isLoading={isLoading}
          type="submit"
          className="offer-form__button"
        >
          Створити оголошення
        </Button>
      </div>
    </form>
  );
};

export { OfferForm };
