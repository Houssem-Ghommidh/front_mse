import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchplusRemplis = createAsyncThunk(
    'plusRemplis/fetchplusRemplis',
    async (_,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;
        try{
          const res =await fetch(`${process.env.REACT_APP_BASE_URL}/api/auth-responsable-etablissement/poubelle-plus-remplis-etablissement`,
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



         
  export const plusRemplisSlice = createSlice({
    name:'plusRemplis',
    initialState:{
 
        getAllData:[],
        status:null,
        error:null,
    },
    reducers:{
        
    },
    extraReducers:{
        // show hotels
        [fetchplusRemplis.fulfilled]:(state,action)=>{
           state.getAllData =action.payload;
           state.status ="success";
       state.error =null;
        },
        [fetchplusRemplis.pending]:(state)=>{
           state.status ="loading";
           state.error =null;

        },
        [fetchplusRemplis.rejected]:(state,action)=>{
       
           state.status ="failed";
           state.error=action.payload;
         },
  
          
       
    }
})

export default plusRemplisSlice.reducer