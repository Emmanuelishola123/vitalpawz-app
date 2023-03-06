import React, { useState } from 'react';
import MainLayout from 'layouts/MainLayout';
import Banner from 'components/Banner';
import style from 'styles/RewardProgram.module.scss';
import createGetServerSidePropsFn from 'shared/createGetServerSidePropsFn';
import Image from 'next/image';
import dogImg from 'public/img/hero-section/bitmap@3x.webp';
import shopIcon from 'public/img/reward-program/shop.webp';
import trophyIcon from 'public/img/reward-program/trophy.webp';

import MyFaq from 'components/MyFaq';

const title = 'Rewards Program';
const description =
  'For some of our most common questions about Pet Hemp Company products and business practices please read through our frequently asked questions below';

const faqItems = [
  {
    title: 'Will Pet Hemp Company products conflict with any other pet medications?',
    description:
      'If you’ve never been through dog training, it’s helpful to know how it works before you sign up. You’ll learn what to expect with each class and be able to continue following the proper training principles at home. The Petco-certified Positive Dog Trainers at Petco abide by a science-based, positive reinforcement dog-training philosophy. This means that training classes follow rewards-based, fun and effective methods to instill positive behaviors and that appeal to your dog. Training focuses on rewarding dogs for doing things correctly, making them more likely to repeat those behaviors, while dissuading negative behaviors through management and refocusing tactics. Positive reinforcement training has been proven effective in not only training any type learner but also in building a strong bond between pet parents and their dogs.',
  },
  {
    title: 'Will my pet experience any negative side effects from using CBD?',
    description:
      'If you’ve never been through dog training, it’s helpful to know how it works before you sign up. You’ll learn what to expect with each class and be able to continue following the proper training principles at home. The Petco-certified Positive Dog Trainers at Petco abide by a science-based, positive reinforcement dog-training philosophy. This means that training classes follow rewards-based, fun and effective methods to instill positive behaviors and that appeal to your dog. Training focuses on rewarding dogs for doing things correctly, making them more likely to repeat those behaviors, while dissuading negative behaviors through management and refocusing tactics. Positive reinforcement training has been proven effective in not only training any type learner but also in building a strong bond between pet parents and their dogs.',
  },
  {
    title: 'Will Pet Hemp Company products conflict with any other pet medications?',
    description:
      'If you’ve never been through dog training, it’s helpful to know how it works before you sign up. You’ll learn what to expect with each class and be able to continue following the proper training principles at home. The Petco-certified Positive Dog Trainers at Petco abide by a science-based, positive reinforcement dog-training philosophy. This means that training classes follow rewards-based, fun and effective methods to instill positive behaviors and that appeal to your dog. Training focuses on rewarding dogs for doing things correctly, making them more likely to repeat those behaviors, while dissuading negative behaviors through management and refocusing tactics. Positive reinforcement training has been proven effective in not only training any type learner but also in building a strong bond between pet parents and their dogs.',
  },
  {
    title: 'Will Pet Hemp Company products conflict with any other pet?',
    description:
      'If you’ve never been through dog training, it’s helpful to know how it works before you sign up. You’ll learn what to expect with each class and be able to continue following the proper training principles at home. The Petco-certified Positive Dog Trainers at Petco abide by a science-based, positive reinforcement dog-training philosophy. This means that training classes follow rewards-based, fun and effective methods to instill positive behaviors and that appeal to your dog. Training focuses on rewarding dogs for doing things correctly, making them more likely to repeat those behaviors, while dissuading negative behaviors through management and refocusing tactics. Positive reinforcement training has been proven effective in not only training any type learner but also in building a strong bond between pet parents and their dogs.',
  },
  {
    title: 'Will my pet experience any negative side effects from using CBD?',
    description:
      'If you’ve never been through dog training, it’s helpful to know how it works before you sign up. You’ll learn what to expect with each class and be able to continue following the proper training principles at home. The Petco-certified Positive Dog Trainers at Petco abide by a science-based, positive reinforcement dog-training philosophy. This means that training classes follow rewards-based, fun and effective methods to instill positive behaviors and that appeal to your dog. Training focuses on rewarding dogs for doing things correctly, making them more likely to repeat those behaviors, while dissuading negative behaviors through management and refocusing tactics. Positive reinforcement training has been proven effective in not only training any type learner but also in building a strong bond between pet parents and their dogs.',
  },
];

