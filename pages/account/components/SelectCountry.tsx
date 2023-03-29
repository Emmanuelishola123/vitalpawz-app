import React, { FC } from 'react';
import Select from 'react-select';


interface IMySelectProps {
  state?: any;
  setState?: any;
  optionsArr?: any;
  classNamePrefix?: string;
  placeholder?: string;
}

const SelectCountry: FC<IMySelectProps> = ({ state, setState, optionsArr, classNamePrefix, placeholder }) => {

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
      classNamePrefix={classNamePrefix}
      isSearchable={false}
      components={{
        IndicatorSeparator: () => null,
      }} />

  );
};

export default SelectCountry;
