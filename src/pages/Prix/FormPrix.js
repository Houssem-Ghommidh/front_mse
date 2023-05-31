import React, { useEffect } from 'react'
import { Alert, Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { Formik } from "formik";
import * as yup from 'yup';
import { useMediaQuery } from "@mui/material";
import Header from "../../components/Header";
import { fetchprix, insertprix } from '../../redux/prixSlice';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

function FormPrix() {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const prix = useSelector(state=>state.prix)
    const {error} = useSelector(state=>state.prix)
    const {status} = useSelector(state=>state.prix)
    const { getalldata} = useSelector(state=>state.prix)
    let navigate = useNavigate();

const dispatch = useDispatch();

useEffect(()=>{
 dispatch(fetchprix())

    },[dispatch])

    useEffect(()=>{
         },[prix])
    const typeDechet=[
        "plastique",
        "canette",
        "papier",
        "composte"]   
        let difference = typeDechet.filter(x => !getalldata.map((e)=>e.type_dechet).includes(x));

    const handleFormSubmit = (values) => {
        console.log(values);
        dispatch(insertprix(values)).then((data)=>{
            console.log(data.status)
            if(data.type==="prix/insertprix/fulfilled" ){
              if(data.payload.error.length>0){
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: data.payload.error[0].msg,
                })
              }else{
                Swal.fire(
                  'Success',
                  `fournisseur a éte ajouter avec succes`,
                  'success'
                ) 
              }
          
            }else{

              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "somthing went wrong"
              })
                 }
           })
    };
    const initialValues = {
        type_dechet: "",
        pourcentage_remise: "",
        prix_unitaire: ""
    };
    const checkoutSchema = yup.object().shape({
        type_dechet:yup.string().required("Required"),
        pourcentage_remise:yup.number().required("Required"),
        prix_unitaire:yup.number().required("Required"),

    })


  return (
    <Box m="20px">
    <Header title="Ajouter prix déchets" subtitle="Ajouter nouveau prix déchets" />
    {difference.length===0? <Alert severity="error">you cant add anthor type</Alert>:
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
              <InputLabel id="demo-simple-select-standard-label">Type poubelle</InputLabel>
           <Select 
               fullWidth
               variant="filled"
               type="text"
               error={!!touched.type_dechet && !!errors.type_dechet}
               helpertext={touched.type_dechet && errors.type_dechet}
               onBlur={handleBlur}
               onChange={handleChange}
               name="type_dechet"
               label="Type déchet"

               
               >
   {difference.map((e)=><MenuItem  key={e}  value={e}>{e}</MenuItem>) }
            </Select>
            </FormControl>
            <TextField
              fullWidth
              variant="filled"
              type="number"
              label="Pourcentage remise"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.pourcentage_remise}
              name="pourcentage_remise"
              error={!!touched.pourcentage_remise && !!errors.pourcentage_remise}
              helpertext={touched.pourcentage_remise && errors.pourcentage_remise}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="number"
              label="Prix unitaire"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.prix_unitaire}
              name="prix_unitaire"
              error={!!touched.prix_unitaire && !!errors.prix_unitaire}
              helpertext={touched.prix_unitaire && errors.prix_unitaire}
              sx={{ gridColumn: "span 2" }}
            />
            
          </Box>
          <Box display="flex" justifyContent="end" mt="20px">
            <Button type="submit" color="secondary" variant="contained">
              Creer prix
            </Button>
          </Box>
        </form>
      )}
    </Formik>}
  </Box>
  )
}

export default FormPrix