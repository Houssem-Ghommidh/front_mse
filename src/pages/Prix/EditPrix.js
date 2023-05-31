import React,{useEffect} from 'react'
import { Box,Alert, CircularProgress, Button,TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from 'yup';
import { useMediaQuery } from "@mui/material";
import Header from "../../components/Header";
import { useDispatch ,useSelector} from 'react-redux';
import Swal from 'sweetalert2'
import { getSingleprix,editprix } from '../../redux/prixSlice';
import { useParams } from 'react-router-dom';

function EditPrix() {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const dispatch =useDispatch();
    const {id} = useParams();
    const {data} = useSelector(state=>state.prix)
    const {error} = useSelector(state=>state.prix)
    const {status} = useSelector(state=>state.prix)
    useEffect(()=>{
        dispatch(getSingleprix(id))
            },[]) 

    const handleFormSubmit = (values) => {
        console.log(values);
        dispatch(editprix(values)).then((data)=>{
            console.log("data",data)
            if(data.type==="prix/editprix/fulfilled" ){
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
        type_dechet:yup.string().required("Required"),
        pourcentage_remise:yup.number().required("Required"),
        prix_unitaire:yup.number().required("Required"),

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
    <Header title="Ajouter prix déchets" subtitle="Ajouter nouveau prix déchets" />

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
              disabled
              
              label="Type déchets"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.type_dechet}
              name="type_dechet"
              error={!!touched.type_dechet && !!errors.type_dechet}
              helpertext={touched.type_dechet && errors.type_dechet}
              sx={{ gridColumn: "span 2" }}
            />
               
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
    </Formik>
    </Box>}
  </Box>
  )
}

export default EditPrix