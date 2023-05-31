import React, {useEffect,useState } from "react";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { Formik } from "formik";
import * as yup from 'yup';
import { useMediaQuery } from "@mui/material";
import Header from "../../components/Header";
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2'
import { fetchcamion } from "../../redux/camionSlice";
import { insertouvrier } from "../../redux/ouvrierSlice";
const FormOuvrier = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const dispatch =useDispatch();
    const camion = useSelector(state=>state.camion)
    const { getAllData} = useSelector(state=>state.camion)
    const[imagedata,setimageData]=useState("")


useEffect(()=>{
 dispatch(fetchcamion())

    },[dispatch])

    useEffect(()=>{

    
         },[camion])
         const handlephoto = (file) => {
     
            setimageData(file[0]);
           
            
          }


    const handleFormSubmit = (values) => {
        console.log(values);
values.photo=imagedata;
        dispatch(insertouvrier(values)).then((data)=>{
            console.log(data)
            if(data.type==="ouvrier/insertouvrier/fulfilled" ){
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
        camion_id: "",
        poste: "",
        nom: "",
        prenom: "",
        CIN: "",
        adresse: "",
        numero_telephone: "",
        email: "",
        photo: "",
        qrcode:""


    };
    const checkoutSchema = yup.object().shape({
        camion_id:yup.number().required("Required"),
        poste:yup.string().required("Required"),
        nom:yup.string().required("Required"),
        prenom:yup.string().required("Required"),
        CIN:yup.number().required("Required"),
        adresse:yup.string().required("Required"),
        numero_telephone:yup.number().required("Required"),
        email:yup.string().required("Required"),
        // photo:yup.string().required("Required"),
        // qrcode:yup.string().required("Required"),
        

    })

    return (
         <Box m="20px">
          <Header title="Ajouter Ouvrier" subtitle="Ajouter nouveau ouvrier" />
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
                     <FormControl sx={{ gridColumn: "span 2" }}>
                    <InputLabel id="demo-simple-select-standard-label">Matricule camion</InputLabel>
                 <Select 
                     fullWidth
                     variant="filled"
                     type="text"
                     error={!!touched.camion_id && !!errors.camion_id}
                     helpertext={touched.camion_id && errors.camion_id}
                     onBlur={handleBlur}
                     onChange={handleChange}
                     name="camion_id"
                     label="Matricule camion"

                     
                     >
         {getAllData.map((e,i)=><MenuItem  key={i}  value={e.id}>{e.matricule}</MenuItem>) }
                  </Select>
                  </FormControl>
                  <FormControl  sx={{ gridColumn: "span 2" }} fullWidth >
                  <InputLabel key={1} id="demo-simple-select-label">Poste</InputLabel>
                  <Select 
                   labelId="poste"
                   id="poste"
                   fullWidth
                     variant="filled"
                    error={!!touched.camion_id && !!errors.camion_id}
                     helpertext={touched.camion_id && errors.camion_id}
                     onBlur={handleBlur}
                     onChange={handleChange}
                     label="Poste"
                   name="poste"

>
<MenuItem  key={1}  value={"conducteur"}>Conducteur</MenuItem>
<MenuItem  key={2}  value={"agent"}>Agent</MenuItem>


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
                    label="CIN"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.CIN}
                    name="CIN"
                    error={!!touched.CIN && !!errors.CIN}
                    helpertext={touched.CIN && errors.CIN}
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
                    label="E-mail"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={!!touched.email && !!errors.email}
                    helpertext={touched.email && errors.email}
                    sx={{ gridColumn: "span 2" }}
                  />
                   <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="QR"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.qrcode}
                    name="qrcode"
                    error={!!touched.qrcode && !!errors.qrcode}
                    helpertext={touched.qrcode && errors.qrcode}
                    sx={{ gridColumn: "span 2" }}
                  />
                  
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                    Ajouter ouvrier
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
          
        </Box>
      );
}

export default FormOuvrier