const Blogs = () => {
  return (
    <div className={style.main}>
      <Banner title={title} image={dogImg} description={description} />
      <div className={style.wrapper}>
        <div className={style.content}>
          <div className="py-80px">
            <div className="text-center mx-auto md:w-2/4">
              <h4 className={`${style.section_title} pb-7px`}>How it works?</h4>
              <p className={style.section_desc2}>
                Any parent will tell you that colic is one of the most excruciating experiences of early parenthood. The
                baby cries as if in dire pain.
              </p>
            </div>

            <div className="pt-50px grid grid-cols-3 xl:gap-20 lg:gap-14 gap-10">
              <div className="md:col-span-1 col-span-3">
                <div className="w-50px mx-auto pb-21px">
                  <Image src={shopIcon} objectFit="contain" layout="responsive" />
                </div>
                <div className="text-center">
                  <h4 className={style.section_sub_title}>Shop from VitalPawz</h4>
                  <p className={style.section_desc}>
                    If you’ve never been through dog training, it’s helpful to know how it works before you sign up.
                    You’ll learn what to expect.
                  </p>
                </div>
              </div>
              <div className="md:col-span-1 col-span-3">
                <div className="w-50px mx-auto pb-21px">
                  <Image src={trophyIcon} objectFit="contain" layout="responsive" />
                </div>
                <div className="text-center">
                  <h4 className={style.section_sub_title}>Earn from VitalPawz </h4>
                  <p className={style.section_desc}>
                    If you’ve never been through dog training, it’s helpful to know how it works before you sign up.
                    You’ll learn what to expect.
                  </p>
                </div>
              </div>
              <div className="md:col-span-1 col-span-3">
                <div className="w-50px mx-auto pb-21px">
                  <Image src={shopIcon} objectFit="contain" layout="responsive" />
                </div>
                <div className="text-center">
                  <h4 className={style.section_sub_title}>Redeem Points</h4>
                  <p className={style.section_desc}>
                    If you’ve never been through dog training, it’s helpful to know how it works before you sign up.
                    You’ll learn what to expect.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row flex-wrap w-full">
        <div className={`w-2/5 ${style.dogImgBg} hidden md:block`}>
          {/* <Image src={dogImg2} objectFit="contain" layout="responsive" /> */}
        </div>
        <div className="flex-1 xl:py-80px xl:px-[90px] lg:py-[60px] lg:px-[70px] md:py-[30px] md:px-[40px] py-[45px] px-[20px] bg-light-purple">
          <h4 className={`${style.section_sub_title} mb-10px`}>How to collect</h4>
          <p className={`${style.section_desc} xl:w-3/4 mb-19px`}>
            Access existing perks, savings and rewards just by shopping with us! Earn more Points for completing
            different actions with our rewards program.If you’ve never been through dog training, it’s helpful to know
            how it works before you sign up. You’ll learn what to expect.
          </p>
          <div className="xl:w-4/6 lg:w-5/6">
            <table className={style.pointsTable}>
              <tbody>
                <tr>
                  <td>Make a Purchase</td>
                  <td className={style.points}>1 Point</td>
                </tr>
                <tr>
                  <td>Create an Account</td>
                  <td className={style.points}>10 Point</td>
                </tr>
                <tr>
                  <td>Instagram Follow</td>
                  <td className={style.points}>20 Point</td>
                </tr>
                <tr>
                  <td>Facebook Share</td>
                  <td className={style.points}>30 Point</td>
                </tr>
                <tr>
                  <td>Facebook Follow</td>
                  <td className={style.points}>40 Point</td>
                </tr>
                <tr>
                  <td>Celebrate Birthday</td>
                  <td className={style.points}>50 Point</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className={style.wrapper}>
        <div className={style.content}>
          <div className="md:py-[130px] py-50px">
            <MyFaq uniqueClass="rewardProgramFaq" heading_title="Rewards FAQ" items={faqItems} />
          </div>
        </div>
      </div>
    </div>
  );
};

// export const getServerSideProps = createGetServerSidePropsFn(Blogs);

Blogs.Layout = MainLayout;

export default Blogs;
