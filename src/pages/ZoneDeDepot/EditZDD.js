import React, {useEffect,useState } from "react";
import { Box, Button, FormControl,Alert,CircularProgress, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { Formik } from "formik";
import * as yup from 'yup';
import { useMediaQuery } from "@mui/material";
import Header from "../../components/Header";
import { useDispatch,useSelector } from 'react-redux';
import Swal from 'sweetalert2'
import { insertzdd,getSinglezdd,editzdd } from '../../redux/zddSlice';
import { fetchzdt } from '../../redux/zdtSlice';
import { useParams } from "react-router-dom";
function EditZDD() {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const dispatch =useDispatch();
  const {id} = useParams();
  const {data} = useSelector(state=>state.zdd)
  const zdd = useSelector(state=>state.zdd)
  const zdt = useSelector(state=>state.zdt)
    const {error} = useSelector(state=>state.zdt)
    const {status} = useSelector(state=>state.zdt)

    useEffect(()=>{
      dispatch(getSinglezdd(id))
          },[]) 
  useEffect(()=>{
    dispatch(fetchzdt())
       },[dispatch])
   
       useEffect(()=>{
      
        console.log("test",data.zone_travail?.region)
            },[zdt,zdd])


  const handleFormSubmit = (values) => {
      dispatch(editzdd(values)).then((data)=>{
        console.log(data)
          if(data.type==="zdd/editzdd/fulfilled" ){
           Swal.fire(
                     'Success',
                     `${data.payload.data.message}`,
                     'success'
                   ) 
          }else{
               Swal.fire({
                   icon: 'error',
                   title: 'Oops...',
                   text:  `${data.payload.data.message}`,
                 })}
         })
  };

  const checkoutSchema = yup.object().shape({
    zone_travail_id:yup.string().required("Required"),
    adresse:yup.string().required("Required"),
    latitude:yup.number().required("Required"),
    longitude:yup.number().required("Required"),
    quantite_depot_maximale:yup.number().required("Required"),
    

  })
  

  return (
    <Box m="20px">
       { error!==null ?  <Alert severity="error">{error}</Alert>
    : 
    
    status ==="loading"  || zdd.satus==="loading"?  <Box style={{position: 'relative'}}>
    <CircularProgress size={40}
     left={-20}
     top={10}
     
     style={{marginLeft: '50%'}} color="secondary" /></Box>
    :zdt.getAllData.length===0 ? "Ajouter Zone de travail":
    <Box>
          <Header title="Créer zone de dépôt" subtitle="Créer nouveau zone de dépôt" />
    
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
                     <FormControl sx={{ gridColumn: "span 2" }}>
                 <InputLabel id="demo-simple-select-standard-label">Zone de travail</InputLabel>
                 <Select 
                     fullWidth
                     variant="filled"
                     type="text"
                     error={!!touched.zone_travail_id && !!errors.zone_travail_id}
                     helpertext={touched.zone_travail_id && errors.zone_travail_id}
                     onBlur={handleBlur}
                     onChange={handleChange}
                     name="zone_travail_id"
                     label="Zone de travail"
                     value={values.zone_travail_id}

                     
                     >
                     
{ zdt.getAllData.map((e,i)=> <MenuItem  key={i}  value={e.id}>{e.region}</MenuItem>)}
                  </Select>
                  </FormControl>
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
                    type="number"
                    label="Latitude"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.latitude}
                    name="latitude"
                    error={!!touched.latitude && !!errors.latitude}
                    helpertext={touched.latitude && errors.latitude}
                    sx={{ gridColumn: "span 2" }}
                  />
                   <TextField
                    fullWidth
                    variant="filled"
                    type="number"
                    label="Longitude"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.longitude}
                    name="longitude"
                    error={!!touched.longitude && !!errors.longitude}
                    helpertext={touched.longitude && errors.longitude}
                    sx={{ gridColumn: "span 2" }}
                  />
                   <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Quantité dépôt maximale"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.quantite_depot_maximale}
                    name="quantite_depot_maximale"
                    error={!!touched.quantite_depot_maximale && !!errors.quantite_depot_maximale}
                    helpertext={touched.quantite_depot_maximale && errors.quantite_depot_maximale}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Quantité dépôt actuelle plastique"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.quantite_depot_actuelle_plastique}
                    name="quantite_depot_actuelle_plastique"
                    error={!!touched.quantite_depot_actuelle_plastique && !!errors.quantite_depot_actuelle_plastique}
                    helpertext={touched.quantite_depot_actuelle_plastique && errors.quantite_depot_actuelle_plastique}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Quantité dépôt actuelle papier"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.quantite_depot_actuelle_papier}
                    name="quantite_depot_actuelle_papier"
                    error={!!touched.quantite_depot_actuelle_papier && !!errors.quantite_depot_actuelle_papier}
                    helpertext={touched.quantite_depot_actuelle_papier && errors.quantite_depot_actuelle_papier}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Quantité dépôt actuelle composte"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.quantite_depot_actuelle_composte}
                    name="quantite_depot_actuelle_composte"
                    error={!!touched.quantite_depot_actuelle_composte && !!errors.quantite_depot_actuelle_composte}
                    helpertext={touched.quantite_depot_actuelle_composte && errors.quantite_depot_actuelle_composte}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Quantité dépôt actuelle canette"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.quantite_depot_actuelle_canette}
                    name="quantite_depot_actuelle_canette"
                    error={!!touched.quantite_depot_actuelle_canette && !!errors.quantite_depot_actuelle_canette}
                    helpertext={touched.quantite_depot_actuelle_canette && errors.quantite_depot_actuelle_canette}
                    sx={{ gridColumn: "span 2" }}
                  />
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                    Creer Zone de dépôt
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
          </Box>}
        </Box>
  )
}

export default EditZDD