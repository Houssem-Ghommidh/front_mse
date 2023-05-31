import React,{useEffect} from 'react'
import { Box, Button, Alert, CircularProgress, TextField } from '@mui/material'
import { Formik } from "formik";
import * as yup from 'yup';
import { useMediaQuery } from "@mui/material";
import Header from "../../components/Header";
import { useDispatch ,useSelector} from 'react-redux';
import Swal from 'sweetalert2'
import { getSinglezdt,editzdt } from '../../redux/zdtSlice';
import { useParams } from 'react-router-dom';
function EditZDT() {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const dispatch =useDispatch();
  const {id} = useParams();
  const {data} = useSelector(state=>state.zdt)
  const {error} = useSelector(state=>state.zdt)
  const {status} = useSelector(state=>state.zdt)
  useEffect(()=>{
      dispatch(getSinglezdt(id))
          },[]) 
          const handleFormSubmit = (values) => {
            console.log(values);
            dispatch(editzdt(values)).then((data)=>{
                console.log("data",data)
                if(data.type==="zdt/editzdt/fulfilled" ){
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
          region:yup.string().required("Required"),
          
    
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
          <Header title="Créer Zone de travail" subtitle="Créer nouveau zonde detravail" />
    
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
                    label="Région"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.region}
                    name="region"
                    error={!!touched.region && !!errors.region}
                    helpertext={touched.region && errors.region}
                    sx={{ gridColumn: "span 4" }}
                  />
                 
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                  Editer Zone de travail
                  </Button>
                </Box>
              </form>
            )}
          </Formik></Box>}
        </Box>
  )
}

export default EditZDT