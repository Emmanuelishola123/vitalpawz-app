import styles from 'styles/account/editAddress.module.scss';
import InputLabel from 'components/InputLabel';
import MainLayout from 'layouts/MainLayout';
import createGetServerSidePropsFn from 'shared/createGetServerSidePropsFn';
import PrimarySmall from 'components/Buttons/PrimarySmall';
import SecondarySmall from 'components/Buttons/SecondarySmall';
import { Label } from 'components/InputLabel';
import MySelect from '@/components/CartItems/componentsCartItem/MySelect';

import Link from 'next/link';

const EditAccount = () => {
  return (
    <div className={styles.mainBody}>
      <div className={styles.wrapper}>
        <div className={styles.contentWrapper}>
          <div className={styles.editAdressBox}>
            <div className={styles.box}>
              <span className={styles.shortUrl}>
                <Link href={'#'}>My Account / Delivery Address / Edit Address</Link>
              </span>
              <h4 className={styles.title}>Edit Address</h4>
            </div>
            <div className={`${styles.box} flex flex-row flex-wrap`}>
              <div className="w-2/4 mb-[30px] pr-11px">
                <InputLabel label="Full Name" inputType={'text'} inputPlaceholder="Elizabeth Collins" />
              </div>
              <div className="w-2/4 mb-[30px]">
                <InputLabel label="Phone Number" inputType={'text'} inputPlaceholder="116-30-9372" />
              </div>
              <div className="w-full mb-[30px]">
                <InputLabel label="Street Address" inputType={'text'} inputPlaceholder="801 Trouser Leg Road" />
              </div>
              <div className="sm:w-1/3 w-2/4 mb-[30px] pr-11px">
                <InputLabel label="City" inputType={'text'} inputPlaceholder="Greenfield" />
              </div>
              <div className="sm:w-1/3 w-2/4 mb-[30px] pr-11px">
                <Label label="Address" />
                <MySelect
                  optionsArr={[
                    {
                      label: '801 Trouser Leg Road, Greenfield, Massachusetts, 01301',
                      value: '801 Trouser Leg Road, Greenfield, Massachusetts, 01301',
                    },
                  ]}
                  placeholder={'801 Trouser Leg Road, Greenfield, Massachusetts, 01301'}
                  classNamePrefix={'mySelect2'}
                />
              </div>
              <div className="sm:w-1/3 w-full mb-[30px]">
                <InputLabel label="ZIP Code" inputType={'text'} inputPlaceholder="201301" />
              </div>
              <div className="w-full mt-10px">
                <PrimarySmall className="w-[168px] h-[44px] mr-10px mb-11px md:mb-0" text="Save Changes" />
                <SecondarySmall className="w-[168px] h-[44px]" text="Cancel" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

EditAccount.Layout = MainLayout;

// export const getServerSideProps = createGetServerSidePropsFn(EditAccount);

export default EditAccount;
