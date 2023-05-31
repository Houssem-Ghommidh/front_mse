// docs https://github.com/azouaoui-med/react-pro-sidebar
import { useState } from "react";
import { Menu, Sidebar, MenuItem } from "react-pro-sidebar";
import { useProSidebar,SubMenu  } from "react-pro-sidebar";
import EscalatorIcon from '@mui/icons-material/Escalator';
import FolderDeleteIcon from '@mui/icons-material/FolderDelete';
import { useSidebarContext } from "./sidebarContext";
import ExploreIcon from '@mui/icons-material/Explore';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import BusinessIcon from '@mui/icons-material/Business';
import profileImg from '../../../assests/images/ali.png'
import { Link } from "react-router-dom";
import { tokens } from "../../../theme";
import { useTheme, Box, Typography, IconButton } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PinDropIcon from '@mui/icons-material/PinDrop';
import ApartmentIcon from '@mui/icons-material/Apartment';
import DeleteIcon from '@mui/icons-material/Delete';
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import SwitchRightOutlinedIcon from "@mui/icons-material/SwitchRightOutlined";
import SwitchLeftOutlinedIcon from "@mui/icons-material/SwitchLeftOutlined";
import WarehouseIcon from '@mui/icons-material/Warehouse';
import { ImUserTie } from "react-icons/im";
import EngineeringIcon from '@mui/icons-material/Engineering';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Inventory2Icon from '@mui/icons-material/Inventory2';
const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{ color: colors.grey[100] }}
      onClick={() => setSelected(title)}
      icon={icon}
      routerLink={<Link to={to} />}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const MyProSidebar = () => {
  const theme = useTheme();
  
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState("Dashboard");
  const { sidebarRTL, setSidebarRTL, sidebarImage } = useSidebarContext();
  const { collapseSidebar, toggleSidebar, collapsed, broken } = useProSidebar();
  return (
    <Box
      sx={{
        position: "sticky",
        display: "flex",
        height: "100vh",
        top: 0,
        bottom: 0,
        zIndex: 10000,
        "& .sidebar": {
          border: "none",
        },
        "& .menu-icon": {
          backgroundColor: "transparent !important",
        },
        "& .menu-item": {
          // padding: "5px 35px 5px 20px !important",
          
          backgroundColor: "transparent !important",
        },
        "& .menu-anchor": {
          color: "inherit !important",
          backgroundColor: `${colors.primary[400]}`,
        },
        // "& .menu-item:hover ":{
        //    color: `${colors.blueAccent[500]} !important`,
        //   backgroundColor: "transparent !important",
        // },
        "& .menu-anchor:hover": {
          color: `${colors.blueAccent[400]} !important`,
          backgroundColor: `${colors.primary[400]} !important`,
          
        },
        "& .menu-item.active": {
          color: `${colors.greenAccent[500]} !important`,
          backgroundColor: "transparent !important",
        },
      }}
    >
      <Sidebar
        breakPoint="md"
        rtl={sidebarRTL}
        backgroundColor={colors.primary[400]}
        image={sidebarImage}
      >
        <Menu iconshape="square">
          <MenuItem
            icon={
              collapsed ? (
                <MenuOutlinedIcon onClick={() => collapseSidebar()} />
              ) : sidebarRTL ? (
                <SwitchLeftOutlinedIcon
                  onClick={() => setSidebarRTL(!sidebarRTL)}
                />
              ) : (
                <SwitchRightOutlinedIcon
                  onClick={() => setSidebarRTL(!sidebarRTL)}
                />
              )
            }
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!collapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>

{localStorage.getItem('role')}                </Typography>
                <IconButton
                  onClick={
                    broken ? () => toggleSidebar() : () => collapseSidebar()
                  }
                >
                  <CloseOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {!collapsed && (
            <Box mb="25px">
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                  "& .avater-image": {
                    backgroundColor: colors.primary[500],
                  },
                }}
              >
                <img
                  className="avater-image"
                  alt="profile user"
                  width="100px"
                  height="100px"
                  src={`${process.env.REACT_APP_BASE_URL}/api/userImages/${localStorage.getItem('image')}`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h3"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
{`${localStorage.getItem('first_name')} ${localStorage.getItem('last_name')}`}                   </Typography>
              </Box>
            </Box>
          )}
          <Box paddingLeft={collapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/gestionnaire/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
                        <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 20px 5px 20px" }}
            >
              Data
            </Typography>
            <SubMenu  icon={<ManageAccountsIcon />}  label="Fournisseur">
            <Item
              title="Ajouter fournisseur"
              to="/gestionnaire/formfournisseur"
              icon={<AddCircleIcon />}
              selected={selected}
              setSelected={setSelected}
            />
              <Item
              title="List Fournisseur"
              to="/gestionnaire/listfourniseur"
              icon={<FormatListBulletedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            </SubMenu>
            <SubMenu  icon={<Inventory2Icon />}  label="Product">
            <Item
              title="Ajouter Product"
              to="/gestionnaire/formproduit"
              icon={<AddCircleIcon />}
              selected={selected}
              setSelected={setSelected}
            />
              <Item
              title="List Product"
              to="/gestionnaire/listproduit"
              icon={<FormatListBulletedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            </SubMenu>
             
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 20px 5px 20px" }}
            >
              Data
            </Typography>
            <SubMenu  icon={<WarehouseIcon />}  label="Stock">
            <Item
              title="Ajouter Stock"
              to="/gestionnaire/formstock"
              icon={<AddCircleIcon />}
              selected={selected}
              setSelected={setSelected}
            />
              <Item
              title="List Stock"
              to="/gestionnaire/liststock"
              icon={<FormatListBulletedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            </SubMenu>
            
            <SubMenu   icon={<MonetizationOnIcon />} label="Prix dechets">
            <Item
              title="Ajouter Prix"
              to="/gestionnaire/formprix"
              icon={<AddCircleIcon />}
              selected={selected}
              setSelected={setSelected}
            />
              <Item
              title="List Prix"
              to="/gestionnaire/listprix"
              icon={<FormatListBulletedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            </SubMenu>
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 20px 5px 20px" }}
            >
              Gestion des zones
            </Typography>
            <SubMenu  icon={<ExploreIcon />} label="Zone de travail">

            <Item
              title="Ajouter Zone de travail"
              to="/gestionnaire/formzonedetravail"
              icon={<AddCircleIcon />}
              selected={selected}
              setSelected={setSelected}
            />
              <Item
              title="List Zone de travail"
              to="/gestionnaire/listzonedetravail"
              icon={<FormatListBulletedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
                        </SubMenu>

          
            <SubMenu  icon={<PinDropIcon />} label="Zone de dépôt">

            <Item
              title="Ajouter Zone de dépôt"
              to="/gestionnaire/formzdd"
              icon={<AddCircleIcon />}
              selected={selected}
              setSelected={setSelected}
            />
              <Item
              title="List Zone de dépôt"
              to="/gestionnaire/listzdd"
              icon={<FormatListBulletedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
             </SubMenu>
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 20px 5px 20px" }}
            >
              Gestion des camions
            </Typography>
            <SubMenu  icon={<LocalShippingIcon />} label="Camions">

            <Item
              title="Ajouter Camion"
              to="/gestionnaire/formcamion"
              icon={<AddCircleIcon />}
              selected={selected}
              setSelected={setSelected}
            />
              <Item
              title="List des camions"
              to="/gestionnaire/listcamion"
              icon={<FormatListBulletedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
                         </SubMenu>

                 <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 20px 5px 20px" }}
            >
              Gestion des etablissement
            </Typography>
            <SubMenu  icon={<ApartmentIcon />} label="établissement">

            <Item
              title="Ajouter etablissement"
              to="/gestionnaire/formetab"
              icon={<AddCircleIcon />}
              selected={selected}
              setSelected={setSelected}
            />
              <Item
              title="List des établissement"
              to="/gestionnaire/listetab"
              icon={<FormatListBulletedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
 </SubMenu>
 <SubMenu  icon={<BusinessIcon />} label="Bloc établissement">
            <Item
              title="Ajouter bloc etablissement"
              to="/gestionnaire/formblocetab"
              icon={<AddCircleIcon />}
              selected={selected}
              setSelected={setSelected}
            />
              <Item
              title="List des blocs établissements"
              to="/gestionnaire/listblocetab"
              icon={<FormatListBulletedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
 </SubMenu>
 <SubMenu  icon={<EscalatorIcon />} label="Étage">
            <Item
              title="Ajouter étage"
              to="/gestionnaire/formetage"
              icon={<AddCircleIcon />}
              selected={selected}
              setSelected={setSelected}
            />
              <Item
              title="List des étages"
              to="/gestionnaire/listetage"
              icon={<FormatListBulletedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
 </SubMenu>
 <SubMenu  icon={<FolderDeleteIcon />} label="Bloc Poubelle">
            <Item
              title="Ajouter Bloc Poubelle"
              to="/gestionnaire/formblocpoubelle"
              icon={<AddCircleIcon />}
              selected={selected}
              setSelected={setSelected}
            />
              <Item
              title="List des Blos Poubelle"
              to="/gestionnaire/listblocpoubelle"
              icon={<FormatListBulletedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
 </SubMenu>
 <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 20px 5px 20px" }}
            >
              Gestion des Poubelles
            </Typography>
            <SubMenu  icon={<DeleteIcon />} label="Poubelle">
            <Item
              title="Ajouter Poubelle"
              to="/gestionnaire/formpoubelle"
              icon={<AddCircleIcon />}
              selected={selected}
              setSelected={setSelected}
            />
              <Item
              title="List des Poubelle"
              to="/gestionnaire/listpoubelle"
              icon={<FormatListBulletedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
 </SubMenu>
 <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 20px 5px 20px" }}
            >
              Gestion Personnel
            </Typography>
            <SubMenu  icon={<ImUserTie size={18} />} label="Responsable établissement">
            <Item
              title="Ajouter Responsable établissement"
              to="/gestionnaire/formre"
              icon={<AddCircleIcon />}
              selected={selected}
              setSelected={setSelected}
            />
              <Item
              title="List des Responsable établissement"
              to="/gestionnaire/listre"
              icon={<FormatListBulletedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
 </SubMenu>
 <SubMenu  icon={<EngineeringIcon />} label="Ouvrier">
            <Item
              title="Ajouter ouvrier"
              to="/gestionnaire/formouvrier"
              icon={<AddCircleIcon />}
              selected={selected}
              setSelected={setSelected}
            />
              <Item
              title="List des ouvriers"
              to="/gestionnaire/listouvrier"
              icon={<FormatListBulletedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
 </SubMenu>
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 20px 5px 20px" }}
            >
              Data
            </Typography>
            <Item
              title="Manage Team"
              to="/gestionnaire/team"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
           
            <Item
              title="Contacts Information"
              to="/gestionnaire/contacts"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Invoices Balances"
              to="/gestionnaire/invoices"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 20px 5px 20px" }}
            >
              Pages
            </Typography>
            <Item
              title="Profile Form"
              to="/gestionnaire/form"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Calendar"
              to="/gestionnaire/calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FAQ Page"
              to="/gestionnaire/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 20px 5px 20px" }}
            >
              Charts
            </Typography>
            <Item
              title="Bar Chart"
              to="/gestionnaire/bar"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Pie Chart"
              to="/gestionnaire/pie"
              icon={<PieChartOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Line Chart"
              to="/gestionnaire/line"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Geography Chart"
              to="/gestionnaire/geography"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default MyProSidebar;
