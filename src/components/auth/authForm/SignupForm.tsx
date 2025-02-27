'use client';

import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button, FormErrorMessage } from 'components';
import { usePasswordVisibility } from 'hooks/usePasswordVisibility';
import { ISignUpFormData } from 'types/auth';
import { isFormControlInvalid, yupValidation } from 'utils/form';

import { SignUpResData } from 'types/auth';

import './AuthForm.scss';
import {
  FormField,
  FormLabel,
  FormInput,
  FormInputGroup,
  FormInputIcon,
} from 'components';

const SignUpForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/account';

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ISignUpFormData>({
    resolver: yupValidation.signupResolver,
  });

  const [isLoading, setIsLoading] = useState(false);

  const { isVisible, visibilityIcon, toggleVisibility } =
    usePasswordVisibility();

  const onSubmit: SubmitHandler<ISignUpFormData> = async (formData) => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/auth/sign-up', {
        method: 'POST',
        body: JSON.stringify(formData),
      });

      // TODO: Handle errors

      if (!res?.ok) {
        console.error('Server error');
        return;
      }

      const { data, error }: SignUpResData = await res.json();

      if (error) {
        console.error(error);
      }

      // Auto login and redirect to the Account page
      if (data) {
        await signIn('credentials', {
          email: formData.email,
          password: formData.password,
          callbackUrl,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="auth-form"
      autoComplete="on"
      noValidate
    >
      <div className="auth-form__fields-wrapper">
        {/* Name */}
        <FormField
          isRequired
          className="auth-form__field"
          isInvalid={isFormControlInvalid('name', errors)}
        >
          <FormLabel>Ім&apos;я</FormLabel>
          <FormInput {...register('name')} />
          <FormErrorMessage fieldName="name" errors={errors} />
        </FormField>

        {/* Email */}
        <FormField
          isRequired
          className="auth-form__field"
          isInvalid={isFormControlInvalid('email', errors)}
        >
          <FormLabel>Email</FormLabel>
          <FormInput {...register('email')} />
          <FormErrorMessage fieldName="email" errors={errors} />
        </FormField>

        {/* Password */}
        <FormField
          isRequired
          className="auth-form__field"
          isInvalid={isFormControlInvalid('password', errors)}
        >
          <FormLabel>Пароль</FormLabel>
          <FormInputGroup>
            <FormInput
              type={isVisible ? 'text' : 'password'}
              {...register('password')}
            />
            <FormInputIcon
              onClick={toggleVisibility}
              className="auth-form__icon action"
            >
              {visibilityIcon}
            </FormInputIcon>
          </FormInputGroup>
          <FormErrorMessage fieldName="password" errors={errors} />
        </FormField>
      </div>

      <div className="auth-form__actions-wrapper">
        {/* Submit */}
        <Button
          isLoading={isLoading}
          type="submit"
          className="auth-form__button"
        >
          Готово
        </Button>
      </div>
    </form>
  );
};

export { SignUpForm };
