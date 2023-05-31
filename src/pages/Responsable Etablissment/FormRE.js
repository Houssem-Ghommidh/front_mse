import React, {useEffect,useState } from "react";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { Formik } from "formik";
import * as yup from 'yup';
import { useMediaQuery } from "@mui/material";
import Header from "../../components/Header";
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2'
import { fetchetablissement } from "../../redux/etablissementSlice";
import { insertrespetab } from "../../redux/respetabSlice";
const FormRE = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const dispatch =useDispatch();
    const etablissement = useSelector(state=>state.etablissement)
    const {getAllData} = useSelector(state=>state.etablissement)
    const[imagedata,setimageData]=useState("")


useEffect(()=>{
 dispatch(fetchetablissement())

    },[dispatch])

    useEffect(()=>{

    
         },[etablissement])
         const handlephoto = (file) => {
     
            setimageData(file[0]);
           
            
          }


    const handleFormSubmit = (values) => {
        console.log(values);
values.photo=imagedata;
        dispatch(insertrespetab(values)).then((data)=>{
            console.log(data)
            if(data.type==="respetab/insertrespetab/fulfilled" ){
             if(data.payload.success){
                Swal.fire(
                    'Success',
                    `${data.payload.message}`,
                    'success'
                  ) 
             }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${data.payload.message}`,
                  })
             }
             
                    
            }else{
                 Swal.fire({
                     icon: 'error',
                     title: 'Oops...',
                     text: 'Something went wrong!',
                   })
                }
           })
    };
    const initialValues = {
        etablissement_id: "",
        numero_fixe: "",
        nom: "",
        prenom: "",
        
        adresse: "",
        numero_telephone: "",
        email: "",
        photo: "",
        


    };
    const checkoutSchema = yup.object().shape({
        etablissement_id:yup.number().required("Required"),
        numero_fixe:yup.string().required("Required"),
        nom:yup.string().required("Required"),
        prenom:yup.string().required("Required"),
        adresse:yup.string().required("Required"),
        numero_telephone:yup.number().required("Required"),
        email:yup.string().required("Required"),
        // photo:yup.string().required("Required"),
        

    })

    return (
         <Box m="20px">
          <Header title="Ajouter Résponsable établissement" subtitle="Ajouter nouveau Résponsable établissement" />
       <Formik onSubmit={handleFormSubmit}  enableReinitialize={true} initialValues={initialValues} validationSchema={checkoutSchema}>
            {({ values, errors, touched, handleBlur, handleChange,handleSubmit,}) => (
              <form onSubmit={handleSubmit}>
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                  }}
                >
                    <Box sx={{ gridColumn: "span 4" }} display={'flex'} justifyContent='center'>
                    <FormControl fullWidth >
       <label htmlFor="photo">
         

         <input id="photo"  onChange={(e)=>handlephoto(e.target.files)}  name="photo" type='File'/>
       </label> 
       </FormControl>
    </Box>
                     <FormControl sx={{ gridColumn: "span 4" }}>
                    <InputLabel id="demo-simple-select-standard-label">Nom établissement</InputLabel>
                 <Select 
                     fullWidth
                     variant="filled"
                     type="text"
                     error={!!touched.etablissement_id && !!errors.etablissement_id}
                     helpertext={touched.etablissement_id && errors.etablissement_id}
                     onBlur={handleBlur}
                     onChange={handleChange}
                     name="etablissement_id"
                     label="Nom établissement"

                     
                     >
         {getAllData.map((e,i)=><MenuItem  key={i}  value={e.id}>{e.nom_etablissement}</MenuItem>) }
                  </Select>
                  </FormControl>
             
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Nom"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.nom}
                    name="nom"
                    error={!!touched.nom && !!errors.nom}
                    helpertext={touched.nom && errors.nom}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="prenom"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.prenom}
                    name="prenom"
                    error={!!touched.prenom && !!errors.prenom}
                    helpertext={touched.prenom && errors.prenom}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Numero fixe"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.numero_fixe}
                    name="numero_fixe"
                    error={!!touched.numero_fixe && !!errors.numero_fixe}
                    helpertext={touched.numero_fixe && errors.numero_fixe}
                    sx={{ gridColumn: "span 2" }}
                  />
                     <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Numéro téléphone"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.numero_telephone}
                    name="numero_telephone"
                    error={!!touched.numero_telephone && !!errors.numero_telephone}
                    helpertext={touched.numero_telephone && errors.numero_telephone}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="adresse"
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
                    label="E-mail"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={!!touched.email && !!errors.email}
                    helpertext={touched.email && errors.email}
                    sx={{ gridColumn: "span 2" }}
                  />
                
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                    Ajouter Résponsable établissement
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
          
        </Box>
      );
}

export default FormRE