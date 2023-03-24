import { AuthLayoutTitle } from 'layouts/Auth.layout';
import style from 'styles/auth/login/style.module.scss';
import GoogleAuthBtn from 'features/auth/google.auth.btn';
import FacebookAuthBtn from 'features/auth/facebook.auth.btn';
import { useState } from 'react';
import { ISocialAuthUser } from 'types/auth.types';
import { object, SchemaOf, string } from 'yup';
import useReactForm from 'hooks/useReactForm';
import { IUserSchema } from 'schemas/account.schema';
import { FormProvider } from 'react-hook-form';
import usePromise from 'hooks/usePromise';
import { postRequest } from 'requests/api';
import { IApiResponse } from 'types/request.types';
import RHookFormControl from 'components/forms/RHookFormControl';
import { IAuthFormData } from '@/pages/auth/login';
import useAuthService from 'features/auth/hooks/useAuthService';
import styles from 'styles/cart-checkout/checkout/style.module.scss';

type ILoginFormProps = {
  setLoginFormState: (data: IAuthFormData) => void;
};

type ILoginRequest = {
  email: string;
};

const formSchema: SchemaOf<ILoginRequest> = object().shape({
  email: string().label('Email').required().email(),
});

export default function LoginForm({ setLoginFormState }: ILoginFormProps) {
  const setAuth = useAuthService();
  const [_mail, _setMail] = useState('');

  const { methods, submitHandler, isLoading } = useReactForm<{ user_exist: boolean; user: any }, ILoginRequest>(
    'post',
    `/auth/login`,
    formSchema,
    undefined,
    {
      onSuccess: ({ user_exist, user }) => {
        console.log({methods}, methods.getValues('email'), {user} )
        setLoginFormState({ email: methods.getValues('email'), exists: user_exist, first_name: user.first_name });
      },
    }
  );

  const { callApi, isPending } = usePromise((user: ISocialAuthUser) =>
    postRequest<IApiResponse<{ token: string; user: IUserSchema }>>(`/auth/social/`, user)
  );

  async function onSocialBtnSuccess(user: ISocialAuthUser) {
    const response = await callApi(user).catch(() => null);
    if (response) {
      const data = response.data;
      setAuth(data.token, data.user);
    }
  }

  return (
    <>
      <AuthLayoutTitle>Login or Create an Account</AuthLayoutTitle>
      <FormProvider {...methods}>
        <form onSubmit={submitHandler}>
          <div className={style.wrapper}>
            <RHookFormControl
              name={'email'}
              type={'email'}
              autoComplete={'email'}
              inputClassName={style.email}
              label={'Email Address'}
              placeholder={'Enter Email Address'}
            />
            <button type="submit" className={style.emailButton}>
            {isLoading ? <div className={`${styles.spinner}`} ><svg className={`${styles.spin}`} viewBox="0 0 50 50">
              <circle  className={`${styles.path}`} cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
                  </svg> Submitting </div> :  'Continue with Email'}
            </button>
            <div className={style.orWrapper}>
              <p className={style.or}>OR</p>
            </div>
            <GoogleAuthBtn onSuccess={onSocialBtnSuccess} disabled={isPending || isLoading} />
            <FacebookAuthBtn onSuccess={onSocialBtnSuccess} disabled={isPending || isLoading} />
            <div className={style.bottom_text}>
              <p className="text-xs ">
                By continuing, you agree to{' '}
                <a className={style.a_text} href="@/pages/auth/login#">
                  Terms of use
                </a>{' '}
                &
                <a className={style.a_text} href="@/pages/auth/login#">
                  Privacy policy
                </a>
                .
              </p>
            </div>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
