import React,{useEffect, useState} from 'react'
import { Alert, Box, Button, CircularProgress, TextField } from '@mui/material'
import { Formik } from "formik";
import * as yup from 'yup';
import { useMediaQuery } from "@mui/material";
import Header from "../../components/Header";
import { fetchetablissement } from '../../redux/etablissementSlice';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { editpoubelle, getSinglepoubelle } from '../../redux/poubelleSlice';
import { useParams } from 'react-router-dom';
function EditPoubelle() {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const dispatch =useDispatch();
  const poubelle = useSelector(state=>state.poubelle)
  const {getAllData} = useSelector(state=>state.etablissement)
  const [idetab,setIdEtab]=useState()
  const [nomEtab,setNomEtab]=useState()
  const [idbloc,setBloc]=useState()
  const [nombloc,setNomBloc]=useState()
  const [nomEtage,setNomEtage]=useState()
  const [idEtage,setIdEtage]=useState()
  const {id}=useParams()
useEffect(()=>{
dispatch(fetchetablissement())
dispatch(getSinglepoubelle(id))
  },[dispatch, id])
  useEffect(()=>{
  
  },[getAllData])
  const handleFormSubmit = (values) => {
    values.etablissement_id=idetab
    values.bloc_etablissement_id=idbloc
    values.etage_etablissement_id=idEtage
   
      dispatch(editpoubelle(values)).then((data)=>{
          if(data.type==="poubelle/editpoubelle/fulfilled" ){
           
           Swal.fire(
                     'Success',
                     `${data.payload.data.message}`,
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
  const checkoutSchema = yup.object().shape({
    // nom_etablissement:yup.string().required("Required"),
    // bloc_etablissement_id:yup.string().required("Required"),
    // etage_etablissement_id:yup.string().required("Required"),
    // nom_bloc_poubelle:yup.string().required("Required"),
    // type:yup.string().required("Required"),
    

  })
  

  return (
    <Box m="20px">
          <Header title="Modifier la poubelle" subtitle="Veuillez modifier la poubelle" />
    
          { poubelle.error!==null ?  <Alert severity="error">{poubelle.error}</Alert>
    : 
    
    poubelle.status ==="loading"? <Box style={{position: 'relative'}}>
    <CircularProgress size={40}
     left={-20}
     top={10}
     
     style={{marginLeft: '50%'}} color="secondary" /></Box>
    :poubelle.data.length===0? "there is no data found":   <Formik onSubmit={handleFormSubmit} initialValues={poubelle.data} validationSchema={checkoutSchema}>
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
                    label="Etat"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="Etat"
                    value={values.Etat}
                    error={!!touched.Etat && !!errors.Etat}
                    helpertext={touched.Etat && errors.Etat}
                    sx={{ gridColumn: "span 2" }}
                  />

                  
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                    Modifier la poubelle
                  </Button>
                </Box>
              </form>
            )}
          </Formik>}
        </Box>
  )
}

export default EditPoubelle