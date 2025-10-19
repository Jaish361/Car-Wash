import { Form } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { Controller } from 'react-hook-form';

type TInputProps = {
  type?: string;
  name: string;
  label?: string;
  disabled?: boolean;
  className?:string;
  placeholder?:string;
  defaultValue?:string;
  size?:string;
};

const CRTextarea = ({  name, label, disabled,className,placeholder,defaultValue }: TInputProps) => {
  return (
    <div className={className}>
      <Controller
        name={name}
        defaultValue={defaultValue}
        render={({ field }) => (
          <Form.Item label={label}>
            <TextArea
              {...field}
             
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

export default CRTextarea;
