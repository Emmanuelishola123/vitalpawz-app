import AuthLayout from 'layouts/Auth2.layout';
import createGetServerSidePropsFn from 'shared/createGetServerSidePropsFn';
import MySelect from './components/MySelectL';
import RangeSlider from './components/MyRangeSlider';
import Question from './components/Question';
import MyInputL from './components/MyInputL';
import ImgOption from './components/ImgOption';
import BlockOption from './components/BlockOption';
import FormControl, { FormControlName } from './components/FormControl';
import style from 'styles/AddPet.module.scss';
import PrimarySmall from 'components/Buttons/PrimarySmall';
import useWindowDimensions from '@/app/hooks/useWindowDimensions';
import { useForm, FormProvider } from 'react-hook-form';
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { number, object, string, array } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';

const stateOptions = [
  { value: 'German Shepherd', label: 'German Shepherd' },
  { value: 'Golden Retriever', label: 'Golden Retriever' },
  { value: 'Beagle', label: 'Beagle' },
  { value: 'Bulldog', label: 'Bulldog' },
  { value: 'Yorkshire', label: 'Yorkshire Terrier' },
];

const petOptions = [
  { value: 'dog', iconUrl: '/img/add-pet/dog.webp', activeIconUrl: '/img/add-pet/dog_active.webp' },
  { value: 'cat', iconUrl: '/img/add-pet/cat.webp', activeIconUrl: '/img/add-pet/cat_active.webp' },
  { value: 'paw', iconUrl: '/img/add-pet/paw.webp', activeIconUrl: '/img/add-pet/paw_active.webp' },
];

const healthOptions = [
  { value: 'General Health', title: 'General Health' },
  { value: 'Allergies', title: 'Allergies' },
  { value: 'Sensitive Skin', title: 'Sensitive Skin' },
  { value: 'Hip or Joint ', title: 'Hip or Joint ' },
  { value: 'Digestive Issues ', title: 'Digestive Issues ' },
];

const formSchema = object().shape({
  petConcern: array('An error occurred.')
    .of(string())
    .label('Pet Concern')
    .required('This field is required.')
    .min(1, 'Please select an option.'),
  petName: string('This field must be a text.').label('Pet Name').required('This field is required.'),
  selectPet: string('This field must be a text.').label('Pet').required('This field is required.'),
  selectBreed: object().typeError('Please select an option.').label('Breed').required('This field is required.'),
  petAge: number('Age must be a number')
    .typeError('Age must be a number')
    .label('Pet Age')
    .required('This field is required.')
    .moreThan(0, 'Age must be more than 0'),
  petWeight: number('Weight must be a number.')
    .typeError('Weight must be a number')
    .label('Pet Weight')
    .required('This field is required.')
    .moreThan(0, 'Weight must be more than 0'),
});

const defaultValues = {
  petAge: 0,
  petConcern: [],
  petName: '',
  petWeight: '',
  selectBreed: null,
  selectPet: '',
};

const questions = [
  {
    no: 1,
    title: 'Niceee! Has a name?',
    name: 'petName',
  },
  {
    no: 2,
    title: 'What pet do you have?',
    name: 'selectPet',
  },
  {
    no: 3,
    title: 'And what breed?',
    name: 'selectBreed',
  },
  {
    no: 4,
    title: 'How old is Kenny?',
    sub_title: ' years',
    name: 'petAge',
  },
  {
    no: 5,
    title: 'What is Kenny’s weight?',
    name: 'petWeight',
  },
  {
    no: 6,
    title: 'What is the major concerns?',
    name: 'petConcern',
  },
];

const QuestionItems = ({ name, width, ...props }) => {
  {
    switch (name) {
      case 'petName':
        return <MyInputL placeholder="Type Name..." {...props} />;
        break;

      case 'selectPet':
        return (
          <div className="flex flex-row flex-wrap mt-20px">
            {petOptions.map((item, index) => (
              <ImgOption width={width} item={item} index={index} {...props} />
            ))}
          </div>
        );
        break;

      case 'selectBreed':
        return (
          <MySelect
            optionsArr={stateOptions}
            classNamePrefix="mySelectL"
            searchPlaceholder="Search Breed"
            placeholder={'Search'}
            menuPosition={width > 1024 ? 'fixed' : 'absolute'}
            // menuShouldBlockScroll="true"
            menuShouldScrollIntoView="true"
            menuPlacement="auto"
            {...props}
          />
        );
        break;

      case 'petAge':
        return <RangeSlider className="MyRangeSlider" tooltip={false} {...props} />;
        break;

      case 'petWeight':
        return <MyInputL subLabelText={'in Kg'} inputType="number" {...props} />;
        break;

      case 'petConcern':
        return healthOptions.map((item, index) => <BlockOption item={item} index={index} {...props} />);
        break;

      default:
        return <></>;
        break;
    }
  }
};

const Questions = ({ width }) => {
  return questions.map((q, index) => (
    <Question
      index={index}
      id={`question-${q.no}`}
      className={`lg:pb-[100px] lg:pt-[150px] ${q.no == 1 ? 'lg:!pt-[250px]' : ''} ${
        q.no == 6 ? '!lg:pb-[150px]' : ''
      } ${q.name == 'selectBreed' ? 'scroll-mb-36' : ''} snap-center py-31px`}
      q={q.title}
      q_no={q.no}
      name={q.name}
      sub_title={q.sub_title}
    >
      <FormControl>
        <FormControlName>{q.name}</FormControlName>
        <QuestionItems index={index} width={width} name={q.name} />
      </FormControl>
    </Question>
  ));
};

