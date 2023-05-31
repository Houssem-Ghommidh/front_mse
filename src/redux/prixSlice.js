import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

export const fetchprix = createAsyncThunk(
    'prix/fetchprix',
    async (_,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;
        try{
          const res =await fetch(`${process.env.REACT_APP_BASE_URL}/api/dechets`)
      const data = await res.json()
      console.log(data)
      return data.data}
      catch(error){
        return rejectWithValue(error.message);
      }
    }
  )
  export const insertprix = createAsyncThunk(
   'prix/insertprix',
   async (prixData,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;

       try{
         const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/dechets`, 
         {
            method: 'POST', 
            body: JSON.stringify (prixData),
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
  export const deleteprix = createAsyncThunk(
    'prix/deleteprix',
    async (id,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;
        try{
   await fetch(`${process.env.REACT_APP_BASE_URL}/api/dechets-suppression-definitif/${id}`, {
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


         export const getSingleprix = createAsyncThunk(
          'prix/getSingleprix',
          async (id,thunkAPI) => {
            const {rejectWithValue} = thunkAPI;
              try{
                const res =await fetch(`${process.env.REACT_APP_BASE_URL}/api/dechets/${id}`,
                {method:"PUT",
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



               export const editprix = createAsyncThunk(
                'prix/editprix',
                async (todo, { rejectWithValue }) => {
                  try {
                    const { id, type_poubelle,quantite_disponible, description, photo} = todo;
              
                    const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/dechets/${id}`, {
                        type_poubelle,
                        quantite_disponible,
                        description,
                        photo
                    });
                    console.log("response edit",response)

                    return response;
                    
                  } catch (error) {
                    console.log("error",error);
                    return rejectWithValue(error.message);
                  }
                }
              );
               


         
  export const prixSlice = createSlice({
    name:'prix',
    initialState:{
        data:[],
        getalldata:[],
        status:null,
        error:null,
    },
    reducers:{
        
    },
    extraReducers:{
        // show hotels
        [fetchprix.fulfilled]:(state,action)=>{
           state.getalldata =action.payload;
           state.status ="success";
       state.error =null;
        },
        [fetchprix.pending]:(state)=>{
           state.status ="loading";
           state.error =null;

        },
        [fetchprix.rejected]:(state,action)=>{
       
           state.status ="failed";
           state.error=action.payload;
         },
         // insert books
         [insertprix.fulfilled]:(state,action)=>{
            state.data.push(action.payload);
            state.status ="success";
        state.error =null;
         },
         [insertprix.pending]:(state)=>{
            state.status ="loading";
            state.error =null;

         },
         [insertprix.rejected]:(state,action)=>{
        
            state.status ="failed";
            state.error=action.payload;
          },
          // delete hotel
          [deleteprix.fulfilled]:(state,action)=>{
            state.status ="success";
        state.error =null;
        state.getalldata =state.getalldata.filter((el)=> el.id !==action.payload)
         },
         [deleteprix.pending]:(state)=>{
            state.status ="loading";
            state.error =null;

         },
         [deleteprix.rejected]:(state,action)=>{
        
            state.status ="failed";
            state.error=action.payload;
          },
          //single hotel
          [getSingleprix.fulfilled]:(state,action)=>{
            state.data = action.payload;
            state.status ="success";
        state.error =null;
         },
         [getSingleprix.pending]:(state)=>{
          state.status ="loading";
          state.error =null;

         },
         [getSingleprix.rejected]:(state,action)=>{
        
          state.status ="failed";
          state.error=action.payload;
          },
          //edit hotel
          
          [editprix.fulfilled]: (state, action) => {
           
            return {
              ...state,
              data: action.payload,
             
            };
          },
          [editprix.pending]: (state, action) => {
            return {
              ...state,
              status:"loading"
            };
          },
          [editprix.rejected]: (state, action) => {
            return {
              ...state,
              status:"rejected",
              error:action.payload
            };
          },
          
       
    }
})

export default prixSlice.reducer