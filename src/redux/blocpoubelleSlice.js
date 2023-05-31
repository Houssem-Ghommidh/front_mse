import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

export const fetchblocPoubelle = createAsyncThunk(
    'blocPoubelle/fetchblocPoubelle',
    async (_,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;
        try{
          const res =await fetch(`${process.env.REACT_APP_BASE_URL}/api/bloc-poubelle`)
      const data = await res.json()
      console.log(data)
      return data.data}
      catch(error){
        return rejectWithValue(error.message);
      }
    }
  )
  export const insertblocPoubelle = createAsyncThunk(
   'blocPoubelle/insertblocPoubelle',
   async (blocPoubelleData,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;

       try{
         const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/bloc-poubelle`, 
         {
            method: 'POST', 
            body: JSON.stringify (blocPoubelleData),
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
  export const deleteblocPoubelle = createAsyncThunk(
    'blocPoubelle/deleteblocPoubelle',
    async (id,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;
        try{
   await fetch(`${process.env.REACT_APP_BASE_URL}/api/bloc-poubelle-suppression-definitif/${id}`, {
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


         export const getSingleblocPoubelle = createAsyncThunk(
          'blocPoubelle/getSingleblocPoubelle',
          async (id,thunkAPI) => {
            const {rejectWithValue} = thunkAPI;
              try{
                const res =await fetch(`${process.env.REACT_APP_BASE_URL}/api/bloc-poubelle/${id}`,
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
               export const listblocPoubelle = createAsyncThunk(
                'blocPoubelle/listblocPoubelle',
                async (id,thunkAPI) => {
                  const {rejectWithValue} = thunkAPI;
                    try{
                      const res =await fetch(`${process.env.REACT_APP_BASE_URL}/api/bloc-poubelle-liste/${id}`)
                  const data = await res.json()
             
                  return data}
                  catch(error){
                    return rejectWithValue(error.message);
                  }
                }
              )



               export const editblocPoubelle = createAsyncThunk(
                'blocPoubelle/editblocPoubelle',
                async (todo, { rejectWithValue }) => {
                  try {
                    const { id, etablissement_id,nom_bloc_etablissement} = todo;
              
                    const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/bloc-poubelle/${id}`, {
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
               


         
  export const blocPoubelleSlice = createSlice({
    name:'blocPoubelle',
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
        [fetchblocPoubelle.fulfilled]:(state,action)=>{
           state.getAllData =action.payload;
           state.status ="success";
       state.error =null;
        },
        [fetchblocPoubelle.pending]:(state)=>{
           state.status ="loading";
           state.error =null;

        },
        [fetchblocPoubelle.rejected]:(state,action)=>{
       
           state.status ="failed";
           state.error=action.payload;
         },
         // insert books
         [insertblocPoubelle.fulfilled]:(state,action)=>{
            state.data.push(action.payload);
            state.status ="success";
        state.error =null;
         },
         [insertblocPoubelle.pending]:(state)=>{
            state.status ="loading";
            state.error =null;

         },
         [insertblocPoubelle.rejected]:(state,action)=>{
        
            state.status ="failed";
            state.error=action.payload;
          },
             // List books
         [listblocPoubelle.fulfilled]:(state,action)=>{
          state.getAllData =action.payload;
          state.status ="success";
      state.error =null;
       },
       [listblocPoubelle.pending]:(state)=>{
          state.status ="loading";
          state.error =null;

       },
       [listblocPoubelle.rejected]:(state,action)=>{
      
          state.status ="failed";
          state.error=action.payload;
        },
          // delete hotel
          [deleteblocPoubelle.fulfilled]:(state,action)=>{
            state.status ="success";
        state.error =null;
        state.getAllData =state.getAllData.filter((el)=> el.id !==action.payload)
         },
         [deleteblocPoubelle.pending]:(state)=>{
            state.status ="loading";
            state.error =null;

         },
         [deleteblocPoubelle.rejected]:(state,action)=>{
        
            state.status ="failed";
            state.error=action.payload;
          },
          //single hotel
          [getSingleblocPoubelle.fulfilled]:(state,action)=>{
            state.data = action.payload;
            state.status ="success";
        state.error =null;
         },
         [getSingleblocPoubelle.pending]:(state)=>{
          state.status ="loading";
          state.error =null;

         },
         [getSingleblocPoubelle.rejected]:(state,action)=>{
        
          state.status ="failed";
          state.error=action.payload;
          },
          //edit hotel
          
          [editblocPoubelle.fulfilled]: (state, action) => {
           
            return {
              ...state,
              data: action.payload,
             
            };
          },
          [editblocPoubelle.pending]: (state, action) => {
            return {
              ...state,
              status:"loading"
            };
          },
          [editblocPoubelle.rejected]: (state, action) => {
            return {
              ...state,
              status:"rejected",
              error:action.payload
            };
          },
          
       
    }
})

export default blocPoubelleSlice.reducer