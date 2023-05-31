import React, {useEffect } from "react";
import { Box,Alert, CircularProgress, useTheme } from "@mui/material";
import { DataGrid, GridToolbar ,GridActionsCellItem} from "@mui/x-data-grid";
import { tokens } from "../../theme";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2'
import { useDispatch,useSelector } from 'react-redux';
import Header from "../../components/Header";
import { useNavigate } from 'react-router-dom';
import { deletepoubelle, fetchpoubelle } from "../../redux/poubelleSlice";
import { Progress } from 'antd'
function ListPoubelle() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
    const poubelle = useSelector(state=>state.poubelle)
    const {error} = useSelector(state=>state.poubelle)
    const {status} = useSelector(state=>state.poubelle)
    const {getAllData} = useSelector(state=>state.poubelle)
    let navigate = useNavigate();

const dispatch = useDispatch();

useEffect(()=>{
 dispatch(fetchpoubelle())

    },[dispatch])

    useEffect(()=>{
         },[poubelle])
 
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
onClick={() =>{navigate(`/gestionnaire/formpoubelle/${params.id}`)}}
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

                    dispatch(deletepoubelle(params.id))
                  }
                })
                
              }}

            />,
          ]
        

     
      
    },
    { headerName: 'Nom du poubelle', field: 'nom' },
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

    { headerName: 'Nom d\'établissement', field: 'etablissement' },
      
    
   
 
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
    :poubelle.getAllData.length===0? "there is no data found":
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

export default ListPoubelle