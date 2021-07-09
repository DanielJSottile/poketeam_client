import React from 'react';

type Props = {
  /** class for input container */
  containerClass?: string;
  /** id for the form the input lives in */
  htmlFor?: string;
  /** determines if there is a label for the input */
  labelClass?: string;
  /** label string*/
  label?: string;
  /** optional icon to be appended to the label */
  labelIcon?: JSX.Element;
  /** determines if the input has an error or not */
  inputHasError: boolean;
  /** determines if the error is triggered or not */
  isError?: boolean;
  /** function used to validate the input and provide feedback errors*/
  validationCallback?: () => void;
  /** style for the input */
  inputClass?: string;
  /** value of the input */
  value?: string | number;
  /** placeholder string */
  placeholder?: string;
  /** function used for onChange for the input */
  onChangeCallback?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** string of input type */
  type?: string;
  /** string of input name for form*/
  name?: string;
  /** string of input id */
  id?: string;
  /** determines whether the input is readonly or not */
  readOnly?: boolean;
  /** optional boolean to determine whether a checked input is checked */
  checked?: boolean;
  /** minimum input number */
  min?: string;
  /** maximum input number */
  max?: string;
  /** autocomplete string */
  autoComplete?: string;
  /** boolean for whether the input is required */
  required?: boolean;
  /** boolean for whether the input is disabled */
  disabled?: boolean;
};

const Input: React.FC<Props> = ({
  containerClass = '',
  htmlFor = '',
  labelClass = '',
  label = '',
  labelIcon,
  inputHasError = false,
  isError = false,
  validationCallback = () => null,
  inputClass,
  value = '',
  placeholder,
  onChangeCallback = () => null,
  type = '',
  name = '',
  id = '',
  readOnly = false,
  checked = false,
  min,
  max,
  autoComplete,
  required = false,
  disabled = false,
}) => {
  return (
    <div className={containerClass}>
      {!!label && (
        <label className={labelClass} htmlFor={htmlFor}>
          {label}
          {labelIcon}
        </label>
      )}
      {isError && inputHasError && (
        <p className="error-validate shake-horizontal">{validationCallback}</p>
      )}
      <input
        className={inputClass}
        placeholder={placeholder}
        value={value}
        onChange={onChangeCallback}
        type={type}
        name={name}
        id={id}
        readOnly={readOnly}
        checked={checked}
        min={min}
        max={max}
        autoComplete={autoComplete}
        required={required}
        disabled={disabled}
      />
    </div>
  );
};

export default Input;
