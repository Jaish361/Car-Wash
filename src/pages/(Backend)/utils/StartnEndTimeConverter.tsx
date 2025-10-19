import dayjs from 'dayjs';


const StartnEndTimeConverter = (d:any) => {


const dayjsObject = dayjs(d); 

const time = dayjsObject.format('HH:mm'); // Start time in HH:mm format


    return {time}
};

export default StartnEndTimeConverter;