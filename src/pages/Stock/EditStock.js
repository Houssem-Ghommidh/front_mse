import React,{useEffect} from 'react'
import { Box, Button, Alert, CircularProgress, TextField } from '@mui/material'
import { Formik } from "formik";
import * as yup from 'yup';
import { useMediaQuery } from "@mui/material";
import Header from "../../components/Header";
import { useDispatch ,useSelector} from 'react-redux';
import Swal from 'sweetalert2'
import { getSinglestock,editstock } from '../../redux/stockSlice';
import { useParams } from 'react-router-dom';

const EditStock = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const dispatch =useDispatch();
    const {id} = useParams();
    const {data} = useSelector(state=>state.stock)
    const {error} = useSelector(state=>state.stock)
    const {status} = useSelector(state=>state.stock)
    useEffect(()=>{
        dispatch(getSinglestock(id))
            },[]) 

    const handleFormSubmit = (values) => {
        console.log(values);
        dispatch(editstock(values)).then((data)=>{
            console.log("data",data)
            if(data.type==="stock/editstock/fulfilled" ){
             Swal.fire(
                       'Success',
                       `${data.payload.data.message}`,
                       'success'
                     ) 
            }else{
                 Swal.fire({
                     icon: 'error',
                     title: 'Oops...',
                     text: `${data.payload.message}`,
                   })}
           })
    };

    const checkoutSchema = yup.object().shape({
        type_poubelle:yup.string().required("Required"),
        quantite_disponible:yup.number().required("Required"),
        description:yup.string().required("Required"),

    })


    return (
        <Box m="20px">
            { error!==null ?  <Alert severity="error">{error}</Alert>
    : 
    
    status ==="loading"? <Box style={{position: 'relative'}}>
    <CircularProgress size={40}
     left={-20}
     top={10}
     
     style={{marginLeft: '50%'}} color="secondary" /></Box>
    :data.length===0? "there is no data found":<Box>
          <Header title="CREATE USER" subtitle="Create a New User Profile" />
    
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
                 <TextField 
                     fullWidth
                     variant="filled"
                     type="text"
                     onBlur={handleBlur}
                     onChange={handleChange}
                     label="Type poubelle"
                     name="type_poubelle"
                     value={values.type_poubelle}
                     error={!!touched.type_poubelle && !!errors.type_poubelle}
                     helpertext={touched.type_poubelle && errors.type_poubelle}
                     sx={{ gridColumn: "span 2" }}
                     disabled
                   />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="number"
                    label="Quantité"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.quantite_disponible}
                    name="quantite_disponible"
                    error={!!touched.quantite_disponible && !!errors.quantite_disponible}
                    helpertext={touched.quantite_disponible && errors.quantite_disponible}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Déscription"
                    onBlur={handleBlur}
                    multiline rows={4}
                    onChange={handleChange}
                    value={values.description}
                    name="description"
                    error={!!touched.description && !!errors.description}
                    helpertext={touched.description && errors.description}
                    sx={{ gridColumn: "span 2" }}
                  />
                  
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                    Creer stock
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
          </Box>}
        </Box>
      );
}

export default EditStock