import React from "react";
import { Form, Label } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateInput = ({
  input: { value, onChange, onBlur },
  width,
  placeholder,
  meta: { touched, error },
  ...rest
}) => {
  return (
    <Form.Field error={touched && !!error}>
      <DatePicker
        {...rest}
        placeholderText={placeholder}
        // selected={value ? new Date(value) : null}
        //check if we have a value. if we have a value, check if the Object is not a type of date [object Date], then convert it to a date using toDate(). if the Object is false, meaning it is a date, then return the value. if there is no value, return null.
        selected={
          value
            ? Object.prototype.toString.call(value) !== "[object Date]"
              ? value.toDate()
              : value
            : null
        }
        onChange={onChange}
        // onBlur={onBlur} // changing this to make dates/times consistent throughout app as a date
        onBlur={(e, val) => onBlur(val)}
        onChangeRaw={(e) => e.preventDefault()}
      />
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default DateInput;
