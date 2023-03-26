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

const EditAccount = () => {
  const [_authState, setAuthState] = useAuthState();
  const [userData, setUserData] = useState({});
  console.log({_authState});

  // Update account api
  const [mutate, { status }] = useMutation((updatedData) => updateAccount(updatedData))

  const handleUpdate = () => {
    mutate({ ...userData });
  };

  useEffect(() => {
    return () => {
      setUserData({..._authState})
    }
  }, [_authState])
  

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
          />
        </div>
        <div className="w-full lg:w-2/4 mb-[30px]">
          <InputLabel label="Phone Number" inputType={'text'} inputPlaceholder="Enter number" />
        </div>
        <div className="w-full">
          <InputLabel label="Email" inputType={'email'} inputPlaceholder="" inputValue={_authState?.user.email} />

          <span className="text-base mt-1 block">
            To ensure security we will send a verification link to new email address
          </span>
        </div>
        <div className="w-full mt-[28px]">
          <PrimarySmall className="w-[168px] h-[44px] mr-10px mb-11px md:mb-0" text="Save Changes" />
          <SecondarySmall className="w-[168px] h-[44px]" text="Cancel" />
        </div>
      </div>
    </>
  );
};

EditAccount.Layout = MyAccountLayout;

// export const getServerSideProps = createGetServerSidePropsFn(EditAccount);

export default EditAccount;
