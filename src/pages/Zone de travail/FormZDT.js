import React from 'react'
import { Autocomplete, Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { Formik } from "formik";
import * as yup from 'yup';
import { useMediaQuery } from "@mui/material";
import Header from "../../components/Header";
import { insertzdt } from '../../redux/zdtSlice';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2'
import zippostcodes from '../../data/zip-postcodes.json'

const FormZDT = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const dispatch =useDispatch();
    const test=   zippostcodes.map(e=>e.zip).filter((value, index, self) => self.indexOf(value) === index)
    const handleFormSubmit = (values) => {
        console.log(values);
        dispatch(insertzdt(values)).then((data)=>{
          console.log(data)
          if(data.type==="zdt/insertzdt/fulfilled" ){
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
        region: "",
   
    };
    const checkoutSchema = yup.object().shape({
      region:yup.string().required("Required"),
      

    })


    return (
        <Box m="20px">
          <Header title="Créer Zone de travail" subtitle="Créer nouveau zonde detravail" />
    
          <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={checkoutSchema}>
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
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Région"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.region}
                    name="region"
                    error={!!touched.region && !!errors.region}
                    helpertext={touched.region && errors.region}
                    sx={{ gridColumn: "span 4" }}
                  />

  <Autocomplete
  disablePortal
  id="combo-box-demo"
  options={test}
  variant="filled"
  multiple
  sx={{ gridColumn: "span 2" }}
  renderInput={(params) => <TextField {...params}   variant="filled"
  label="Code Postal" />}
/>
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                  Créer Zone de travail
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      );
}

export default FormZDT