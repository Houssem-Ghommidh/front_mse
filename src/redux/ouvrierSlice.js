import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

export const fetchouvrier = createAsyncThunk(
    'ouvrier/fetchouvrier',
    async (_,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;
        try{
          const res =await fetch(`${process.env.REACT_APP_BASE_URL}/api/ouvrier`)
      const data = await res.json()
      console.log(data)
      return data.data}
      catch(error){
        return rejectWithValue(error.message);
      }
    }
  )

  export const insertouvrier = createAsyncThunk(
   'ouvrier/insertouvrier',
   async (ouvrierData,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;

       try{
         const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/ouvrier`, 
         {
            method: 'POST', 
            body: JSON.stringify (ouvrierData),
            headers: {
            'Content-type': 'application/json; charset=UTF-8',
            },

         } );
      const data =await res.json();
      return data;
      }catch(error){
      return rejectWithValue(error.message);
   }
   }
 )
  export const deleteouvrier = createAsyncThunk(
    'ouvrier/deleteouvrier',
    async (id,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;
        try{
   await fetch(`${process.env.REACT_APP_BASE_URL}/api/ouvrier-suppression-definitif/${id}`, {
         method: 'GET',
         headers: {
         'Content-type': 'application/json; charset=UTF-8',
         },
         });
         return id;
         } catch (error) {
         return rejectWithValue(error.message);
         }
         }
         );


         export const getSingleouvrier = createAsyncThunk(
          'ouvrier/getSingleouvrier',
          async (id,thunkAPI) => {
            const {rejectWithValue} = thunkAPI;
              try{
                const res =await fetch(`${process.env.REACT_APP_BASE_URL}/api/ouvrier/${id}`,
                {method:"GET",
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    }})
            const data = await res.json()
            return data.data}
            catch(error){
              return rejectWithValue(error.message);
            }
          }
               );



               export const editouvrier = createAsyncThunk(
                'ouvrier/editouvrier',
                async (todo, { rejectWithValue }) => {
                  try {
                    const { id, etablissement_id,nom_bloc_etablissement} = todo;
              
                    const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/ouvrier/${id}`, {
                      etablissement_id,nom_bloc_etablissement
                    });
                    console.log("response edit",response)

                    return response;
                    
                  } catch (error) {
                    console.log("error",error);
                    return rejectWithValue(error.message);
                  }
                }
              );
               


         
  export const ouvrierSlice = createSlice({
    name:'ouvrier',
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
        [fetchouvrier.fulfilled]:(state,action)=>{
           state.getAllData =action.payload;
           state.status ="success";
       state.error =null;
        },
        [fetchouvrier.pending]:(state)=>{
           state.status ="loading";
           state.error =null;

        },
        [fetchouvrier.rejected]:(state,action)=>{
       
           state.status ="failed";
           state.error=action.payload;
         },

     
         // insert books
         [insertouvrier.fulfilled]:(state,action)=>{
            state.data.push(action.payload);
            state.status ="success";
        state.error =null;
         },
         [insertouvrier.pending]:(state)=>{
            state.status ="loading";
            state.error =null;

         },
         [insertouvrier.rejected]:(state,action)=>{
        
            state.status ="failed";
            state.error=action.payload;
          },
          // delete hotel
          [deleteouvrier.fulfilled]:(state,action)=>{
            state.status ="success";
        state.error =null;
        state.getAllData =state.getAllData.filter((el)=> el.id !==action.payload)
         },
         [deleteouvrier.pending]:(state)=>{
            state.status ="loading";
            state.error =null;

         },
         [deleteouvrier.rejected]:(state,action)=>{
        
            state.status ="failed";
            state.error=action.payload;
          },
          //single hotel
          [getSingleouvrier.fulfilled]:(state,action)=>{
            state.data = action.payload;
            state.status ="success";
        state.error =null;
         },
         [getSingleouvrier.pending]:(state)=>{
          state.status ="loading";
          state.error =null;

         },
         [getSingleouvrier.rejected]:(state,action)=>{
        
          state.status ="failed";
          state.error=action.payload;
          },
          //edit hotel
          
          [editouvrier.fulfilled]: (state, action) => {
           
            return {
              ...state,
              data: action.payload,
             
            };
          },
          [editouvrier.pending]: (state, action) => {
            return {
              ...state,
              status:"loading"
            };
          },
          [editouvrier.rejected]: (state, action) => {
            return {
              ...state,
              status:"rejected",
              error:action.payload
            };
          },
          
       
    }
})

export default ouvrierSlice.reducer