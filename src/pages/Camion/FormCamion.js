import React,{useEffect} from 'react'
import { Box,Alert,CircularProgress, Button, FormControl, InputLabel, Select, TextField, MenuItem } from '@mui/material'
import { Formik } from "formik";
import * as yup from 'yup';
import { useMediaQuery } from "@mui/material";
import Header from "../../components/Header";
import Swal from 'sweetalert2'
import { useDispatch,useSelector } from 'react-redux';
import {fetchzdd} from '../../redux/zddSlice'
import {fetchzdt} from '../../redux/zdtSlice'
import {insertcamion} from '../../redux/camionSlice'
import { useNavigate } from 'react-router-dom';
function FormCamion() {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const dispatch =useDispatch();
    const zdd = useSelector(state=>state.zdd)
    const zdt = useSelector(state=>state.zdt)
    const {error} = useSelector(state=>state.zdt)
    const {status} = useSelector(state=>state.zdt)
   
    useEffect(()=>{
      dispatch(fetchzdd())
      dispatch(fetchzdt())
         },[dispatch])
     
         useEffect(()=>{
        
       
              },[zdt,zdd])
    const handleFormSubmit = (values) => {
        console.log(values);
        dispatch(insertcamion(values)).then((data)=>{
            console.log(data)
            if(data.type==="camion/insertcamion/fulfilled" ){
             Swal.fire(
                       'Success',
                       `${data.payload.message}`,
                       'success'
                     ) 
            }else{
                 Swal.fire({
                     icon: 'error',
                     title: 'Oops...',
                     text: `${data.error.message}`,
                   })}
           })
    };
    const initialValues = {
        zone_travail_id: "",
        zone_depot_id: "",
        matricule: "",
        heure_sortie: "",
        heure_entree: "",
        longitude: 0,
        latitude: 0,
        volume_maximale_camion: "",
        volume_actuelle_plastique: 0,
        volume_actuelle_papier: 0,
        volume_actuelle_composte: 0, 
        volume_actuelle_canette: 0,
        volume_carburant_consomme: 0,
        Kilometrage: 0,
        
    };
    const checkoutSchema = yup.object().shape({
        zone_travail_id:yup.number().required("Required"),
        zone_depot_id:yup.number().required("Required"),
        matricule:yup.string().required("Required"),
        volume_maximale_camion:yup.number().required("Required"),
        

    })

  return (
    <Box m="20px">
               { error!==null || zdd.error!==null  ?   <Alert severity="error">{error}</Alert>
    : 
    
    status ==="loading" || zdd.status==="loading"   ?  <Box style={{position: 'relative'}}>
    <CircularProgress size={40}
     left={-20}
     top={10}
     
     style={{marginLeft: '50%'}} color="secondary" /></Box>
    :zdt.getAllData.length===0 ? "Ajouter Zone de travail":
    zdd.getAllData.length===0 ? "Ajouter Zone de dépôt":
    <Box>
          <Header title="Créer nouveau camion" subtitle="Create a New User Profile" />
    
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
                  <FormControl sx={{ gridColumn: "span 2" }}>
                    <InputLabel id="demo-simple-select-standard-label">Zone de dépôt</InputLabel>
                 <Select
                     fullWidth
                     variant="filled"
                     type="text"
                     error={!!touched.zone_depot_id && !!errors.zone_depot_id}
                     helpertext={touched.zone_depot_id && errors.zone_depot_id}
                     onBlur={handleBlur}
                     onChange={handleChange}
                     name="zone_depot_id"
                     label="Zone de depot"
                     value={values.zone_depot_id}
                     
                     >
{ zdd.getAllData.map((e,i)=> <MenuItem  key={i}  value={e.id}>{e.adresse}</MenuItem>)}
                  </Select>
                  </FormControl>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Matricule"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.matricule}
                    name="matricule"
                    error={!!touched.matricule && !!errors.matricule}
                    helpertext={touched.matricule && errors.matricule}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Volume maximale camion"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.volume_maximale_camion}
                    name="volume_maximale_camion"
                    error={!!touched.volume_maximale_camion && !!errors.volume_maximale_camion}
                    helpertext={touched.volume_maximale_camion && errors.volume_maximale_camion}
                    sx={{ gridColumn: "span 4" }}
                  />
             
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                    Créer camion
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
          </Box>}
        </Box>
  )
}

export default FormCamion