import React, {useEffect } from "react";
import { Box,Alert, CircularProgress, useTheme, Typography } from "@mui/material";
import { DataGrid, GridToolbar ,GridActionsCellItem} from "@mui/x-data-grid";
import { tokens } from "../../theme";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2'
import { useDispatch,useSelector } from 'react-redux';
import {fetchetage,deleteetage} from '../../redux/etageSlice'
import Header from "../../components/Header";
import { useNavigate } from 'react-router-dom';
import { fetchouvrier } from "../../redux/ouvrierSlice";
import { Progress, Space } from 'antd'
function ListOuvrier() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
    const ouvrier = useSelector(state=>state.ouvrier)
    const {error} = useSelector(state=>state.ouvrier)
    const {status} = useSelector(state=>state.ouvrier)
    const {getAllData} = useSelector(state=>state.ouvrier)
    let navigate = useNavigate();

const dispatch = useDispatch();

useEffect(()=>{
 dispatch(fetchouvrier())

    },[dispatch])

    useEffect(()=>{

     console.log('ouvrier : ', ouvrier)
         },[ouvrier])
 
  const columns = [
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ( params ) => 

        
           [
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
onClick={() =>{navigate(`/gestionnaire/formetage/${params.id}`)}}
            />,
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              color="error"
              onClick={(etage)=> {
                Swal.fire({
                  title: 'Are you sure?',
                  text: "You won't be able to revert this!",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                  if (result.isConfirmed) {

                    dispatch(deleteetage(params.id))
                  }
                })
                
              }}

            />,
          ]
        

     
      
    },
    { headerName: 'Nom', field: 'nom',minWidth:"150",felx:1 },
    { headerName: 'Prénom', field: 'prenom',minWidth:"150",felx:1 },
    { headerName: 'Poste', field: 'poste',minWidth:"150",felx:1 },
    { headerName: 'Matriculee', field: 'matricule',minWidth:"150",felx:1 },
    { headerName: 'Numero telephone', field: 'numero_telephone',minWidth:"150",felx:1 },
    { headerName: 'E-mail', field: 'email',minWidth:"150" ,felx:1},
      
    
   
 
  ];
  return (
    <Box m="20px">
    { error!==null ?  <Alert severity="error">{error}</Alert>
    : 
    
    status ==="loading"? <Box style={{position: 'relative'}}>
    <CircularProgress size={40}
     left={-20}
     top={10}
     
     style={{marginLeft: '50%'}} color="secondary" /></Box>
    :ouvrier.getAllData.length===0? "there is no data found":
    <Box> 
    <Box display="flex" justifyContent="space-between" alignItems="center">


<Header title="List des Ouvrier" subtitle="Bienvenue a ton liste des Ouvrier" />
</Box>
<Box
m="8px 0 0 0"
width="100%"
height="80vh"
sx={{
"& .MuiDataGrid-root": {
  border: "none",
},
"& .MuiDataGrid-cell": {
  borderBottom: "none",
},
"& .name-column--cell": {
  color: colors.greenAccent[300],
},
"& .MuiDataGrid-columnHeaders": {
  backgroundColor: colors.blueAccent[700],
  borderBottom: "none",
},
"& .MuiDataGrid-virtualScroller": {
  backgroundColor: colors.primary[400],
},
"& .MuiDataGrid-footerContainer": {
  borderTop: "none",
  backgroundColor: colors.blueAccent[700],
},
"& .MuiCheckbox-root": {
  color: `${colors.greenAccent[200]} !important`,
},
"& .MuiDataGrid-toolbarContainer .MuiButton-text": {
  color: `${colors.grey[100]} !important`,
},
}}
>
<DataGrid
rows={getAllData}
columns={columns}
components={{ Toolbar: GridToolbar }}
/>
</Box></Box> }
 
 </Box>
  )
}

export default ListOuvrier