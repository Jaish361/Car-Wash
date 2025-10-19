import { DatePicker, Form } from 'antd';
import { Controller } from 'react-hook-form';
import dayjs, { Dayjs } from 'dayjs';

type TDatePickerProps = {
  name: string;
  label?: string;
  disabled?:boolean;
};

const CRDatePicker = ({ name, label,disabled }: TDatePickerProps) => {
  const disablePastDate = (current: Dayjs)=>{
    return current && current < dayjs().startOf('day')
  }
  return (
    <div>
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item label={label}>
            <DatePicker {...field} size="large" style={{ width: '100%' }} disabled={disabled} disabledDate={disablePastDate} />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default CRDatePicker;