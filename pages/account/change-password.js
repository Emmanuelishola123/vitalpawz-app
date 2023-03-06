import createGetServerSidePropsFn from 'shared/createGetServerSidePropsFn';

import PrimarySmall from 'components/Buttons/PrimarySmall';
import InputLabel from 'components/InputLabel';
import MyAccountLayout from 'layouts/MyAccountLayout';
import styles from 'styles/account/edit.module.scss';

const EditAccount = () => {
  return (
    <>
      <h4 className={styles.title}>Change Password</h4>

      <div className={styles.editProfile}>
        <div className="w-full xl:w-2/4 lg:w-4/6 mb-[30px] lg:mb-0">
          <InputLabel label="New Password" inputType={'text'} inputPlaceholder="New Password" />
        </div>
        <div className="w-full"></div>
        <div className="w-full xl:w-2/4 lg:w-4/6 mb-[30px] mt-[25px]">
          <InputLabel label="Confirm Password" inputType={'text'} inputPlaceholder="Confirm Password" />
        </div>

        <div className="w-full mt-[28px]">
          <PrimarySmall className="w-[168px] h-[44px] mr-10px mb-11px md:mb-0" text="Update Password" />
        </div>
      </div>
    </>
  );
};

EditAccount.Layout = MyAccountLayout;

// export const getServerSideProps = createGetServerSidePropsFn(EditAccount);

export default EditAccount;
