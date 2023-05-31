import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

export const fetchetage = createAsyncThunk(
    'etage/fetchetage',
    async (_,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;
        try{
          const res =await fetch(`${process.env.REACT_APP_BASE_URL}/api/etage-etablissement`)
      const data = await res.json()
      console.log(data)
      return data.data}
      catch(error){
        return rejectWithValue(error.message);
      }
    }
  )
  export const listetage = createAsyncThunk(
    'etage/listetage',
    async (id,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;
        try{
          const res =await fetch(`${process.env.REACT_APP_BASE_URL}/api/etage-etablissement-liste/${id}`)
      const data = await res.json()
      console.log("rest",data)
      return data}
      catch(error){
        return rejectWithValue(error.message);
      }
    }
  )
  export const insertetage = createAsyncThunk(
   'etage/insertetage',
   async (etageData,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;

       try{
         const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/etage-etablissement`, 
         {
            method: 'POST', 
            body: JSON.stringify (etageData),
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
  export const deleteetage = createAsyncThunk(
    'etage/deleteetage',
    async (id,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;
        try{
   await fetch(`${process.env.REACT_APP_BASE_URL}/api/etage-etablissement-suppression-definitif/${id}`, {
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


         export const getSingleetage = createAsyncThunk(
          'etage/getSingleetage',
          async (id,thunkAPI) => {
            const {rejectWithValue} = thunkAPI;
              try{
                const res =await fetch(`${process.env.REACT_APP_BASE_URL}/api/etage-etablissement/${id}`,
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



               export const editetage = createAsyncThunk(
                'etage/editetage',
                async (todo, { rejectWithValue }) => {
                  try {
                    const { id, etablissement_id,nom_bloc_etablissement} = todo;
              
                    const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/etage-etablissement/${id}`, {
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
               


         
  export const etageSlice = createSlice({
    name:'etage',
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
        [fetchetage.fulfilled]:(state,action)=>{
           state.getAllData =action.payload;
           state.status ="success";
       state.error =null;
        },
        [fetchetage.pending]:(state)=>{
           state.status ="loading";
           state.error =null;

        },
        [fetchetage.rejected]:(state,action)=>{
       
           state.status ="failed";
           state.error=action.payload;
         },
         // list 
         [listetage.fulfilled]:(state,action)=>{
          state.getAllData =action.payload;
          state.status ="success";
           state.error =null;
       },
       [listetage.pending]:(state)=>{
          state.status ="loading";
          state.error =null;

       },
       [listetage.rejected]:(state,action)=>{
      
          state.status ="failed";
          state.error=action.payload;
        },
         // insert books
         [insertetage.fulfilled]:(state,action)=>{
            state.data.push(action.payload);
            state.status ="success";
        state.error =null;
         },
         [insertetage.pending]:(state)=>{
            state.status ="loading";
            state.error =null;

         },
         [insertetage.rejected]:(state,action)=>{
        
            state.status ="failed";
            state.error=action.payload;
          },
          // delete hotel
          [deleteetage.fulfilled]:(state,action)=>{
            state.status ="success";
        state.error =null;
        state.getAllData =state.getAllData.filter((el)=> el.id !==action.payload)
         },
         [deleteetage.pending]:(state)=>{
            state.status ="loading";
            state.error =null;

         },
         [deleteetage.rejected]:(state,action)=>{
        
            state.status ="failed";
            state.error=action.payload;
          },
          //single hotel
          [getSingleetage.fulfilled]:(state,action)=>{
            state.data = action.payload;
            state.status ="success";
        state.error =null;
         },
         [getSingleetage.pending]:(state)=>{
          state.status ="loading";
          state.error =null;

         },
         [getSingleetage.rejected]:(state,action)=>{
        
          state.status ="failed";
          state.error=action.payload;
          },
          //edit hotel
          
          [editetage.fulfilled]: (state, action) => {
           
            return {
              ...state,
              data: action.payload,
             
            };
          },
          [editetage.pending]: (state, action) => {
            return {
              ...state,
              status:"loading"
            };
          },
          [editetage.rejected]: (state, action) => {
            return {
              ...state,
              status:"rejected",
              error:action.payload
            };
          },
          
       
    }
})

export default etageSlice.reducer