const AddPet = () => {
  const { push } = useRouter();
  const methods = useForm({ resolver: yupResolver(formSchema), defaultValues: defaultValues });

  const {
    trigger,
    formState: { errors },
    watch,
    control,
  } = methods;

  watch();

  const { width } = useWindowDimensions();

  const [question, setQuestion] = useState(1);

  const bodyHeightClass = classNames({
    [`${style.bodyWrapper}`]: true,
    'lg:h-[620px]': question < 6,
    'lg:h-[850px]': question >= 6,
  });

  const handleNextStepButton = async (e) => {
    const getQuestion = questions.filter((item) => item.no == question);

    if (getQuestion) {
      const { name, no } = getQuestion[0];
      const waitForValidate = await trigger(`${name}`);
      if (waitForValidate) {
        setQuestion((prev) => prev + 1);
      } else {
        const element = document.getElementById(`question-${no}`);
        element?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }

    console.log('handleNextStepButton');
  };

  const handleResultButton = async (e) => {
    const waitForValidate = await trigger();
    if (waitForValidate) {
      push('/add-pet/recommendation');
    }
    console.log('handleResultButton');
  };

  useEffect(() => {
    const element = document.getElementById(`question-${question}`);
    element?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }, [question]);

  useEffect(() => {
    const keyEnter = async (event) => {
      if (event.key === 'Enter') {
        if (width < 1024) {
          await handleResultButton();
        }
        if (question >= 6) {
          await handleResultButton();
        } else {
          await handleNextStepButton();
        }
      }
    };

    document.addEventListener('keydown', keyEnter);

    return () => {
      document.removeEventListener('keydown', keyEnter);
    };
  }, [question, width]);

  return (
    <>
      <FormProvider {...methods}>
        <div className={`${bodyHeightClass}`}>
          <div className={style.header}>
            <p className={style.title}>Product Recommendation</p>
            <p className={style.desc}>
              Unsure of what product is right for your pet, answer few questions and we will recommend you some
              products.
            </p>
          </div>

          <Questions width={width} />
          {/*
           <Question id="question-1" className="scroll-mt-[250px]" q="Niceee! Has a name?">
            <FormControl>
              <FormControlName>petName</FormControlName>
              <MyInputL placeholder="Type Name..." />
            </FormControl>
          </Question>
          <Question id="question-2" className="lg:mt-[120px] mt-[31px] scroll-mt-[200px]" q="What pet do you have?">
            <div className="flex flex-row flex-wrap mt-20px">
              <FormControl>
                <FormControlName>selectPet</FormControlName>
                {petOptions.map((item, index) => (
                  <ImgOption width={width} item={item} index={index} />
                ))}
              </FormControl>
            </div>
          </Question>
          <Question id="question-3" className="lg:mt-[120px] mt-[31px] scroll-mt-[250px]" q="And what breed?">
            <FormControl>
              <FormControlName>selectBreed</FormControlName>
              <MySelect
                optionsArr={stateOptions}
                classNamePrefix="mySelectL"
                searchPlaceholder="Search Breed"
                placeholder={'Search'}
              />
            </FormControl>
          </Question>
          <div id="question-4" className="lg:mt-[120px] mt-[31px] scroll-mt-[250px]">
            <span className={style.qSubHeading}>
              Question <b>1 0f 6</b>
            </span>
            <div className="flex flex-row justify-between">
              <h4 className={style.qMainHeading}>{'How old is Kenny?'}</h4>
              <span className="text-xl text-purple font-bold">{getValues('petAge')} years</span>
            </div>

            <FormControl>
              <FormControlName>petAge</FormControlName>
              <RangeSlider className="MyRangeSlider" tooltip={false} />
            </FormControl>
          </div>
          <Question id="question-5" className="lg:mt-[120px] mt-[31px] scroll-mt-[250px]" q="What is Kenny’s weight?">
            <FormControl>
              <FormControlName>petWeight</FormControlName>
              <MyInputL subLabelText={'in Kg'} inputType="number" />
            </FormControl>
          </Question>
          <Question
            id="question-6"
            className="lg:mt-[120px] mt-[31px] lg:mb-[140px] mb-[40px] scroll-mt-[100px]"
            q="What is the major concerns?"
          >
            <FormControl>
              <FormControlName>petConcern</FormControlName>
              {healthOptions.map((item, index) => (
                <BlockOption item={item} index={index} />
              ))}
            </FormControl>
          </Question> 
          */}

          {width < 1024 && (
            <div>
              <PrimarySmall onClick={handleResultButton} className="w-full h-[62px]" text="See Recommended Products" />
            </div>
          )}

          <div className={style.buttonWrapper}>
            {question >= 6 ? (
              <PrimarySmall onClick={handleResultButton} className="w-full h-[62px]" text="See Recommended Products" />
            ) : (
              <PrimarySmall onClick={handleNextStepButton} className="w-full h-[62px]" text="Next" />
            )}
          </div>
        </div>
      </FormProvider>
    </>
  );
};

export const getServerSideProps = createGetServerSidePropsFn(AddPet);
AddPet.Layout = AuthLayout;
export default AddPet;
