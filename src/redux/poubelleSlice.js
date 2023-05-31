import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

export const fetchpoubelle = createAsyncThunk(
    'poubelle/fetchpoubelle',
    async (_,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;
        try{
          const res =await fetch(`${process.env.REACT_APP_BASE_URL}/api/poubelle`)
      const data = await res.json()
      return data.data}
      catch(error){
        return rejectWithValue(error.message);
      }
    }
  )
  export const insertpoubelle = createAsyncThunk(
   'poubelle/insertpoubelle',
   async (poubelleData,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;

       try{
         const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/poubelle`, 
         {
            method: 'POST', 
            body: JSON.stringify (poubelleData),
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

  export const deletepoubelle = createAsyncThunk(
    'poubelle/deletepoubelle',
    async (id,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;
        try{
   await fetch(`${process.env.REACT_APP_BASE_URL}/api/poubelle-suppression-definitif/${id}`, {
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


         export const getSinglepoubelle = createAsyncThunk(
          'poubelle/getSinglepoubelle',
          async (id,thunkAPI) => {
            const {rejectWithValue} = thunkAPI;
              try{
                const res =await fetch(`${process.env.REACT_APP_BASE_URL}/api/poubelle/${id}`,
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



               export const editpoubelle = createAsyncThunk(
                'poubelle/editpoubelle',
                async (todo, { rejectWithValue }) => {
                  try {
                    const { id, etablissement_id,bloc_etablissement_id, etage_etablissement_id, bloc_poubelle_id,nom,type,Etat} = todo;
              
                    const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/poubelle/${id}`, {
                      id, etablissement_id,bloc_etablissement_id, etage_etablissement_id, bloc_poubelle_id,nom,type,Etat
                    });

                    return response;
                    
                  } catch (error) {
                    console.log("error",error);
                    return rejectWithValue(error.message);
                  }
                }
              );
               


         
  export const poubelleSlice = createSlice({
    name:'poubelle',
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
        [fetchpoubelle.fulfilled]:(state,action)=>{
           state.getAllData =action.payload;
           state.status ="success";
       state.error =null;
        },
        [fetchpoubelle.pending]:(state)=>{
           state.status ="loading";
           state.error =null;

        },
        [fetchpoubelle.rejected]:(state,action)=>{
       
           state.status ="failed";
           state.error=action.payload;
         },
         // insert books
         [insertpoubelle.fulfilled]:(state,action)=>{
            state.data.push(action.payload);
            state.status ="success";
        state.error =null;
         },
         [insertpoubelle.pending]:(state)=>{
            state.status ="loading";
            state.error =null;

         },
         [insertpoubelle.rejected]:(state,action)=>{
        
            state.status ="failed";
            state.error=action.payload;
          },
          // delete hotel
          [deletepoubelle.fulfilled]:(state,action)=>{
            state.status ="success";
        state.error =null;
        state.getAllData =state.getAllData.filter((el)=> el.id !==action.payload)
         },
         [deletepoubelle.pending]:(state)=>{
            state.status ="loading";
            state.error =null;

         },
         [deletepoubelle.rejected]:(state,action)=>{
        
            state.status ="failed";
            state.error=action.payload;
          },
          //single hotel
          [getSinglepoubelle.fulfilled]:(state,action)=>{
            state.data = action.payload;
            state.status ="success";
        state.error =null;
         },
         [getSinglepoubelle.pending]:(state)=>{
          state.status ="loading";
          state.error =null;

         },
         [getSinglepoubelle.rejected]:(state,action)=>{
        
          state.status ="failed";
          state.error=action.payload;
          },
          //edit hotel
          
          [editpoubelle.fulfilled]: (state, action) => {
           
            return {
              ...state,
              data: action.payload,
             
            };
          },
          [editpoubelle.pending]: (state, action) => {
            return {
              ...state,
              status:"loading"
            };
          },
          [editpoubelle.rejected]: (state, action) => {
            return {
              ...state,
              status:"rejected",
              error:action.payload
            };
          },
          
       
    }
})

export default poubelleSlice.reducer