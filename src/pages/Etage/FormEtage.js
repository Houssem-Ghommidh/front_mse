import React,{useEffect, useState} from 'react'
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { Formik } from "formik";
import * as yup from 'yup';
import { useMediaQuery } from "@mui/material";
import Header from "../../components/Header";
import { fetchetablissement, getSingleetablissement } from '../../redux/etablissementSlice';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { insertblocetab, listblocetab } from '../../redux/blocetabSlice';
import { insertetage } from '../../redux/etageSlice';
const FormEtage = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const dispatch =useDispatch();
    const etablissement = useSelector(state=>state.etablissement)
    const {data, getAllData} = useSelector(state=>state.etablissement)
    const blocetab = useSelector(state=>state.blocetab)
    const [idetab,setIdEtab]=useState()



useEffect(()=>{
 dispatch(fetchetablissement())

    },[dispatch])
    useEffect(()=>{

    
    },[getAllData])
    const handleFormSubmit = (values) => {
        console.log(values);
        dispatch(insertetage(values)).then((data)=>{
            console.log(data)
            if(data.type==="etage/insertetage/fulfilled" ){
             
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
       
        bloc_etablissement_id: "",
        nom_etage_etablissement:"",
        
    };
    const checkoutSchema = yup.object().shape({
        bloc_etablissement_id:yup.string().required("Required"),
        nom_etage_etablissement:yup.string().required("Required"),
      

    })
    function bloc(){
    
       dispatch(listblocetab(idetab)) 
      }

    return (
        <Box m="20px">
          <Header title="Affecter Bloc établissement" subtitle="Créer Bloc établissement" />
    
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
 <FormControl sx={{ gridColumn: "span 4" }}>
  <InputLabel id="demo-simple-select-label">établissement</InputLabel>
  <Select
    onBlur={bloc}
    onChange={e=>{setIdEtab(e.target.value);}}
    label="etablissement "
    variant="filled"
    name="etablissement_id"
    error={!!touched.etablissement_id && !!errors.etablissement_id}
    helpertext={touched.etablissement_id && errors.etablissement_id}
  >
    {
      getAllData.map(e=>{
          return(<MenuItem value={e.nom_etablissement}>{e.nom_etablissement}</MenuItem>)
      })
    }
    
 
  </Select>
  </FormControl>
  <FormControl sx={{ gridColumn: "span 4" }}>
  <InputLabel id="demo-simple-select-label">Nom du bloc établissement</InputLabel>
  <Select

    onChange={handleChange}
    label="Nom du bloc établissement"
    variant="filled"
    name="bloc_etablissement_id"
    error={!!touched.bloc_etablissement_id && !!errors.bloc_etablissement_id}
    helpertext={touched.bloc_etablissement_id && errors.bloc_etablissement_id}
  >
    {
      blocetab.getAllData.map(e=>{
          return(<MenuItem value={e.id}>{e.nom_bloc_etablissement}</MenuItem>)
      })
    }
    
 
  </Select>
  </FormControl>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Nom étage d'etablissement"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.nom_etage_etablissement}
                    name="nom_etage_etablissement"
                    error={!!touched.nom_etage_etablissement && !!errors.nom_etage_etablissement}
                    helpertext={touched.nom_etage_etablissement && errors.nom_etage_etablissement}
                    sx={{ gridColumn: "span 4" }}
                  />
                  
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                    Créer Bloc établissement
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      );
}

export default FormEtage