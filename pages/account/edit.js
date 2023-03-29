import styles from 'styles/account/edit.module.scss';
import InputLabel from 'components/InputLabel';
import MyAccountLayout from 'layouts/MyAccountLayout';
import createGetServerSidePropsFn from 'shared/createGetServerSidePropsFn';
import PrimarySmall from 'components/Buttons/PrimarySmall';
import SecondarySmall from 'components/Buttons/SecondarySmall';
import { useAuthState } from '@/app/atom/auth.atom';
import useReactForm from './../../../vitalpawz-app old/app/hooks/useReactForm';
import { useMutation } from '@tanstack/react-query';
import { updateAccount } from './../../services/accountApis';
import { useState, useEffect } from 'react';
import btnStyle from '../../styles/cart-checkout/checkout/style.module.scss';
import useAuthService from '@/features/auth/hooks/useAuthService';
import { toast } from 'react-toastify';


const EditAccount = () => {
  const [_authState, setAuthState] = useAuthState();
  const setAuth = useAuthService();
  const [userData, setUserData] = useState({});
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');

  console.log({ _authState, userData });

  // Update account api
  const { mutate, isLoading, error } = useMutation(updateAccount, {
    onSuccess: (data) => {
      console.log(data.data.data);
      setAuth(  _authState?.token,data?.data?.data );
      return toast.success('Profile updated successfully!');
    },
    onError: (error) => {
      console.log(error);
      return toast.warning('Please enter your name');
    },
  });

  const handleUpdate = () => {
    mutate({ ...userData });
  };

  useEffect(() => {
    return () =>
      setUserData({
        email: _authState?.user?.email,
        full_name: _authState?.user?.full_name,
        mobile: _authState?.user?.mobile,
        token: _authState?.token,
      });
  }, [_authState]);

  useEffect(() => {
    setUserData((prev) => ({ ...prev, email: email }));
  }, [email]);

  useEffect(() => {
    setUserData((prev) => ({ ...prev, mobile: mobile }));
  }, [mobile]);

  useEffect(() => {
    setUserData((prev) => ({ ...prev, full_name: fullName }));
  }, [fullName]);

  return (
    <>
      <h4 className={styles.title}>{_authState?.user.full_name}</h4>
      <div className={styles.editProfile}>
        <div className="w-full lg:w-2/4 pr-0 lg:pr-[20px] mb-[30px] lg:mb-0">
          <InputLabel
            label="Full Name"
            inputType={'text'}
            inputPlaceholder=""
            inputValue={_authState?.user.full_name}
            handleOnChange={setFullName}
          />
        </div>
        <div className="w-full lg:w-2/4 mb-[30px]">
          <InputLabel
            handleOnChange={setMobile}
            label="Phone Number"
            inputType={'text'}
            inputPlaceholder="Enter number"
          />
        </div>
        <div className="w-full">
          <InputLabel
            handleOnChange={setEmail}
            label="Email"
            inputType={'email'}
            inputPlaceholder=""
            inputValue={_authState?.user.email}
          />

          <span className="text-base mt-1 block">
            To ensure security we will send a verification link to new email address
          </span>
        </div>
        <div className="w-full mt-[28px]">
          <PrimarySmall
            className="w-[168px] h-[44px] mr-10px mb-11px md:mb-0"
            onClick={handleUpdate}
            text={
              isLoading ? (
                <div className={`${btnStyle.spinner}`}>
                  <svg className={`${btnStyle.spin}`} viewBox="0 0 50 50">
                    <circle className={`${btnStyle.path}`} cx="25" cy="25" r="18" fill="none" stroke-width="5"></circle>
                  </svg>{' '}
                  Updating{' '}
                </div>
              ) : (
                'Save Changes'
              )
            }
          />
          <SecondarySmall className="w-[168px] h-[44px]" text="Cancel" />
        </div>
      </div>
    </>
  );
};

EditAccount.Layout = MyAccountLayout;

// export const getServerSideProps = createGetServerSidePropsFn(EditAccount);

export default EditAccount;
