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
import { insertetage, listetage } from '../../redux/etageSlice';
import { listblocPoubelle } from '../../redux/blocpoubelleSlice';
import { insertpoubelle } from '../../redux/poubelleSlice';
function FormPoubelle() {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const dispatch =useDispatch();
  const etablissement = useSelector(state=>state.etablissement)
  const {data, getAllData} = useSelector(state=>state.etablissement)
  const [idetab,setIdEtab]=useState()
  const blocetab = useSelector(state=>state.blocetab)
  const etageE  = useSelector(state=>state.etage)
  const blocPoubelle  = useSelector(state=>state.blocPoubelle)
  const [nomEtab,setNomEtab]=useState()
  const [idbloc,setBloc]=useState()
  const [nombloc,setNomBloc]=useState()
  const [nomEtage,setNomEtage]=useState()
  const [idEtage,setIdEtage]=useState()
useEffect(()=>{
dispatch(fetchetablissement())

  },[dispatch])
  useEffect(()=>{

  
  },[getAllData])
  const handleFormSubmit = (values) => {
    values.etablissement_id=idetab
    values.bloc_etablissement_id=idbloc
    values.etage_etablissement_id=idEtage
   
      console.log(values);
      dispatch(insertpoubelle(values)).then((data)=>{
          console.log(data)
          if(data.type==="poubelle/insertpoubelle/fulfilled" ){
           
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
     
    etablissement_id: "",
    bloc_etablissement_id:"",
    etage_etablissement_id:"",
    bloc_poubelle_id:"",
    type:""

      
  };
  console.log('try re : ',nombloc)
  const checkoutSchema = yup.object().shape({
    // nom_etablissement:yup.string().required("Required"),
    // bloc_etablissement_id:yup.string().required("Required"),
    // etage_etablissement_id:yup.string().required("Required"),
    // nom_bloc_poubelle:yup.string().required("Required"),
    // type:yup.string().required("Required"),
    

  })
  function bloc(){
    
    dispatch(listblocetab(nomEtab)) 

    
  }
  function etage(){
   
    dispatch(listetage(`${nomEtab}/${nombloc}`)) 
     
    }
    function blocpoub(){
  
      
      dispatch(listblocPoubelle(`${nomEtab}/${nombloc}/${nomEtage}`))
     
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
<FormControl sx={{ gridColumn: "span 2" }}fullWidth >
<InputLabel  id="demo-simple-select-label">Nom de l'établisement</InputLabel>
<Select 
labelId="etablissement_id"
id="etablissement_id"
onBlur={bloc}
onChange={e=>{setIdEtab(e.target.value);getAllData.map((event,i)=>event.id===e.target.value?setNomEtab(event.nom_etablissement):console.log("event : ",event.id));}}  
label="Nom du l'établissement"
variant="filled"

name="etablissement_id"
>
{getAllData.map((e,i)=><MenuItem key={i} value={e.id}>{e.nom_etablissement}</MenuItem>) }


</Select>
</FormControl>
<FormControl sx={{ gridColumn: "span 2" }}fullWidth >
     <InputLabel key={1} id="demo-simple-select-label">Nom du bloc</InputLabel>
     <Select 
     labelId="nom_bloc_etablissement"
     id="nom_bloc_etablissement"
     onBlur={etage}
     onChange={e=>{setBloc(e.target.value);blocetab.getAllData.map((event,i)=>event.id===e.target.value?setNomBloc(event.nom_bloc_etablissement):console.log("event : ",event.id));}} 
     label="Nom du l'établissement"
     variant="filled"

     name="bloc_etablissement_id"
   >
   {blocetab.getAllData.map((e,i)=><MenuItem key={i} value={e.id}>{e.nom_bloc_etablissement}</MenuItem>) }
    
   
      </Select>
</FormControl>
<FormControl sx={{ gridColumn: "span 2" }}fullWidth >
     <InputLabel key={1} id="demo-simple-select-label">Nom du étage</InputLabel>
     <Select 
     labelId="etage_etablissement_id"
     id="etage_etablissement_id"
     onBlur={blocpoub}
     onChange={e=>{setIdEtage(e.target.value);etageE.getAllData.map((event,i)=>event.id===e.target.value?setNomEtage(event.nom_etage_etablissement):console.log("event : ",event.id));}} 
     label="Nom du l'étage"
     variant="filled"

     name="etage_etablissement_id"
   >
   { etageE.getAllData.map((e,i)=><MenuItem key={i} value={e.id}>{e.nom_etage_etablissement}</MenuItem>) }
    
   
      </Select>
</FormControl>
<FormControl sx={{ gridColumn: "span 2" }}fullWidth >
     <InputLabel key={1} id="demo-simple-select-label">Nom du bloc poubelle</InputLabel>
     <Select 
     labelId="bloc_poubelle_id"
     id="bloc_poubelle_id"
     onChange={handleChange}
     label="Nom du bloc poubelle"
     variant="filled"

     name="bloc_poubelle_id"
   >
   { blocPoubelle.getAllData.map((e,i)=><MenuItem key={i} value={e.id}>{e.nom_bloc_poubelle}</MenuItem>) }
    
   
      </Select>
</FormControl>
<FormControl sx={{ gridColumn: "span 2" }}fullWidth >
     <InputLabel key={1} id="demo-simple-select-label">Type</InputLabel>
     <Select 
     labelId="type"
     id="type"
     variant="filled"

     onChange={handleChange}
     label="Type"
     value={values.type}
     name="type"
   >
    <MenuItem value={"plastique"}>Plastique</MenuItem>
    <MenuItem value={"canette"}>Canette</MenuItem>
    <MenuItem value={"papier"}>Papier</MenuItem>
    <MenuItem value={"composte"}>Composte</MenuItem>
   
      </Select>
 </FormControl>

                  
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
  )
}

export default FormPoubelle