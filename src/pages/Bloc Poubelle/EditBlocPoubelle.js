import React,{useEffect, useState} from 'react'
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { Formik } from "formik";
import * as yup from 'yup';
import { useMediaQuery } from "@mui/material";
import Header from "../../components/Header";
import { fetchetablissement } from '../../redux/etablissementSlice';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { insertblocPoubelle } from '../../redux/blocpoubelleSlice';
import { listblocetab } from '../../redux/blocetabSlice';
import { listetage } from '../../redux/etageSlice';
function EditBlocPoubelle() {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const dispatch =useDispatch();
  const etablissement = useSelector(state=>state.etablissement)
  const {data, getAllData} = useSelector(state=>state.etablissement)
  const blocetab = useSelector(state=>state.blocetab)
  const etageE  = useSelector(state=>state.etage)
  const[blocetage,setBlocEtage]=useState("")
  const[etageid,setetageid]=useState("")
  const[dataBloc,setDataBloc]=useState([])
  const[dataEtage,setDataEtage]=useState([])
  const [idetab,setIdEtab]=useState()
  const [idbloc,setBloc]=useState()
useEffect(()=>{
dispatch(fetchetablissement())

  },[dispatch])
  useEffect(()=>{

  
  },[getAllData])
  function bloc(){
    dispatch(listblocetab(idetab)) 
    }
    function etage(){
      dispatch(listetage(`${idetab}/${idbloc}`)) 
       
      }
      console.log(etageE)
  const handleFormSubmit = (values) => {
      
      const etablisementid= getAllData.map(e=>e.nom_etablissement===idetab?e.id:null)
      const id= etablisementid.filter((value) => value != null);
      const etageid= etageE.getAllData.map(e=>e.id===values.etage_etablissement?e.nom_etage_etablissement:null)
      const ide= etageid.filter((value) => value != null);
      
      values.etablissement_id=id[0]
      // values.bloc_etablissement=idbloc
values.nom_bloc_etablissement=idbloc
      console.log(values);
      dispatch(insertblocPoubelle(values)).then((data)=>{
          console.log(data)
          if(data.type==="blocPoubelle/insertblocPoubelle/fulfilled" ){
           
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
    nom_bloc_etablissement: "",
    etage_etablissement_id:"",
    nom_bloc_poubelle:""
  };
  const checkoutSchema = yup.object().shape({
      // etablissement_id:yup.string().required("Required"),
      // bloc_etablissement_id:yup.string().required("Required"),
      // etage_etablissement:yup.string().required("Required"),

  })

  return (
    <Box m="20px">
    <Header title="Affecter Bloc Poubelle" subtitle="Créer Bloc Poubelle" />

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
<FormControl sx={{ gridColumn: "span 2" }} fullWidth >
<InputLabel key={1} id="demo-simple-select-label">Nom du bloc</InputLabel>
<Select 
labelId="nom_bloc_etablissement"
id="nom_bloc_etablissement"
onBlur={etage}
variant="filled"
onChange={e=>{setBloc(e.target.value);}} 
label="Nom du l'établissement"

name="nom_bloc_etablissement"
>
{ blocetab.getAllData.map((e,i)=><MenuItem key={i} value={e.nom_bloc_etablissement}>{e.nom_bloc_etablissement}</MenuItem>) }


</Select>
</FormControl>
<FormControl sx={{ gridColumn: "span 2" }} fullWidth >
<InputLabel key={1} id="demo-simple-select-label">Nom du étage</InputLabel>
<Select 
labelId="nom_etage_etablissement"
id="nom_etage_etablissement"
onChange={handleChange}
variant="filled"
label="Nom du l'étage"

name="etage_etablissement_id"
>
{ etageE.getAllData.map((e,i)=><MenuItem key={i} value={e.id}>{e.nom_etage_etablissement}</MenuItem>) }


</Select>
</FormControl>
<TextField
sx={{ gridColumn: "span 2" }}
fullWidth
variant="filled"
onChange={handleChange}
label={"Nom du bloc de la poubelle"} 
name="nom_bloc_poubelle"
value={values.nom_bloc_poubelle}
/>
            
          </Box>
          <Box display="flex" justifyContent="end" mt="20px">
            <Button type="submit" color="secondary" variant="contained">
            Affecter Bloc Poubelle
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  </Box>
  )
}

export default EditBlocPoubelle