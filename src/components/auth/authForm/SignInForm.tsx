'use client';

import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button, FormErrorMessage } from 'components';
import { FormField } from 'components/form/FormField';
import { FormInput } from 'components/form/FormInput';
import { FormInputGroup } from 'components/form/FormInputGroup';
import { FormInputIcon } from 'components/form/FormInputIcon';
import { FormLabel } from 'components/form/FormLabel';
import { usePasswordVisibility } from 'hooks/usePasswordVisibility';
import { ISignInFormData } from 'types/auth';
import { isFormControlInvalid, yupValidation } from 'utils/form';

import './AuthForm.scss';

const SignInForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/account';

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ISignInFormData>({
    resolver: yupValidation.loginResolver,
  });

  const [isLoading, setIsLoading] = useState(false);

  const { isVisible, visibilityIcon, toggleVisibility } =
    usePasswordVisibility();

  const onSubmit: SubmitHandler<ISignInFormData> = async (formData) => {
    try {
      setIsLoading(true);
      await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        callbackUrl,
      });
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
          Увійти
        </Button>
      </div>
    </form>
  );
};

export { SignInForm };
