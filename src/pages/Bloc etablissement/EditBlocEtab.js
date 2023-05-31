import React,{useEffect} from 'react'
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { Formik } from "formik";
import * as yup from 'yup';
import { useMediaQuery } from "@mui/material";
import Header from "../../components/Header";
import { fetchetablissement } from '../../redux/etablissementSlice';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { insertblocetab } from '../../redux/blocetabSlice';
const EditBlocEtab = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const dispatch =useDispatch();
    const etablissement = useSelector(state=>state.etablissement)
    const {data, getAllData} = useSelector(state=>state.etablissement)



useEffect(()=>{
 dispatch(fetchetablissement())

    },[dispatch])
    useEffect(()=>{

    
    },[getAllData])
    const handleFormSubmit = (values) => {
        console.log(values);
        dispatch(insertblocetab(values)).then((data)=>{
            console.log(data)
            if(data.type==="blocetab/insertblocetab/fulfilled" ){
             
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
        
    };
    const checkoutSchema = yup.object().shape({
        etablissement_id:yup.number().required("Required"),
        nom_bloc_etablissement:yup.string().required("Required"),
      

    })


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

    onChange={handleChange}
    label="etablissement "
    variant="filled"
    name="etablissement_id"
    error={!!touched.etablissement_id && !!errors.etablissement_id}
    helpertext={touched.etablissement_id && errors.etablissement_id}
  >
    {
      getAllData.map(e=>{
          return(<MenuItem value={e.id}>{e.nom_etablissement}</MenuItem>)
      })
    }
    
 
  </Select>
  </FormControl>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Nom bloc etablissement"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.nom_bloc_etablissement}
                    name="nom_bloc_etablissement"
                    error={!!touched.nom_bloc_etablissement && !!errors.nom_bloc_etablissement}
                    helpertext={touched.nom_bloc_etablissement && errors.nom_bloc_etablissement}
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

export default EditBlocEtab