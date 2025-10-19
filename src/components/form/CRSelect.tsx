
import { Form, Select } from 'antd';
import { Controller } from 'react-hook-form';

type TCRSelectProps = {
  label: string;
  name: string;
  options: { value: string; label: string; disabled?: boolean }[] | undefined;
  disabled?: boolean;
  mode?: 'multiple' | undefined;
  className?:string;
  defaultValue?:string;
};

const CRSelect = ({ label, name, options, disabled,className,defaultValue, mode }: TCRSelectProps) => {
  return (
  <div className={className}>
      <Controller
      name={name}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            mode={mode}
            style={{ width: '100%', zIndex:1050 }}
            {...field}
            options={options}
           value={field.value || defaultValue}
            size="large"
            disabled={disabled}
            dropdownStyle={{ zIndex: 1050 }}
          />
          {error && <small style={{ color: 'red' }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  </div>
  );
};

export default CRSelect;