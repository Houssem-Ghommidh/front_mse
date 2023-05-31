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
import {editcamion, getSinglecamion} from '../../redux/camionSlice'
import { useNavigate, useParams } from 'react-router-dom';
function EditCamion() {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const dispatch =useDispatch();
    const {id} = useParams();
    const zdd = useSelector(state=>state.zdd)
    const zdt = useSelector(state=>state.zdt)
    const {data} = useSelector(state=>state.camion)

    const {error} = useSelector(state=>state.zdt)
    const {status} = useSelector(state=>state.zdt)
    useEffect(()=>{
        dispatch(getSinglecamion(id))
            },[]) 
    useEffect(()=>{
      dispatch(fetchzdd())
      dispatch(fetchzdt())
         },[dispatch])
     
         useEffect(()=>{
        
       
              },[zdt,zdd])
              console.log("data is here",data)
    const handleFormSubmit = (values) => {
        console.log(values);
        dispatch(editcamion(values)).then((data)=>{
         
            if(data.type==="camion/editcamion/fulfilled" ){
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
        zone_travail_id:yup.number().required("Required"),
        zone_depot_id:yup.number().required("Required"),
        matricule:yup.string().required("Required"),
        volume_maximale_camion:yup.number().required("Required"),
        volume_actuelle_plastique:yup.number().required("Required"),
        volume_actuelle_papier:yup.number().required("Required"),
        volume_actuelle_composte:yup.number().required("Required"),
        volume_actuelle_canette:yup.number().required("Required"),
        volume_carburant_consomme:yup.number().required("Required"),
        

    })

  return (
    <Box m="20px">
               { error!==null || zdd.error  ?   <Alert severity="error">{error}</Alert>
    : 
    
    status ==="loading" || zdd?.status==="loading"  ?  <Box style={{position: 'relative'}}>
    <CircularProgress size={40}
     left={-20}
     top={10}
     
     style={{marginLeft: '50%'}} color="secondary" /></Box>
    :zdt.getAllData.length===0 ? "Ajouter Zone de travail":
    zdd?.getAllData.length===0 ? "Ajouter Zone de dépôt":
    <Box>
          <Header title="Créer nouveau camion" subtitle="Create a New User Profile" />
    
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
                     value={values.zone_travail_id}
                     onBlur={handleBlur}
                     onChange={handleChange}
                     name="zone_travail_id"
                     label="Zone de travail"

                     
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
                     value={values.zone_depot_id}
                     label="Zone de depot" 
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
                   <TextField
                    fullWidth
                    variant="filled"
                    type="number"
                    label="Volume actuelle plastique"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.volume_actuelle_plastique}
                    name="volume_actuelle_plastique"
                    error={!!touched.volume_actuelle_plastique && !!errors.volume_actuelle_plastique}
                    helpertext={touched.volume_actuelle_plastique && errors.volume_actuelle_plastique}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="number"
                    label="Volume actuelle papier"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.volume_actuelle_papier}
                    name="volume_actuelle_papier"
                    error={!!touched.volume_actuelle_papier && !!errors.volume_actuelle_papier}
                    helpertext={touched.volume_actuelle_papier && errors.volume_actuelle_papier}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="number"
                    label="Volume actuelle composte"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.volume_actuelle_composte}
                    name="volume_actuelle_composte"
                    error={!!touched.volume_actuelle_composte && !!errors.volume_actuelle_composte}
                    helpertext={touched.volume_actuelle_composte && errors.volume_actuelle_composte}
                    sx={{ gridColumn: "span 2" }}
                  />
                   <TextField
                    fullWidth
                    variant="filled"
                    type="number"
                    label="Volume actuelle canette"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.volume_actuelle_canette}
                    name="volume_actuelle_canette"
                    error={!!touched.volume_actuelle_canette && !!errors.volume_actuelle_canette}
                    helpertext={touched.volume_actuelle_canette && errors.volume_actuelle_canette}
                    sx={{ gridColumn: "span 2" }}
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

export default EditCamion