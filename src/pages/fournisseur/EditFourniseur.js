import React from 'react'
import { Alert, Box, Button, CircularProgress, TextField } from '@mui/material'
import { Formik } from "formik";
import * as yup from 'yup';
import { useMediaQuery } from "@mui/material";
import Header from "../../components/Header";
import { editfournisseur, getSinglefournisseur } from '../../redux/fournisseurSlice';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

const EditFournisseur = () => {
  const dispatch =useDispatch();
    const {id} = useParams();
    const {data} = useSelector(state=>state.fournisseur)
    const {error} = useSelector(state=>state.fournisseur)
    const {status} = useSelector(state=>state.fournisseur)
    useEffect(()=>{
        dispatch(getSinglefournisseur(id))
            },[]) 

    const isNonMobile = useMediaQuery("(min-width:600px)");
    const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
    const handleFormSubmit = (values) => {
        console.log(values);
        dispatch(editfournisseur(values)).then((data)=>{
          if(data.type==="fournisseur/editfournisseur/fulfilled" ){
           Swal.fire(
                     'Success',
                     `fournisseur a été modifier`,
                     'success'
                   ) 
          }else{
               Swal.fire({
                   icon: 'error',
                   title: 'Oops...',
                   text: `${data.payload.message}`,
                 })}
         })
    };
 
    const checkoutSchema = yup.object().shape({
        nom_fournisseur:yup.string().required("Required"),
        adresse:yup.string().required("Required"),
        email:yup.string().email("Invalid email!").required("Required"),
        num_tel:yup.string().matches(phoneRegExp, "phone number is not valid!").required("Required"),
      

    })


    return (
        <Box m="20px">
           { error!==null ?  <Alert severity="error">{error}</Alert>
    : 
    
    status ==="loading"? <Box style={{position: 'relative'}}>
    <CircularProgress size={40}
     left={-20}
     top={10}
     
     style={{marginLeft: '50%'}} color="secondary" /></Box>
    :data.length===0? "there is no data found":<Box>
          <Header title="Update Fournisseur" subtitle="Update a Fournisseur Profile" />
    
          <Formik onSubmit={handleFormSubmit} initialValues={data} enableReinitialize={true} validationSchema={checkoutSchema}>
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
                    label="Nom fournisseur"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.nom_fournisseur}
                    name="nom_fournisseur"
                    error={!!touched.nom_fournisseur && !!errors.nom_fournisseur}
                    helpertext={touched.nom_fournisseur && errors.nom_fournisseur}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Adresse"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.adresse}
                    name="adresse"
                    error={!!touched.adresse && !!errors.adresse}
                    helpertext={touched.adresse && errors.adresse}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={!!touched.email && !!errors.email}
                    helpertext={touched.email && errors.email}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Contact Number"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.num_tel}
                    name="num_tel"
                    error={!!touched.num_tel && !!errors.num_tel}
                    helpertext={touched.num_tel && errors.num_tel}
                    sx={{ gridColumn: "span 4" }}
                  />
                 
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                    Update New Fournisseur
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
          </Box>}
        </Box>
      );
}

export default EditFournisseur