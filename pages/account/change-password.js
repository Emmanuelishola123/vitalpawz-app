import createGetServerSidePropsFn from 'shared/createGetServerSidePropsFn';

import PrimarySmall from 'components/Buttons/PrimarySmall';
import InputLabel from 'components/InputLabel';
import MyAccountLayout from 'layouts/MyAccountLayout';
import styles from 'styles/account/edit.module.scss';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useAuthState } from '@/app/atom/auth.atom';
import { updatePassword } from './../../services/accountApis';

const EditAccount = () => {
  const [_authState, setAuthState] = useAuthState();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Update account api
  const { mutate, isLoading, error } = useMutation(updatePassword, {
    onSuccess: (data) => {
      console.log(data.data.data);
      // setAuth(  _authState?.token,data?.data?.data );
    },
    onError: (error) => {
      console.log(error);
      // Error actions
    },
  });

  const handleUpdate = () => {
    mutate({ password: password, confirm: confirmPassword, token: token });
  };

  return (
    <>
      <h4 className={styles.title}>Change Password</h4>

      <div className={styles.editProfile}>
        <div className="w-full xl:w-2/4 lg:w-4/6 mb-[30px] lg:mb-0">
          <InputLabel
            label="New Password"
            inputType={'text'}
            inputPlaceholder="New Password"
            handleOnchange={setPassword}
          />
        </div>
        <div className="w-full"></div>
        <div className="w-full xl:w-2/4 lg:w-4/6 mb-[30px] mt-[25px]">
          <InputLabel
            label="Confirm Password"
            inputType={'text'}
            inputPlaceholder="Confirm Password"
            handleOnchange={setConfirmPassword}
          />
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
                'Update Password'
              )
            }
          />
        </div>
      </div>
    </>
  );
};

EditAccount.Layout = MyAccountLayout;

// export const getServerSideProps = createGetServerSidePropsFn(EditAccount);

export default EditAccount;
