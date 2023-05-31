import {
    Box,
    Button,
    Typography,
    useTheme,
    useMediaQuery,
    CircularProgress,Alert
  } from "@mui/material";
  import DeleteIcon from '@mui/icons-material/Delete';
  import Grid from "@mui/material/Unstable_Grid2";
  import { tokens } from "../../../theme";
  import FolderDeleteIcon from '@mui/icons-material/FolderDelete';
    import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
  import Header from "../../components/Header";
  import EscalatorIcon from '@mui/icons-material/Escalator';
    import GeographyChart from "../../components/GeographyChart";
  import BarChart from "../../components/BarChart";
  import StatBox from "../../components/StatBox";
  import ProgressCircle from "../../components/ProgressCircle";
  import plastique from '../../assests/images/plastique.png'
  import canette from '../../assests/images/canette.png'
  import carton from '../../assests/images/carton.png'
  import composte from '../../assests/images/composte.png'
import { useEffect } from "react";
import { useDispatch ,useSelector} from "react-redux";
import { fetchdre,fetchprice } from "../../redux/dashboardSlice";
import { fetchplusRemplis } from "../../redux/plusRemplisSlice";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import BusinessIcon from '@mui/icons-material/Business';
import InfoBox from "../../components/InfoBox";
  const DashboardRE = () => {
    const theme = useTheme();
    const dispatch=useDispatch()
    const dre = useSelector(state=>state.dre)
    const {getAllPrice}=useSelector(state=>state.dre)
    const plusRemplis = useSelector(state=>state.plusRemplis)
    const {error} = useSelector(state=>state.dre)
    const {status} = useSelector(state=>state.dre)
    const smScreen = useMediaQuery(theme.breakpoints.up("sm"));
    const colors = tokens(theme.palette.mode);
    useEffect(() => {
   dispatch(fetchdre())
   dispatch(fetchplusRemplis())
   dispatch(fetchprice())
    }, [dispatch])
    return (
      <Box m="20px">
        {/* HEADER */}
        { error!==null ?  <Alert severity="error">{error}</Alert>
    : 
    
    status ==="loading"? <Box style={{position: 'relative'}}>
    <CircularProgress size={40}
     left={-20}
     top={10}
     
     style={{marginLeft: '50%'}} color="secondary" /></Box>
    :dre.getAllData.length===0? "there is no data found":
    <Box> 
        <Box
          display={smScreen ? "flex" : "block"}
          flexDirection={smScreen ? "row" : "column"}
          justifyContent={smScreen ? "space-between" : "start"}
          alignItems={smScreen ? "center" : "start"}
          m="10px 0"
        >
          <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
  
          <Box>
            <Button
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
            >
              <DownloadOutlinedIcon sx={{ mr: "10px" }} />
              Download Reports
            </Button>
          </Box>
        </Box>
  
        {/* GRID & CHARTS */}
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid xs={12} sm={12} md={12} lg={12} xl={12}>
            <Box
             display="flex"
             justifyContent="center"
             alignItems="center"
              backgroundColor={colors.primary[400]}
              maxHeight="100vh"
              overflow="auto"
              marginTop={2}
              marginBottom={2}
            >
              <Box
              
                color={colors.grey[100]}
                p="15px"
              >
                <Typography
                  variant="h5"
                  fontWeight="600"
                  color={colors.grey[100]}
                >
                 Statistiques générales
                </Typography>
              </Box>
             
            </Box>
          </Grid>
       
          <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
            <Box
              width="100%"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
             
              justifyContent="center"
            >
              <StatBox
                title={dre.getAllData[1].somme_qt_dechet_plastique}
                subtitle="Plastique"
                progress={dre.getAllData[1].pourcentage_qt_poubelle_plastique/100}
                increase={`${dre.getAllData[0].poubelle_plastique} P`}
                icon={
                 <img alt='plastique' width={50} height={50} src={plastique}/>   
                }
              />
            </Box>
          </Grid>
          <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
            <Box
              width="100%"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox
                title={dre.getAllData[1].somme_qt_dechet_canette}
                subtitle="Canette"
                progress={dre.getAllData[1].pourcentage_qt_poubelle_canette/100}
                increase={`${dre.getAllData[0].poubelle_canette} P`}
                icon={
                    <img alt='canette' width={50} height={50} src={canette}/>   
                   }
              />
            </Box>
          </Grid>
          <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
            <Box
              width="100%"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox
                title={dre.getAllData[1].somme_qt_dechet_papier}
                subtitle="Carton"
                progress={dre.getAllData[1].pourcentage_qt_poubelle_papier/100}
                increase={`${dre.getAllData[0].poubelle_papier} P`}
                icon={
                    <img alt="carton" width={50} height={50} src={carton}/>   
                   }
              />
            </Box>
          </Grid>
          <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
            <Box
              width="100%"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox
                title={dre.getAllData[1].somme_qt_dechet_composte}
                subtitle="Composte"
                progress={dre.getAllData[1].pourcentage_qt_poubelle_composte/100}
                increase={`${dre.getAllData[0].poubelle_composte} P`}
                icon={
                    <img alt='composte' width={50} height={50} src={composte}/>   
                   }
              />
            </Box>
           
          </Grid>
          <Grid xs={12} sm={12} md={12} lg={12} xl={12}>
            <Box
             display="flex"
             justifyContent="center"
             alignItems="center"
              backgroundColor={colors.primary[400]}
              maxHeight="100vh"
              overflow="auto"
              marginTop={2}
              marginBottom={2}
            >
              <Box
              
                color={colors.grey[100]}
                p="15px"
              >
                <Typography
                  variant="h5"
                  fontWeight="600"
                  color={colors.grey[100]}
                >
                 Prix des dechets unitaires
                </Typography>
              </Box>
             
            </Box>
          </Grid>
          
          <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
            <Box
              width="100%"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              gap="10px"
              padding="40px"
            >
             <CurrencyExchangeIcon sx={{ fontSize: 60,color:'#4e66f1' }}/>
             <Typography
                      variant="h5"
                      fontWeight="600"
                      color={colors.grey[100]}
                    >
                     
                     Plastique
                    </Typography>
                    <Typography
                      variant="h5"
                      fontWeight="600"
                      color={colors.grey[100]}
                    >
                     
                     {getAllPrice.prix_plastique}DT/KG
                    </Typography>
              </Box>
            </Grid>
            <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
            <Box
              width="100%"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              gap="10px"
              padding="40px"
            >
             <CurrencyExchangeIcon sx={{ fontSize: 60,color:'#e53154' }}/>
             <Typography
                      variant="h5"
                      fontWeight="600"
                      color={colors.grey[100]}
                    >
                     
                     Canette
                    </Typography>
             <Typography
                      variant="h5"
                      fontWeight="600"
                      color={colors.grey[100]}
                    >
                     
                     {getAllPrice.prix_canette}DT/KG
                    </Typography>
              </Box>
            </Grid>
            <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
            <Box
              width="100%"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              gap="10px"
              padding="40px"
            >
             <CurrencyExchangeIcon sx={{ fontSize: 60,color:'#ff8d29' }}/>
             <Typography
                      variant="h5"
                      fontWeight="600"
                      color={colors.grey[100]}
                    >
                    
                    Papier
                    </Typography>
                    <Typography
                      variant="h5"
                      fontWeight="600"
                      color={colors.grey[100]}
                    >
                     
                     {getAllPrice.prix_papier}DT/KG
                    </Typography>
              </Box>
            </Grid>
            <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
            <Box
              width="100%"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              gap="10px"
              padding="40px"
            >
             <CurrencyExchangeIcon sx={{ fontSize: 60,color:'#00994a' }}/>
             <Typography
                      variant="h5"
                      fontWeight="600"
                      color={colors.grey[100]}
                    >
                     Composte
                    </Typography>
                    <Typography
                      variant="h5"
                      fontWeight="600"
                      color={colors.grey[100]}
                    >
                     
                     {getAllPrice.prix_composte}DT/KG
                    </Typography>
              </Box>
            </Grid>
            
        
 
       <Grid xs={12} sm={12} md={12} lg={12} xl={12}>
            <Box
             display="flex"
             justifyContent="center"
             alignItems="center"
              backgroundColor={colors.primary[400]}
              maxHeight="100vh"
              overflow="auto"
              marginTop={2}
              marginBottom={2}
            >
              <Box
              
                color={colors.grey[100]}
                p="15px"
              >
                <Typography
                  variant="h5"
                  fontWeight="600"
                  color={colors.grey[100]}
                >
                 Données de mon établissement
                </Typography>
              </Box>
             
            </Box>
          </Grid>
       
        
          <Grid xs={12} sm={12} md={6} lg={6} xl={6}>
          <InfoBox Icon={BusinessIcon}
                   color={"purple"}
                   title="Blocs d'établissement"
                   value={`${dre.getAllData[0].bloc_etablissements_count}`}
          />
          </Grid>
          <Grid xs={12} sm={12} md={6} lg={6} xl={6}>
          <InfoBox Icon={EscalatorIcon}
                   color={"#ff9900"}
                   title="Etage d'établissement"
                   value={`${dre.getAllData[0].etage_etablissements_count}`}
          />
          </Grid>
          <Grid xs={12} sm={12} md={6} lg={6} xl={6}>
          <InfoBox Icon={FolderDeleteIcon}
                   color={"red"}
                   title="Bloc de Poubelles"
                   value={`${dre.getAllData[0].bloc_poubelles_count}`}
          />
          </Grid>
          <Grid xs={12} sm={12} md={6} lg={6} xl={6}>
          <InfoBox Icon={DeleteIcon}
                   color={"#0066ff"}
                   title="Total des Poubelles"
                   value={`${dre.getAllData[0].poubelles_count}`}
          />
          </Grid>
          <Grid xs={12} sm={12} md={12} lg={12} xl={12}>
            <Box
             display="flex"
             justifyContent="center"
             alignItems="center"
              backgroundColor={colors.primary[400]}
              maxHeight="100vh"
              overflow="auto"
              marginTop={2}
              marginBottom={2}
            >
              <Box
              
                color={colors.grey[100]}
                p="15px"
              >
                <Typography
                  variant="h5"
                  fontWeight="600"
                  color={colors.grey[100]}
                >
                 Poubelles les plus remplises dans mon établissement
                </Typography>
              </Box>
             
            </Box>
          </Grid>
          <Grid xs={12} sm={12} md={12} lg={12} xl={12}>
            <Box
              backgroundColor={colors.primary[400]}
              maxHeight="100vh"
              overflow="auto"
            >
              
              {plusRemplis.getAllData.map((transaction, i) => {
                return (
                  <Box
                    key={`${transaction}-${i}`}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    borderBottom={`4px solid ${colors.primary[500]}`}
                    p="15px"
                  >
                    <Box>
                      <Typography
                        variant="h5"
                        fontWeight="600"
                        color={colors.greenAccent[100]}
                      >
                        {transaction.type}
                      </Typography>
                      
                    </Box>
                    <Box color={colors.grey[100]}>{transaction.nom}</Box>
                    <Box
                      color={colors.greenAccent[500]}
                      p="5px 10px"
                      borderRadius="4px"
                    >
                      {transaction.etat} %
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Grid>
         

            <Grid xs={12} sm={12} md={6}>
              <Box backgroundColor={colors.primary[400]} p="30px">
                <Typography variant="h5" fontWeight="600">
                  Campaign
                </Typography>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  mt="25px"
                >
                  <ProgressCircle size="125" />
                  <Typography
                    variant="h5"
                    color={colors.greenAccent[500]}
                    sx={{ mt: "15px" }}
                  >
                    $48,352 revenue generated
                  </Typography>
                  <Typography>
                    Includes extra misc expenditures and costs
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid xs={12} sm={12} md={6}>
              <Box backgroundColor={colors.primary[400]}>
                <Typography
                  variant="h5"
                  fontWeight="600"
                  sx={{ padding: "30px 30px 0 30px" }}
                >
                  Sales Quantity
                </Typography>
                <Box height="250px" mt="-20px">
                  <BarChart isDashboard={true} />
                </Box>
              </Box>
            </Grid>
            <Grid xs={12}>
              <Box backgroundColor={colors.primary[400]} padding="30px">
                <Typography
                  variant="h5"
                  fontWeight="600"
                  sx={{ marginBottom: "15px" }}
                >
                  Geography Based Traffic
                </Typography>
                <Box height="200px">
                  <GeographyChart isDashboard={true} />
                </Box>
              </Box>
            </Grid>
          
        </Grid>
        </Box>}</Box>
    );
  };
  
  export default DashboardRE;
  