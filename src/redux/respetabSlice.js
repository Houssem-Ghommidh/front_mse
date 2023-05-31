import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

export const fetchrespetab = createAsyncThunk(
    'respetab/fetchrespetab',
    async (_,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;
        try{
          const res =await fetch(`${process.env.REACT_APP_BASE_URL}/api/responsable-etablissement`)
      const data = await res.json()
      console.log(data)
      return data.data}
      catch(error){
        return rejectWithValue(error.message);
      }
    }
  )

  export const insertrespetab = createAsyncThunk(
   'respetab/insertrespetab',
   async (respetabData,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;

       try{
         const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/responsable-etablissement`, 
         {
            method: 'POST', 
            body: JSON.stringify (respetabData),
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
  export const deleterespetab = createAsyncThunk(
    'respetab/deleterespetab',
    async (id,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;
        try{
   await fetch(`${process.env.REACT_APP_BASE_URL}/api/responsable-etablissement-suppression-definitif/${id}`, {
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


         export const getSinglerespetab = createAsyncThunk(
          'respetab/getSinglerespetab',
          async (id,thunkAPI) => {
            const {rejectWithValue} = thunkAPI;
              try{
                const res =await fetch(`${process.env.REACT_APP_BASE_URL}/api/responsable-etablissement/${id}`,
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



               export const editrespetab = createAsyncThunk(
                'respetab/editrespetab',
                async (todo, { rejectWithValue }) => {
                  try {
                    const { id, etablissement_id,nom_bloc_etablissement} = todo;
              
                    const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/responsable-etablissement/${id}`, {
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
               


         
  export const respetabSlice = createSlice({
    name:'respetab',
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
        [fetchrespetab.fulfilled]:(state,action)=>{
           state.getAllData =action.payload;
           state.status ="success";
       state.error =null;
        },
        [fetchrespetab.pending]:(state)=>{
           state.status ="loading";
           state.error =null;

        },
        [fetchrespetab.rejected]:(state,action)=>{
       
           state.status ="failed";
           state.error=action.payload;
         },

     
         // insert books
         [insertrespetab.fulfilled]:(state,action)=>{
            state.data.push(action.payload);
            state.status ="success";
        state.error =null;
         },
         [insertrespetab.pending]:(state)=>{
            state.status ="loading";
            state.error =null;

         },
         [insertrespetab.rejected]:(state,action)=>{
        
            state.status ="failed";
            state.error=action.payload;
          },
          // delete hotel
          [deleterespetab.fulfilled]:(state,action)=>{
            state.status ="success";
        state.error =null;
        state.getAllData =state.getAllData.filter((el)=> el.id !==action.payload)
         },
         [deleterespetab.pending]:(state)=>{
            state.status ="loading";
            state.error =null;

         },
         [deleterespetab.rejected]:(state,action)=>{
        
            state.status ="failed";
            state.error=action.payload;
          },
          //single hotel
          [getSinglerespetab.fulfilled]:(state,action)=>{
            state.data = action.payload;
            state.status ="success";
        state.error =null;
         },
         [getSinglerespetab.pending]:(state)=>{
          state.status ="loading";
          state.error =null;

         },
         [getSinglerespetab.rejected]:(state,action)=>{
        
          state.status ="failed";
          state.error=action.payload;
          },
          //edit hotel
          
          [editrespetab.fulfilled]: (state, action) => {
           
            return {
              ...state,
              data: action.payload,
             
            };
          },
          [editrespetab.pending]: (state, action) => {
            return {
              ...state,
              status:"loading"
            };
          },
          [editrespetab.rejected]: (state, action) => {
            return {
              ...state,
              status:"rejected",
              error:action.payload
            };
          },
          
       
    }
})

export default respetabSlice.reducer