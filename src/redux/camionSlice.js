import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

export const fetchcamion = createAsyncThunk(
    'camion/fetchcamion',
    async (_,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;
        try{
          const res =await fetch(`${process.env.REACT_APP_BASE_URL}/api/camion`)
      const data = await res.json()
      return data.data}
      catch(error){
        return rejectWithValue(error.message);
      }
    }
  )
  export const insertcamion = createAsyncThunk(
   'camion/insertcamion',
   async (camionData,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;

       try{
         const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/camion`, 
         {
            method: 'POST', 
            body: JSON.stringify (camionData),
            headers: {
            'Content-type': 'application/json; charset=UTF-8',
            },

         } );
         console.log(res)
      const data =await res.json();
      return data;
      }catch(error){
      return rejectWithValue(error.message);
   }
   }
 )
  export const deletecamion = createAsyncThunk(
    'camion/deletecamion',
    async (id,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;
        try{
   await fetch(`${process.env.REACT_APP_BASE_URL}/api/camion-suppression-definitif/${id}`, {
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


         export const getSinglecamion = createAsyncThunk(
          'camion/getSinglecamion',
          async (id,thunkAPI) => {
            const {rejectWithValue} = thunkAPI;
              try{
                const res =await fetch(`${process.env.REACT_APP_BASE_URL}/api/camion/${id}`,
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



               export const editcamion = createAsyncThunk(
                'camion/editcamion',
                async (todo, { rejectWithValue }) => {
                  try {
                    const { id, zone_travail_id,zone_depot_id, matricule, heure_sortie,heure_entree,longitude,latitude,volume_maximale_camion,volume_actuelle_plastique,volume_actuelle_papier,volume_actuelle_composte,volume_actuelle_canette,volume_carburant_consomme,Kilometrage} = todo;
              
                    const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/camion/${id}`, {
                        zone_travail_id,
                        zone_depot_id,
                        matricule,
                        heure_sortie,
                        heure_entree,
                        longitude,
                        latitude,
                        volume_maximale_camion,
                        volume_actuelle_plastique,
                        volume_actuelle_papier,
                        volume_actuelle_composte,
                        volume_actuelle_canette,
                        volume_carburant_consomme,
                        Kilometrage
                    });
                    console.log("response edit",response)

                    return response;
                    
                  } catch (error) {
                    console.log("error",error);
                    return rejectWithValue(error.message);
                  }
                }
              );
               


         
  export const camionSlice = createSlice({
    name:'camion',
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
        [fetchcamion.fulfilled]:(state,action)=>{
           state.getAllData =action.payload;
           state.status ="success";
       state.error =null;
        },
        [fetchcamion.pending]:(state)=>{
           state.status ="loading";
           state.error =null;

        },
        [fetchcamion.rejected]:(state,action)=>{
       
           state.status ="failed";
           state.error=action.payload;
         },
         // insert books
         [insertcamion.fulfilled]:(state,action)=>{
            state.data.push(action.payload);
            state.status ="success";
        state.error =null;
         },
         [insertcamion.pending]:(state)=>{
            state.status ="loading";
            state.error =null;

         },
         [insertcamion.rejected]:(state,action)=>{
        
            state.status ="failed";
            state.error=action.payload;
          },
          // delete hotel
          [deletecamion.fulfilled]:(state,action)=>{
            state.status ="success";
        state.error =null;
        state.getAllData =state.getAllData.filter((el)=> el.id !==action.payload)
         },
         [deletecamion.pending]:(state)=>{
            state.status ="loading";
            state.error =null;

         },
         [deletecamion.rejected]:(state,action)=>{
        
            state.status ="failed";
            state.error=action.payload;
          },
          //single hotel
          [getSinglecamion.fulfilled]:(state,action)=>{
            state.data = action.payload;
            state.status ="success";
        state.error =null;
         },
         [getSinglecamion.pending]:(state)=>{
          state.status ="loading";
          state.error =null;

         },
         [getSinglecamion.rejected]:(state,action)=>{
        
          state.status ="failed";
          state.error=action.payload;
          },
          //edit hotel
          
          [editcamion.fulfilled]: (state, action) => {
           
            return {
              ...state,
              data: action.payload,
             
            };
          },
          [editcamion.pending]: (state, action) => {
            return {
              ...state,
              status:"loading"
            };
          },
          [editcamion.rejected]: (state, action) => {
            return {
              ...state,
              status:"rejected",
              error:action.payload
            };
          },
          
       
    }
})

export default camionSlice.reducer