import React, { FC } from 'react';
import Select from 'react-select';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

interface IMySelectProps {
  state?: any;
  setState?: any;
  optionsArr?: any;
  classNamePrefix?: string;
  placeholder?: string;
}

const MySelect: FC<IMySelectProps> = ({ state, setState, optionsArr = options, classNamePrefix, placeholder }) => {
  const handleChange = (selectedOption: any) => {
    setState(selectedOption);
  };
  return (
    <Select
      value={state}
      placeholder={placeholder}
      className="mySelect"
      onChange={handleChange}
      options={optionsArr}
      getOptionLabel={(option) => option.title}
      classNamePrefix={classNamePrefix}
      isSearchable={false}
      components={{
        IndicatorSeparator: () => null,
      }}
    />
  );
};

export default MySelect;
