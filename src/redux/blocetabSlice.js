import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

export const fetchblocetab = createAsyncThunk(
    'blocetab/fetchblocetab',
    async (_,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;
        try{
          const res =await fetch(`${process.env.REACT_APP_BASE_URL}/api/bloc-etablissement`)
      const data = await res.json()
      console.log(data)
      return data.data}
      catch(error){
        return rejectWithValue(error.message);
      }
    }
  )
  export const listblocetab = createAsyncThunk(
    'blocetab/listblocetab',
    async (nomEtablissement,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;
        try{
          const res =await fetch(`${process.env.REACT_APP_BASE_URL}/api/bloc-etablissement-liste/${nomEtablissement}`)
      const data = await res.json()
      
      return data}
      catch(error){
        return rejectWithValue(error.message);
      }
    }
  )
  export const insertblocetab = createAsyncThunk(
   'blocetab/insertblocetab',
   async (blocetabData,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;

       try{
         const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/bloc-etablissement`, 
         {
            method: 'POST', 
            body: JSON.stringify (blocetabData),
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
  export const deleteblocetab = createAsyncThunk(
    'blocetab/deleteblocetab',
    async (id,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;
        try{
   await fetch(`${process.env.REACT_APP_BASE_URL}/api/bloc-etablissement-suppression-definitif/${id}`, {
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


         export const getSingleblocetab = createAsyncThunk(
          'blocetab/getSingleblocetab',
          async (id,thunkAPI) => {
            const {rejectWithValue} = thunkAPI;
              try{
                const res =await fetch(`${process.env.REACT_APP_BASE_URL}/api/bloc-etablissement/${id}`,
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



               export const editblocetab = createAsyncThunk(
                'blocetab/editblocetab',
                async (todo, { rejectWithValue }) => {
                  try {
                    const { id, etablissement_id,nom_bloc_etablissement} = todo;
              
                    const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/bloc-etablissement/${id}`, {
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
               


         
  export const blocetabSlice = createSlice({
    name:'blocetab',
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
        [fetchblocetab.fulfilled]:(state,action)=>{
           state.getAllData =action.payload;
           state.status ="success";
       state.error =null;
        },
        [fetchblocetab.pending]:(state)=>{
           state.status ="loading";
           state.error =null;

        },
        [fetchblocetab.rejected]:(state,action)=>{
       
           state.status ="failed";
           state.error=action.payload;
         },
         // list 
         [listblocetab.fulfilled]:(state,action)=>{
          state.getAllData =action.payload;
          state.status ="success";
           state.error =null;
       },
       [listblocetab.pending]:(state)=>{
          state.status ="loading";
          state.error =null;

       },
       [listblocetab.rejected]:(state,action)=>{
      
          state.status ="failed";
          state.error=action.payload;
        },
         // insert books
         [insertblocetab.fulfilled]:(state,action)=>{
            state.data.push(action.payload);
            state.status ="success";
        state.error =null;
         },
         [insertblocetab.pending]:(state)=>{
            state.status ="loading";
            state.error =null;

         },
         [insertblocetab.rejected]:(state,action)=>{
        
            state.status ="failed";
            state.error=action.payload;
          },
          // delete hotel
          [deleteblocetab.fulfilled]:(state,action)=>{
            state.status ="success";
        state.error =null;
        state.getAllData =state.getAllData.filter((el)=> el.id !==action.payload)
         },
         [deleteblocetab.pending]:(state)=>{
            state.status ="loading";
            state.error =null;

         },
         [deleteblocetab.rejected]:(state,action)=>{
        
            state.status ="failed";
            state.error=action.payload;
          },
          //single hotel
          [getSingleblocetab.fulfilled]:(state,action)=>{
            state.data = action.payload;
            state.status ="success";
        state.error =null;
         },
         [getSingleblocetab.pending]:(state)=>{
          state.status ="loading";
          state.error =null;

         },
         [getSingleblocetab.rejected]:(state,action)=>{
        
          state.status ="failed";
          state.error=action.payload;
          },
          //edit hotel
          
          [editblocetab.fulfilled]: (state, action) => {
           
            return {
              ...state,
              data: action.payload,
             
            };
          },
          [editblocetab.pending]: (state, action) => {
            return {
              ...state,
              status:"loading"
            };
          },
          [editblocetab.rejected]: (state, action) => {
            return {
              ...state,
              status:"rejected",
              error:action.payload
            };
          },
          
       
    }
})

export default blocetabSlice.reducer