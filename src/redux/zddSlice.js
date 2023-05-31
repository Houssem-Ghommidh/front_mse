import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

export const fetchzdd = createAsyncThunk(
    'zdd/fetchzdd',
    async (_,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;
        try{
          const res =await fetch(`${process.env.REACT_APP_BASE_URL}/api/zone-depot`)
      const data = await res.json()
      console.log(data)
      return data.data}
      catch(error){
        return rejectWithValue(error.message);
      }
    }
  )
  export const insertzdd = createAsyncThunk(
   'zdd/insertzdd',
   async (zddData,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;

       try{
         const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/zone-depot`, 
         {
            method: 'POST', 
            body: JSON.stringify (zddData),
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
  export const deletezdd = createAsyncThunk(
    'zdd/deletezdd',
    async (id,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;
        try{
   await fetch(`${process.env.REACT_APP_BASE_URL}/api/zone-depot-suppression-definitif/${id}`, {
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


         export const getSinglezdd = createAsyncThunk(
          'zdd/getSinglezdd',
          async (id,thunkAPI) => {
            const {rejectWithValue} = thunkAPI;
              try{
                const res =await fetch(`${process.env.REACT_APP_BASE_URL}/api/zone-depot/${id}`,
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



               export const editzdd = createAsyncThunk(
                'zdd/editzdd',
                async (todo, { rejectWithValue }) => {
                  try {
                    const { id, zone_travail_id,adresse,latitude,longitude,quantite_depot_maximale,quantite_depot_actuelle_plastique,quantite_depot_actuelle_papier,quantite_depot_actuelle_composte,quantite_depot_actuelle_canette} = todo;
              
                    const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/zone-depot/${id}`, {
                      zone_travail_id,
                      adresse,
                      latitude,
                      longitude,
                      quantite_depot_actuelle_canette,
                      quantite_depot_maximale,
                      quantite_depot_actuelle_plastique,
                      quantite_depot_actuelle_papier,
                      quantite_depot_actuelle_composte

                    });
                    console.log("response edit",response)

                    return response;
                    
                  } catch (error) {
                    console.log("error",error);
                    return rejectWithValue(error.message);
                  }
                }
              );
               


         
  export const zddSlice = createSlice({
    name:'zdd',
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
        [fetchzdd.fulfilled]:(state,action)=>{
           state.getAllData =action.payload;
           state.status ="success";
       state.error =null;
        },
        [fetchzdd.pending]:(state)=>{
           state.status ="loading";
           state.error =null;

        },
        [fetchzdd.rejected]:(state,action)=>{
       
           state.status ="failed";
           state.error=action.payload;
         },
         // insert books
         [insertzdd.fulfilled]:(state,action)=>{
            state.data.push(action.payload);
            state.status ="success";
        state.error =null;
         },
         [insertzdd.pending]:(state)=>{
            state.status ="loading";
            state.error =null;

         },
         [insertzdd.rejected]:(state,action)=>{
        
            state.status ="failed";
            state.error=action.payload;
          },
          // delete hotel
          [deletezdd.fulfilled]:(state,action)=>{
            state.status ="success";
        state.error =null;
        state.getAllData =state.getAllData.filter((el)=> el.id !==action.payload)
         },
         [deletezdd.pending]:(state)=>{
            state.status ="loading";
            state.error =null;

         },
         [deletezdd.rejected]:(state,action)=>{
        
            state.status ="failed";
            state.error=action.payload;
          },
          //single hotel
          [getSinglezdd.fulfilled]:(state,action)=>{
            state.data = action.payload;
            state.status ="success";
        state.error =null;
         },
         [getSinglezdd.pending]:(state)=>{
          state.status ="loading";
          state.error =null;

         },
         [getSinglezdd.rejected]:(state,action)=>{
        
          state.status ="failed";
          state.error=action.payload;
          },
          //edit hotel
          
          [editzdd.fulfilled]: (state, action) => {
           
            return {
              ...state,
              data: action.payload,
             
            };
          },
          [editzdd.pending]: (state, action) => {
            return {
              ...state,
              status:"loading"
            };
          },
          [editzdd.rejected]: (state, action) => {
            return {
              ...state,
              status:"rejected",
              error:action.payload
            };
          },
          
       
    }
})

export default zddSlice.reducer