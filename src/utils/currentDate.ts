
// const date = new Date();

// const day =  date.getDate();
// const month = date.getMonth()+1;
// const year = date.getFullYear();


export const currentDate = new Date().toLocaleDateString('en-CA',{
    year:'numeric',
    month:'2-digit',
    day:'2-digit',
});

