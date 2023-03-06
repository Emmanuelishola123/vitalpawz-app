import React from 'react';
import styles from 'styles/InputLabel.module.scss';

const InputLabel = ({ label, inputType, inputPlaceholder, inputValue }) => {
  return (
    <div className={styles.editLabelInput}>
      {Label({ label })}
      {Input({ inputType, inputPlaceholder, inputValue })}
    </div>
  );
};

export default InputLabel;

export const Label = ({ label }) => {
  return <label className={styles.label}>{label}</label>;
};

export const Input = ({ inputType, inputPlaceholder, inputValue }) => {
  return (
    <input
      className={styles.input}
      type={inputType}
      placeholder={inputPlaceholder}
      defaultValue={inputValue ? inputValue : ''}
    />
  );
};

export const TextArea = ({ rows, cols, inputValue }) => {
  return (
    <textarea className={styles.input} rows={rows} cols={cols}>
      {inputValue}
    </textarea>
  );
};
