import React from 'react';
import { Form } from 'antd';
import { Controller } from 'react-hook-form';
import { Calendar, theme } from 'antd';
import type { CalendarProps } from 'antd';
import dayjs, { Dayjs } from 'dayjs';

const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
  console.log(value.format('YYYY-MM-DD'), mode);
};

type TCalendarPickerProps = {
    name: string;
    label?: string;
    onChange?:(date:Dayjs)=>void;
  };
const CRCalendar: React.FC<TCalendarPickerProps> = ({ name, label,onChange }) => {
  const { token } = theme.useToken();

  const disablePastDate = (current: Dayjs)=>{
    return current && current < dayjs().startOf('day')
  }
  const wrapperStyle: React.CSSProperties = {
    width: 400,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  return (
    <div>
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item label={label}>
            <div style={wrapperStyle}>
              <Calendar
                {...field}
                value={field.value}
                fullscreen={false}
                onPanelChange={onPanelChange}
                disabledDate={disablePastDate}
                onSelect={(date)=>{
                  field.onChange(date);
                  if(onChange){
                    onChange(date);
                  }
                }}
              />
            </div>
          </Form.Item>
        )}
      />
    </div>
  );
};

export default CRCalendar;
