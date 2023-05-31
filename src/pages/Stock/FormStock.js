import React, {useEffect,useState } from "react";
import { Alert, Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { Formik } from "formik";
import * as yup from 'yup';
import { useMediaQuery } from "@mui/material";
import Header from "../../components/Header";
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2'
import { fetchstock, insertstock } from '../../redux/stockSlice';
import { useNavigate } from "react-router-dom";
const FormStock = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const dispatch =useDispatch();
    const stock = useSelector(state=>state.stock)
    const {data, getalldata} = useSelector(state=>state.stock)
    let navigate = useNavigate();


useEffect(()=>{
 dispatch(fetchstock())

    },[dispatch])

    useEffect(()=>{

    
         },[stock])

    const typeDechet=[
        "plastique",
        "canette",
        "papier",
        "composte"]   
        let difference = typeDechet.filter(x => !getalldata.map((e)=>e.type_poubelle).includes(x));
    const handleFormSubmit = (values) => {
        console.log(values);
        dispatch(insertstock(values)).then((data)=>{
            console.log(data)
            if(data.type==="stock/insertstock/fulfilled" ){
             
             Swal.fire(
                       'Success',
                       `${data.payload.message}`,
                       'success'
                     ) 
                    
            }else{
                 Swal.fire({
                     icon: 'error',
                     title: 'Oops...',
                     text: 'Something went wrong!',
                   })}
           })
    };
    const initialValues = {
        type_poubelle: "",
        quantite_disponible: "",
        description: ""
    };
    const checkoutSchema = yup.object().shape({
        type_poubelle:yup.string().required("Required"),
        quantite_disponible:yup.number().required("Required"),
        description:yup.string().required("Required"),

    })


    return (
         <Box m="20px">
          <Header title="Créer stock" subtitle="Créer nouveau stock" />
          {difference.length===0? <Alert severity="error">you cant add anthor type</Alert>: <Formik onSubmit={handleFormSubmit}  enableReinitialize={true} initialValues={initialValues} validationSchema={checkoutSchema}>
            {({ values, errors, touched, handleBlur, handleChange, handleSubmit,}) => (
              <form onSubmit={handleSubmit}>
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                  }}
                >
                     <FormControl sx={{ gridColumn: "span 2" }}>
                    <InputLabel id="demo-simple-select-standard-label">Type poubelle</InputLabel>
                 <Select 
                     fullWidth
                     variant="filled"
                     type="text"
                     error={!!touched.type_poubelle && !!errors.type_poubelle}
                     helpertext={touched.type_poubelle && errors.type_poubelle}
                     onBlur={handleBlur}
                     onChange={handleChange}
                     name="type_poubelle"
                     label="Type poubelle"

                     
                     >
         {difference.map((e)=><MenuItem  key={e}  value={e}>{e}</MenuItem>) }
                  </Select>
                  </FormControl>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="number"
                    label="Quantité"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.quantite_disponible}
                    name="quantite_disponible"
                    error={!!touched.quantite_disponible && !!errors.quantite_disponible}
                    helpertext={touched.quantite_disponible && errors.quantite_disponible}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Déscription"
                    onBlur={handleBlur}
                    multiline rows={4}
                    onChange={handleChange}
                    value={values.description}
                    name="description"
                    error={!!touched.description && !!errors.description}
                    helpertext={touched.description && errors.description}
                    sx={{ gridColumn: "span 2" }}
                  />
                  
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                    Creer stock
                  </Button>
                </Box>
              </form>
            )}
          </Formik>}
          
        </Box>
      );
}

export default FormStock