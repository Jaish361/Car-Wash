import { Form,  InputNumber } from 'antd';
import { Controller } from 'react-hook-form';

type TInputProps = {
  type: string;
  name: string;
  label?: string;
  disabled?: boolean;
  className?:string;
  placeholder?:string;
  size?:string;
  defaultValue?:string;
  readonly?:boolean;
};

const CRInputNumber = ({ type, name, label, disabled,className,placeholder,defaultValue }: TInputProps) => {
  return (
    <div className={className}>
      <Controller
        name={name}
        defaultValue={defaultValue}
        render={({ field }) => (
          <Form.Item label={label}>
            <InputNumber
            className={className}
              {...field}
              type={type}
              id={name}
              
              
              placeholder={placeholder}
              size="large"
              disabled={disabled}
            />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default CRInputNumber;
