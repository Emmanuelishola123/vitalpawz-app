import styles from 'styles/account/edit.module.scss';
import InputLabel from 'components/InputLabel';
import MyAccountLayout from 'layouts/MyAccountLayout';
import createGetServerSidePropsFn from 'shared/createGetServerSidePropsFn';
import PrimarySmall from 'components/Buttons/PrimarySmall';
import SecondarySmall from 'components/Buttons/SecondarySmall';

const EditAccount = () => {
  return (
    <>
      <h4 className={styles.title}>Personal Information</h4>
      <div className={styles.editProfile}>
        <div className="w-full lg:w-2/4 pr-0 lg:pr-[20px] mb-[30px] lg:mb-0">
          <InputLabel label="Full Name" inputType={'text'} inputPlaceholder="Elizabeth Collins" />
        </div>
        <div className="w-full lg:w-2/4 mb-[30px]">
          <InputLabel label="Phone Number" inputType={'text'} inputPlaceholder="116-30-9372" />
        </div>
        <div className="w-full">
          <InputLabel label="Email" inputType={'email'} inputPlaceholder="elizabeth.collins@gmail.com" />

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
