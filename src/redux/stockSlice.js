import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

export const fetchstock = createAsyncThunk(
    'stock/fetchstock',
    async (_,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;
        try{
          const res =await fetch(`${process.env.REACT_APP_BASE_URL}/api/stock-poubelle`)
      const data = await res.json()
      console.log(data)
      return data.data}
      catch(error){
        return rejectWithValue(error.message);
      }
    }
  )
  export const insertstock = createAsyncThunk(
   'stock/insertstock',
   async (stockData,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;

       try{
         const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/stock-poubelle`, 
         {
            method: 'POST', 
            body: JSON.stringify (stockData),
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
  export const deletestock = createAsyncThunk(
    'stock/deletestock',
    async (id,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;
        try{
   await fetch(`${process.env.REACT_APP_BASE_URL}/api/stock-poubelle-suppression-definitif/${id}`, {
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


         export const getSinglestock = createAsyncThunk(
          'stock/getSinglestock',
          async (id,thunkAPI) => {
            const {rejectWithValue} = thunkAPI;
              try{
                const res =await fetch(`${process.env.REACT_APP_BASE_URL}/api/stock-poubelle/${id}`,
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



               export const editstock = createAsyncThunk(
                'stock/editstock',
                async (todo, { rejectWithValue }) => {
                  try {
                    const { id, type_poubelle,quantite_disponible, description, photo} = todo;
              
                    const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/stock-poubelle/${id}`, {
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
               


         
  export const stockSlice = createSlice({
    name:'stock',
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
        [fetchstock.fulfilled]:(state,action)=>{
           state.getalldata =action.payload;
           state.status ="success";
       state.error =null;
        },
        [fetchstock.pending]:(state)=>{
           state.status ="loading";
           state.error =null;

        },
        [fetchstock.rejected]:(state,action)=>{
       
           state.status ="failed";
           state.error=action.payload;
         },
         // insert books
         [insertstock.fulfilled]:(state,action)=>{
            state.data.push(action.payload);
            state.status ="success";
        state.error =null;
         },
         [insertstock.pending]:(state)=>{
            state.status ="loading";
            state.error =null;

         },
         [insertstock.rejected]:(state,action)=>{
        
            state.status ="failed";
            state.error=action.payload;
          },
          // delete hotel
          [deletestock.fulfilled]:(state,action)=>{
            state.status ="success";
        state.error =null;
        state.getalldata =state.getalldata.filter((el)=> el.id !==action.payload)
         },
         [deletestock.pending]:(state)=>{
            state.status ="loading";
            state.error =null;

         },
         [deletestock.rejected]:(state,action)=>{
        
            state.status ="failed";
            state.error=action.payload;
          },
          //single hotel
          [getSinglestock.fulfilled]:(state,action)=>{
            state.data = action.payload;
            state.status ="success";
        state.error =null;
         },
         [getSinglestock.pending]:(state)=>{
          state.status ="loading";
          state.error =null;

         },
         [getSinglestock.rejected]:(state,action)=>{
        
          state.status ="failed";
          state.error=action.payload;
          },
          //edit hotel
          
          [editstock.fulfilled]: (state, action) => {
           
            return {
              ...state,
              data: action.payload,
             
            };
          },
          [editstock.pending]: (state, action) => {
            return {
              ...state,
              status:"loading"
            };
          },
          [editstock.rejected]: (state, action) => {
            return {
              ...state,
              status:"rejected",
              error:action.payload
            };
          },
          
       
    }
})

export default stockSlice.reducer