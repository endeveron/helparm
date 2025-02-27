import { ChangeEvent, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import {
  Button,
  FormErrorMessage,
  FormField,
  FormInput,
  FormLabel,
} from 'components';
import { contactForm } from 'configs/form';
import { IContactFormData } from 'types/contacts';
import { IFormProps } from 'types/form';
import { isFormControlInvalid, yupValidation } from 'utils/form';

import './ContactForm.scss';
import { FormTextarea } from 'components/form/FormTextarea';

const messageMaxLng = contactForm.MESSAGE_MAX_LENGTH;

const ContactForm = ({
  isLoading,
  isSuccess,
  onSubmitted,
}: IFormProps<IContactFormData>) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<IContactFormData>({
    resolver: yupValidation.contactsResolver,
  });

  const [messageCounter, setMessageCounter] = useState(0);

  const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessageCounter(e.target.value.length);
  };

  const onSubmit: SubmitHandler<IContactFormData> = (data) => {
    onSubmitted(data);
  };

  useEffect(() => {
    if (isSuccess) {
      reset();
      setMessageCounter(0);
    }
  }, [isSuccess, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="contact-form anim"
      autoComplete="off"
      noValidate
    >
      <div className="contact-form__fields-wrapper">
        <div className="contact-form__field-stack">
          {/* Name */}
          <FormField
            isRequired
            className="contact-form__field"
            isInvalid={isFormControlInvalid('name', errors)}
          >
            <FormLabel>Ваше Ім&apos;я</FormLabel>
            <FormInput {...register('name')} />
            <FormErrorMessage fieldName="name" errors={errors} />
          </FormField>

          {/* Email */}
          <FormField
            isRequired
            className="contact-form__field"
            isInvalid={isFormControlInvalid('email', errors)}
          >
            <FormLabel>Email</FormLabel>
            <FormInput {...register('email')} />
            <FormErrorMessage fieldName="email" errors={errors} />
          </FormField>
        </div>

        {/* Message */}
        <FormField
          isRequired
          className="contact-form__field"
          isInvalid={isFormControlInvalid('message', errors)}
        >
          <FormLabel>
            Повідомлення
            <div className="contact-form__label__counter">
              {messageCounter} / {messageMaxLng}
            </div>
          </FormLabel>
          <FormTextarea
            rows={6}
            maxLength={messageMaxLng}
            {...register('message', {
              onChange: (e) => handleMessageChange(e),
            })}
          />
          <FormErrorMessage fieldName="message" errors={errors} />
        </FormField>
      </div>
      <div className="contact-form__actions-wrapper">
        <Button
          isLoading={isLoading}
          type="submit"
          className="contact-form__button"
        >
          Відправити
        </Button>
      </div>
    </form>
  );
};

export { ContactForm };
