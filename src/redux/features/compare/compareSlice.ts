import { IServices } from '@/interface/interface';
import { RootState } from '@/redux/store';
import { createSlice } from '@reduxjs/toolkit';


export  type TCompareService ={
    selectedServices:IServices[];
}



const initialState: TCompareService = {
    selectedServices:[]
};

const compareSlice = createSlice({
  name: 'compare',
  initialState,
  reducers: {
    addCompare: (state, action) => {
      const service = action.payload;
      if(!state.selectedServices.find(item=>item._id === service._id)){
        state.selectedServices.push(service)
      }
    },

    removeCompareServices: (state , action) => {
    state.selectedServices = state.selectedServices.filter((service)=>service._id !== action.payload)
    },

    clearCompare: (state)=>{
        state.selectedServices=[]
    }
  },
});

export const { addCompare,removeCompareServices,clearCompare } = compareSlice.actions;

export default compareSlice.reducer;

export const useSelectedCompare = (state: RootState) => state.compare.selectedServices;

