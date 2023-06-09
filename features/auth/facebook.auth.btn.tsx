import FacebookLogin from '@greatsumini/react-facebook-login';
import facebook_icon from 'public/img/logo/icon-24-facebook.svg';
import Image from 'next/image';
import { ISocialAuthUser } from 'types/auth.types';
import { ButtonHTMLAttributes } from 'react';
import {getEnv} from "@/bootstrap/app.config";

type IFbBtnResponse = ISocialAuthUser & {
  picture: {
    data: {
      height: number;
      is_silhouette: boolean;
      url: string;
      width: number;
    };
  };
};

type IFbLoginBtnProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  onSuccess: (user: ISocialAuthUser) => void;
};

export default function FacebookAuthBtn({ onSuccess, ...btnProps }: IFbLoginBtnProps) {
  const onLogin = (response: IFbBtnResponse) => {
    onSuccess({
      name: response.name,
      email: response.email,
      imageUrl: response.picture?.data?.url || '',
      id: response.id,
    });
  };

  return (
    <>
      <FacebookLogin
        appId={getEnv('fbAppId')}
        onProfileSuccess={(response: unknown) => {
          onLogin(response as IFbBtnResponse);
        }}
        render={({ onClick }) => (
          <button
            onClick={onClick}
            type="button"
            className="w-full border border-middle-white rounded-lg pt-17px pb-19px mb-4 flex justify-center"
            {...btnProps}
          >
            <Image src={facebook_icon} alt="fb_logo" className="h-6 w-6" />
            <p className="ml-11px  text-sm">Continue with Facebook</p>
          </button>
        )}
      />
    </>
  );
}
