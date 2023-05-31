import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchdre = createAsyncThunk(
    'dre/fetchdre',
    async (_,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;
        try{
          const res =await fetch(`${process.env.REACT_APP_BASE_URL}/api/auth-responsable-etablissement/dashboard-etablissement`,
          {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`, 
            },
          })
      const data = await res.json()
      return data}
      catch(error){
        return rejectWithValue(error.message);
      }
    }
  )


  export const fetchprice = createAsyncThunk(
    'dre/fetchprice',
    async (_,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;
        try{
          const res =await fetch(`${process.env.REACT_APP_BASE_URL}/api/prixdechets`,
          {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`, 
            },
          })
      const data = await res.json()
      return data}
      catch(error){
        return rejectWithValue(error.message);
      }
    }
  )
         
  export const dreSlice = createSlice({
    name:'dre',
    initialState:{
 
        getAllData:[],
        getAllPrice:[],
        status:null,
        error:null,
    },
    reducers:{
        
    },
    extraReducers:{
        // show hotels
        [fetchdre.fulfilled]:(state,action)=>{
           state.getAllData =action.payload;
           state.status ="success";
       state.error =null;
        },
        [fetchdre.pending]:(state)=>{
           state.status ="loading";
           state.error =null;

        },
        [fetchdre.rejected]:(state,action)=>{
       
           state.status ="failed";
           state.error=action.payload;
         },
         [fetchprice.fulfilled]:(state,action)=>{
          state.getAllPrice =action.payload;
          state.status ="success";
      state.error =null;
       },
       [fetchprice.pending]:(state)=>{
          state.status ="loading";
          state.error =null;

       },
       [fetchprice.rejected]:(state,action)=>{
      
          state.status ="failed";
          state.error=action.payload;
        },
  
          
       
    }
})

export default dreSlice.reducer