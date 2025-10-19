import { FC, useEffect } from "react";
import { useState } from "react";
import { getTimeLeft } from "../../utils/GetTime";

// const countdownTargetDate = new Date("2024-09-04T23:59:59");

interface ICountDownProps{
  countdownTargetDate:Date
}

const Countdown: FC<ICountDownProps> = ({countdownTargetDate}) => {

    // console.log(countdownTargetDate);
    
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(countdownTargetDate));


 

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(countdownTargetDate));
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div>
      
      <div className="grid grid-flow-col  gap-2 text-center justify-center auto-cols-max mt-5 ">
        {Object.entries(timeLeft).map((el) => {
          const label = el[0];
          const value = el[1];
          return (
            <div key={label}>
              <div className=" border-2 shadow-2xl rounded-2xl px-2  rounded-box text-neutral-content ">
                <div className="font-mono  md:p-1 flex flex-col  ">
                  <span className="text-xl"> {value}</span>
                  <span className="text-[11px] ">{label}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Countdown;