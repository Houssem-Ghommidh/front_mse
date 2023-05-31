import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchpoubellere = createAsyncThunk(
    'poubellere/fetchpoubellere',
    async (_,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;
        try{
          const res =await fetch(`${process.env.REACT_APP_BASE_URL}/api/auth-responsable-etablissement/poubelle-responsable`, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`, 
            },
          })
      const data = await res.json()
      return data.data}
      catch(error){
        return rejectWithValue(error.message);
      }
    }
  )
  
               


         
  export const poubellereSlice = createSlice({
    name:'poubellere',
    initialState:{
        data:[],
        getAllData:[],
        status:null,
        error:null,
    },
    reducers:{
        
    },
    extraReducers:{
        // show hotels
        [fetchpoubellere.fulfilled]:(state,action)=>{
           state.getAllData =action.payload;
           state.status ="success";
       state.error =null;
        },
        [fetchpoubellere.pending]:(state)=>{
           state.status ="loading";
           state.error =null;

        },
        [fetchpoubellere.rejected]:(state,action)=>{
       
           state.status ="failed";
           state.error=action.payload;
         },
         // insert books
        
       
    }
})

export default poubellereSlice.reducer