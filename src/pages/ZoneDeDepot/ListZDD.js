import React, {  useState,useEffect } from "react";
import { Box,Alert, CircularProgress, useTheme } from "@mui/material";
import { DataGrid, GridToolbar ,GridActionsCellItem} from "@mui/x-data-grid";
import { tokens } from "../../theme";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2'
import { useDispatch,useSelector } from 'react-redux';
import {fetchzdd,deletezdd} from '../../redux/zddSlice'
import Header from "../../components/Header";
import { useNavigate } from 'react-router-dom';

function ListZDD() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
    const zdd = useSelector(state=>state.zdd)
    const {error} = useSelector(state=>state.zdd)
    const {status} = useSelector(state=>state.zdd)
    const {getAllData} = useSelector(state=>state.zdd)
    let navigate = useNavigate();
const dispatch = useDispatch();

useEffect(()=>{
 dispatch(fetchzdd())

    },[dispatch])

    useEffect(()=>{

     console.log('zdd : ', zdd)
         },[zdd])
 
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
onClick={() =>{navigate(`/gestionnaire/formzdd/${params.id}`)}}
            />,
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              color="error"
              onClick={(zdd)=> {
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

                    dispatch(deletezdd(params.id))
                  }
                })
                
              }}

            />,
          ]
        

     
      
    },
    
      { headerName: 'Adresse', field: 'adresse',minWidth:300 },
      { headerName: 'Quantite depot maximale', field: 'quantite_depot_maximale',minWidth:50 },
      { headerName: 'Quantite depot actuelle plastique', field: 'quantite_depot_actuelle_plastique',minWidth:50 },
      { headerName: 'Quantite depot actuelle papier', field: 'quantite_depot_actuelle_papier',minWidth:50 },
      { headerName: 'Quantite depot actuelle composte', field: 'quantite_depot_actuelle_composte',minWidth:50 },
      { headerName: 'Quantite depot actuelle canette', field: 'quantite_depot_actuelle_canette',minWidth:50 },
 
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
    :zdd.getAllData.length===0? "there is no data found":
    <Box> 
    <Box display="flex" justifyContent="space-between" alignItems="center">


<Header title="List des Zone de dépôt" subtitle="Bienvenue a ton liste des Zone de dépôt" />
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

export default ListZDD