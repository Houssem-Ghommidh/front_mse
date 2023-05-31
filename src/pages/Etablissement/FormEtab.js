import React, {useEffect,useState } from "react";
import { Alert, Box, Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { Formik } from "formik";
import * as yup from 'yup';
import { useMediaQuery } from "@mui/material";
import Header from "../../components/Header";
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2'
import { insertetablissement } from '../../redux/etablissementSlice';
import { fetchzdt} from '../../redux/zdtSlice';
import { fetchcamion} from '../../redux/camionSlice';
import zippostcodes from '../../data/zip-postcodes.json'

const FormEtab = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const dispatch =useDispatch();
    const zdt = useSelector(state=>state.zdt)
    const camion = useSelector(state=>state.camion)
    const {error} = useSelector(state=>state.zdt)
    const {status} = useSelector(state=>state.zdt)
   
    useEffect(()=>{
      dispatch(fetchzdt())
      dispatch(fetchcamion())
         },[dispatch])
     
         useEffect(()=>{
        console.log(zdt.getAllData)
       
              },[zdt,camion])
    const [gov,setGov]=useState("")
const [Deleg,setDeleg]=useState("")
const [city,setcity]=useState("")
const [code,setcode]=useState("")
  const test=   zippostcodes.map(e=>e.Gov).filter((value, index, self) => self.indexOf(value) === index)
  const test2=   zippostcodes.map(e=>{if(e.Gov===gov)
                                       return e.Deleg}).filter((value, index, self) => self.indexOf(value) === index)
const test3=   zippostcodes.map(e=>{
  if(e.Deleg===Deleg)
    { 
      return e.Cite}}).filter((value, index, self) => self.indexOf(value) === index)


 
      
    const handleFormSubmit = (values) => {
      values.code_postal=code
      values.delegation =Deleg
      values.gouvernorat =gov
      values.localite =city
        console.log(values);
        dispatch(insertetablissement(values)).then((data)=>{
            console.log(data)
            if(data.type==="etablissement/insertetablissement/fulfilled" ){
             
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
        zone_travail_id: "",
        camion_id: "",
        nom_etablissement: "",
        gouvernorat: "",
        delegation: "",
        localite: "",
        code_postal: "",
        type_etablissement: "",
        niveau_etablissement: "",
        nbr_personnes: "",
        url_map: "",
        adresse: "",
        longitude: "",
        latitude: "",
        quantite_dechets_plastique: 0,
        quantite_dechets_composte: 0,
        quantite_dechets_papier: 0,
        quantite_dechets_canette: 0,
        quantite_plastique_mensuel: 0,
        quantite_papier_mensuel: 0,
        quantite_composte_mensuel: 0,
        quantite_canette_mensuel:0

    };
    const checkoutSchema = yup.object().shape({
      zone_travail_id:yup.number().required("Required"),
      camion_id:yup.number().required("Required"),
      nom_etablissement:yup.string().required("Required"),
 
      type_etablissement:yup.string().required("Required"),
      niveau_etablissement:yup.string().required("Required"),
      nbr_personnes:yup.number().required("Required"),
      url_map:yup.string().required("Required"),
      adresse:yup.string().required("Required"),

      latitude:yup.number().required("Required"),
      longitude:yup.number().required("Required"),
      

    })


    return (
         <Box m="20px">
          { error!==null ?  <Alert severity="error">{error}</Alert>
    : 
    
    status ==="loading"? 
    <Box style={{position: 'relative'}}>
    <CircularProgress size={40}
     left={-20}
     top={10}
     
     style={{marginLeft: '50%'}} color="secondary" />
     </Box>
    :zdt.getAllData.length===0?  <Alert severity="error">pas de zone de travail</Alert>
    
    
    :camion.getAllData.length===0?<Alert severity="error">pas de camion</Alert>:
    <Box> 
   

    
          <Header title="Créer etablissement" subtitle="Créer nouveau etablissement" />
           <Formik onSubmit={handleFormSubmit}  enableReinitialize={true} initialValues={initialValues} validationSchema={checkoutSchema}>
            {({ values, errors, touched, handleBlur, handleChange,setFieldValue, handleSubmit,}) => (
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
  <InputLabel id="demo-simple-select-label">Affecter Zone de travail</InputLabel>
  <Select

    onChange={handleChange}
    label="Zone de travail"
    variant="filled"
    name="zone_travail_id"
    error={!!touched.zone_travail_id && !!errors.zone_travail_id}
                    helpertext={touched.zone_travail_id && errors.zone_travail_id}
  >
    {
      zdt.getAllData.map(e=>{
          return(<MenuItem value={e.id}>{e.region}</MenuItem>)
      })
    }
    
 
  </Select>
  </FormControl>
  <FormControl sx={{ gridColumn: "span 2" }}>
  <InputLabel id="demo-simple-select-label">Affecter Camion</InputLabel>
  <Select

    onChange={handleChange}
    label="Camion"
    variant="filled"
    name="camion_id"
    error={!!touched.camion_id && !!errors.camion_id}
    helpertext={touched.camion_id && errors.camion_id}
  >
    {
      camion.getAllData.map(e=>{
          return(<MenuItem value={e.id}>{e.matricule}</MenuItem>)
      })
    }
    
 
  </Select>
  </FormControl>


                <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Nom établissement"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.nom_etablissement}
                    name="nom_etablissement"
                    error={!!touched.nom_etablissement && !!errors.nom_etablissement}
                    helpertext={touched.nom_etablissement && errors.nom_etablissement}
                    sx={{ gridColumn: "span 2" }}
                  />
  <FormControl sx={{ gridColumn: "span 2" }}>
  <InputLabel id="demo-simple-select-label">Gouvernorat</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    onChange={e=>{setGov(e.target.value); setcity(""); setDeleg("")}}
    label="Gouvernorat"
    variant="filled"
    name="gouvernorat"
    error={!!touched.gouvernorat && !!errors.gouvernorat}
    helpertext={touched.gouvernorat && errors.gouvernorat}
  >
    {
      test.map(e=>{
          return(<MenuItem value={e}>{e}</MenuItem>)
      })
    }
    
 
  </Select>
  </FormControl>

  <FormControl sx={{ gridColumn: "span 2" }}>
  <InputLabel id="demo-simple-select-label">Delegation</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    onChange={e=>setDeleg(e.target.value)}
    label="delegation"
    variant="filled"
    name="delegation"
    error={!!touched.delegation && !!errors.delegation}
    helpertext={touched.delegation && errors.delegation}
  >
    {
      test2.map(e=>{
          return(<MenuItem value={e}>{e}</MenuItem>)
      })
    }
    
 
  </Select>
  </FormControl>
  <FormControl sx={{ gridColumn: "span 2" }}>
  <InputLabel id="demo-simple-select-label">Localite</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
   onChange={e=>setcity(e.target.value)}
    label="Localite"
    variant="filled"
    name="localite"
    error={!!touched.localite && !!errors.localite}
    helpertext={touched.localite && errors.localite}
    onBlur={handleBlur}
                  
  >
    {
      test3.map(e=>{
          return(<MenuItem value={e}>{e}</MenuItem>)
      })
    }
    
 
  </Select>
  </FormControl>
  {
     zippostcodes.map(e=>{if(e.Cite===city && e.Deleg===Deleg )
      {
        setcode(e.zip)
        return <TextField
        sx={{ gridColumn: "span 2" }}
        disabled
        id="outlined-disabled"
        label="Code Postal"
        value={e.zip}
        variant="filled"
        name="code_postal"
        onBlur={handleBlur}
        onChange={(e)=>setFieldValue("code_postal",e.zip)}
     
      />}})
  }
   <FormControl sx={{ gridColumn: "span 2" }}>
  <InputLabel id="demo-simple-select-label">Type établissement</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    onChange={handleChange}
    label="Type établissement"
    variant="filled"
    name="type_etablissement"
    value={values.type_etablissement}
    onBlur={handleBlur}
    error={!!touched.type_etablissement && !!errors.type_etablissement}
    helpertext={touched.type_etablissement && errors.type_etablissement}
                  
  >
   <MenuItem value="privee">Privé</MenuItem>
   <MenuItem value="public">Public</MenuItem>
   
    
 
  </Select>
  </FormControl>

  <FormControl sx={{ gridColumn: "span 2" }}>
  <InputLabel id="demo-simple-select-label">Niveau établissement</InputLabel>
  <Select

    onChange={handleChange}
    label="Niveau établissement"
    variant="filled"
    name="niveau_etablissement"
    value={values.niveau_etablissement}
    onBlur={handleBlur}
                  
  >
   <MenuItem value="ecole primaire">Ecole primaire</MenuItem>
   <MenuItem value="college">College</MenuItem>
   <MenuItem value="ecole secondaire">Ecole secondaire</MenuItem>
   <MenuItem value="universite">Universite</MenuItem>
   <MenuItem value="societe">Societe</MenuItem>
 
  </Select>
  </FormControl>
              <TextField
                    fullWidth
                    variant="filled"
                    type="number"
                    label="Nombre des personnes"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.nbr_personnes}
                    name="nbr_personnes"
                    error={!!touched.nbr_personnes && !!errors.nbr_personnes}
                    helpertext={touched.nbr_personnes && errors.nbr_personnes}
                    sx={{ gridColumn: "span 2" }}
                  />
                <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="URL Map"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.url_map}
                    name="url_map"
                    error={!!touched.url_map && !!errors.url_map}
                    helpertext={touched.url_map && errors.url_map}
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
        
                  
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                    Creer établissement
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
          </Box>}
        </Box>
      );
}

export default FormEtab