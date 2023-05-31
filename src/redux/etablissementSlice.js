import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

export const fetchetablissement = createAsyncThunk(
    'etablissement/fetchetablissement',
    async (_,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;
        try{
          const res =await fetch(`${process.env.REACT_APP_BASE_URL}/api/etablissement`)
      const data = await res.json()
      return data.data}
      catch(error){
        return rejectWithValue(error.message);
      }
    }
  )
  export const insertetablissement = createAsyncThunk(
   'etablissement/insertetablissement',
   async (etablissementData,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;

       try{
         const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/etablissement`, 
         {
            method: 'POST', 
            body: JSON.stringify (etablissementData),
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
  export const deleteetablissement = createAsyncThunk(
    'etablissement/deleteetablissement',
    async (id,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;
        try{
   await fetch(`${process.env.REACT_APP_BASE_URL}/api/etablissement-suppression-definitif/${id}`, {
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


         export const getSingleetablissement = createAsyncThunk(
          'etablissement/getSingleetablissement',
          async (id,thunkAPI) => {
            const {rejectWithValue} = thunkAPI;
              try{
                const res =await fetch(`${process.env.REACT_APP_BASE_URL}/api/etablissement/${id}`,
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



               export const editetablissement = createAsyncThunk(
                'etablissement/editetablissement',
                async (todo, { rejectWithValue }) => {
                  try {
                    const { id,gouvernorat,
                    delegation,
                  localite,
                    code_postal,zone_travail_id, nom_etablissement,type_etablissement, niveau_etablissement, nbr_personnes,url_map,adresse,longitude,latitude,quantite_dechets_plastique,quantite_dechets_composte,quantite_dechets_papier,quantite_dechets_canette,quantite_plastique_mensuel,quantite_papier_mensuel,quantite_composte_mensuel,quantite_canette_mensuel} = todo;
              
                    const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/etablissement/${id}`, {
                        zone_travail_id, nom_etablissement,gouvernorat,
                        delegation,
                      localite,
                        code_postal,type_etablissement, niveau_etablissement, nbr_personnes,url_map,adresse,longitude,latitude,quantite_dechets_plastique,quantite_dechets_composte,quantite_dechets_papier,quantite_dechets_canette,quantite_plastique_mensuel,quantite_papier_mensuel,quantite_composte_mensuel,quantite_canette_mensuel
                    });
                    

                    return response;
                    
                  } catch (error) {
                    console.log("error",error);
                    return rejectWithValue(error.message);
                  }
                }
              );
               


         
  export const etablissementSlice = createSlice({
    name:'etablissement',
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
        [fetchetablissement.fulfilled]:(state,action)=>{
           state.getAllData =action.payload;
           state.status ="success";
       state.error =null;
        },
        [fetchetablissement.pending]:(state)=>{
           state.status ="loading";
           state.error =null;

        },
        [fetchetablissement.rejected]:(state,action)=>{
       
           state.status ="failed";
           state.error=action.payload;
         },
         // insert books
         [insertetablissement.fulfilled]:(state,action)=>{
            state.data.push(action.payload);
            state.status ="success";
        state.error =null;
         },
         [insertetablissement.pending]:(state)=>{
            state.status ="loading";
            state.error =null;

         },
         [insertetablissement.rejected]:(state,action)=>{
        
            state.status ="failed";
            state.error=action.payload;
          },
          // delete hotel
          [deleteetablissement.fulfilled]:(state,action)=>{
            state.status ="success";
        state.error =null;
        state.getAllData =state.getAllData.filter((el)=> el.id !==action.payload)
         },
         [deleteetablissement.pending]:(state)=>{
            state.status ="loading";
            state.error =null;

         },
         [deleteetablissement.rejected]:(state,action)=>{
        
            state.status ="failed";
            state.error=action.payload;
          },
          //single hotel
          [getSingleetablissement.fulfilled]:(state,action)=>{
            state.data = action.payload;
            state.status ="success";
        state.error =null;
         },
         [getSingleetablissement.pending]:(state)=>{
          state.status ="loading";
          state.error =null;

         },
         [getSingleetablissement.rejected]:(state,action)=>{
        
          state.status ="failed";
          state.error=action.payload;
          },
          //edit hotel
          
          [editetablissement.fulfilled]: (state, action) => {
           
            return {
              ...state,
              data: action.payload,
             
            };
          },
          [editetablissement.pending]: (state, action) => {
            return {
              ...state,
              status:"loading"
            };
          },
          [editetablissement.rejected]: (state, action) => {
            return {
              ...state,
              status:"rejected",
              error:action.payload
            };
          },
          
       
    }
})

export default etablissementSlice.reducer