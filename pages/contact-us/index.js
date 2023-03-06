import React from 'react';
import MainLayout from 'layouts/MainLayout';
import Banner from 'components/BannerNoImage';
import style from 'styles/ContactUs.module.scss';
import createGetServerSidePropsFn from 'shared/createGetServerSidePropsFn';
import Image from 'next/image';
import dogImg from 'public/img/hero-section/bitmap@3x.webp';
import mailIcon from 'public/img/contact-us/mail.webp';
import phoneIcon from 'public/img/contact-us/phone.webp';
import locationIcon from 'public/img/contact-us/location.webp';

import InputLabel from 'components/InputLabel';
import { TextArea, Label } from 'components/InputLabel';
import PrimarySmall from 'components/Buttons/PrimarySmall';

const title = 'Contact Us';
const description = 'We would love to hear from you!';

const Blogs = () => {
  return (
    <div className={style.main}>
      <Banner title={title} image={dogImg} description={description} />

      <div className={style.wrapper}>
        <div className={style.content}>
          <div className="flex md:flex-row flex-col-reverse flex-wrap justify-between">
            <div className="md:py-80px py-31px lg:w-2/4 md:w-3/5 w-full lg:pr-0 pr-17px">
              <div className={style.contactUsItems}>
                <div className={style.item}>
                  <div className={style.icon}>
                    <Image src={phoneIcon} objectFit="contain" layout="responsive" />
                  </div>
                  <div>
                    <span>Call us(Toll Free)</span>
                    <h4>877-738-6742</h4>
                  </div>
                </div>
                <div className={style.item}>
                  <div className={style.icon}>
                    <Image src={mailIcon} objectFit="contain" layout="responsive" />
                  </div>
                  <div>
                    <span>Email</span>
                    <h4>info@petsupply.in</h4>
                  </div>
                </div>
                <div className={style.item}>
                  <div className={style.icon}>
                    <Image src={locationIcon} objectFit="contain" layout="responsive" />
                  </div>
                  <div>
                    <span>Address</span>
                    <h4>8051 Arco Corporate Drive, Suite 100 Raleigh, NC 27617-3390</h4>
                  </div>
                </div>
              </div>

              <div className={style.socials}>
                <div className="md:w-3/5 w-full">
                  <h4>Keep in touch, follow us on:</h4>
                </div>
                <div className="md:w-2/5 w-full">
                  <div className={style.icons}>
                    <div className={`${style.icon}`}>
                      <img src="/img/contact-us/facebook.webp" alt="" />
                    </div>
                    <div className={style.icon}>
                      <img src="/img/contact-us/instagram.webp" alt="" />
                    </div>
                    <div className={style.icon}>
                      <img src="/img/contact-us/pinterst.webp" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-2/5 w-full">
              <div className={`${style.contactUsForm} md:mt-[-140px]`}>
                <p className={style.subHeading}>Submit your queries and we will get back to you.</p>
                <div className="mb-25px">
                  <div className="w-full">
                    <InputLabel label="Full Name" inputType={'text'} inputPlaceholder="" />
                  </div>
                </div>
                <div className="mb-25px">
                  <div className="w-full">
                    <InputLabel label="Contact Number" inputType={'text'} inputPlaceholder="" />
                  </div>
                </div>
                <div className="mb-25px">
                  <div className="w-full">
                    <InputLabel label="Email" inputType={'text'} inputPlaceholder="" />
                  </div>
                </div>
                <div className="mb-25px">
                  <div className="w-full">
                    <Label label="Message" />
                    <TextArea rows="4" />
                    {/* <InputLabel label="Message" inputType={'text'} inputPlaceholder="" /> */}
                  </div>
                </div>
                <div className="w-full">
                  <PrimarySmall className="w-full h-[62px]" text="Send Message" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// export const getServerSideProps = createGetServerSidePropsFn(Blogs);

Blogs.Layout = MainLayout;

export default Blogs;
