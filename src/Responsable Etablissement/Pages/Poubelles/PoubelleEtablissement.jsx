import React, {useEffect } from "react";
import { Box,Alert, CircularProgress, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import { useDispatch,useSelector } from 'react-redux';
import Header from "../../components/Header";
import { Progress } from 'antd'
import { fetchpoubellere } from "../../redux/poublereSlice";
import { tokens } from "../../../theme";
function ListPoubellere() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
    const poubellere = useSelector(state=>state.poubellere)
    const {error} = useSelector(state=>state.poubellere)
    const {status} = useSelector(state=>state.poubellere)
    const {getAllData} = useSelector(state=>state.poubellere)

const dispatch = useDispatch();

useEffect(()=>{
 dispatch(fetchpoubellere())

    },[dispatch])

    useEffect(()=>{
         },[poubellere])
 
  const columns = [
    
    { headerName: 'Nom du poubelle', field: 'nom' },
    { headerName: 'Nom du bloc', field: 'nom_bloc' },
    { headerName: 'Nom du étage', field: 'nom_etage' },
    { headerName: 'Type', field: 'type' },
    { headerName: 'Etat', field: 'Etat', width:200,
    renderCell: ({ row: { Etat } }) => {
      return (
        <Box
        sx={{ width: '100%' }}
        >
<Progress style={{ width: '100%' }} strokeColor='red'   percent={Etat} />


        </Box>
      );
    },
   },

      
    
   
 
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
    :poubellere.getAllData.length===0? "there is no data found":
    <Box> 
    <Box display="flex" justifyContent="space-between" alignItems="center">


<Header title="List des Etablissement" subtitle="Bienvenue a ton liste des Etablissement" />
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
</Box>
</Box> }
 
 </Box>
  )
}

export default ListPoubellere