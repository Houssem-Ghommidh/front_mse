import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { MyProSidebarProvider } from "./pages/global/sidebar/sidebarContext";
import { MyProSidebarProviderRE } from "./Responsable Etablissement/Pages/global/sidebar/sidebarContextRE";

import Topbar from "./pages/global/Topbar";
import TopbarRE from "./Responsable Etablissement/Pages/global/TopbarRE";

import Dashboard from "./pages/dashboard";
import Team from "./pages/team";
import Invoices from "./pages/invoices";
import Contacts from "./pages/contacts";
import Form from "./pages/form";
import Calendar from "./pages/calendar";
import Bar from "./pages/bar";
import Line from "./pages/line";
import Pie from "./pages/pie";
import FAQ from "./pages/faq";
import Geography from "./pages/geography";
import FormStock from "./pages/Stock/FormStock";
import ListStock from "./pages/Stock/ListStock";
import EditStock from "./pages/Stock/EditStock";
import FormZDT from "./pages/Zone de travail/FormZDT";
import ListZDT from "./pages/Zone de travail/ListZDT";
import EditZDT from "./pages/Zone de travail/EditZDT";
import FormPrix from "./pages/Prix/FormPrix";
import ListPrix from "./pages/Prix/ListPrix";
import EditPrix from "./pages/Prix/EditPrix";
import FormZDD from "./pages/ZoneDeDepot/FormZDD";
import ListZDD from "./pages/ZoneDeDepot/ListZDD";
import EditZDD from "./pages/ZoneDeDepot/EditZDD";
import FormCamion from "./pages/Camion/FormCamion";
import ListCamion from "./pages/Camion/ListCamion";
import EditCamion from "./pages/Camion/EditCamion";
import FormEtab from "./pages/Etablissement/FormEtab";
import ListEtab from "./pages/Etablissement/ListEtab";
import EditEtab from "./pages/Etablissement/EditEtab";
import FormBlocEtab from "./pages/Bloc etablissement/FormBlocEtab";
import ListBlocEtab from "./pages/Bloc etablissement/ListBlocEtab";
import EditBlocPoubelle from "./pages/Bloc Poubelle/EditBlocPoubelle";
import ListBlocPoubelle from "./pages/Bloc Poubelle/ListBlocPoubelle";
import FormBlocPoubelle from "./pages/Bloc Poubelle/FormBlocPoubelle";
import FormEtage from "./pages/Etage/FormEtage";
import ListEtage from "./pages/Etage/ListEtage";
import EditEtage from "./pages/Etage/EditEtage";
import FormPoubelle from "./pages/Pouelle/FormPoubelle";
import ListPoubelle from "./pages/Pouelle/ListPoubelle";
import EditPoubelle from "./pages/Pouelle/EditPoubelle";
import FormOuvrier from "./pages/ouvrier/FormOuvrier";
import ListOuvrier from "./pages/ouvrier/ListOuvrier";
import EditOuvrier from "./pages/ouvrier/EditOuvrier";
import FormRE from "./pages/Responsable Etablissment/FormRE";
import ListRE from "./pages/Responsable Etablissment/ListRE";
import EditRE from "./pages/Responsable Etablissment/EditRE";
import Login from "./pages/login/Login";
import Protected from "./pages/login/Protected.js";
import DashboardRE from "./Responsable Etablissement/Pages/Dashboard/DashboardRE";
import Internaute from "./Internaute/Internaute";
import PoubelleEtablissement from "./Responsable Etablissement/Pages/Poubelles/PoubelleEtablissement";
import ListPoubellere from "./Responsable Etablissement/Pages/Poubelles/PoubelleEtablissement";
import ListFournisseur from "./pages/fournisseur/ListFournisseur";
import FormFournisseur from "./pages/fournisseur/FormFournisseur";
import EditFournisseur from "./pages/fournisseur/EditFourniseur";
import FormProduit from "./pages/Produit/FormProduit";
import ListProduit from "./pages/Produit/ListPrduit";
function LinkAdmin() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MyProSidebarProvider>
        <div style={{ height: "100%", width: "100%" }}>
          <main>
            <Topbar />
            <Routes>
                <Route path="/" element={<Dashboard />} />
                
                 <Route path="/dashboard" element={<Dashboard/>} />
                <Route path="/team" element={<Team />} />
                <Route path="/formstock" element={<FormStock />} />
                <Route path="/liststock" element={<ListStock />} />
                <Route path="/formstock/:id" element={<EditStock />} />

                <Route path="/formfournisseur" element={<FormFournisseur />} />
                <Route path="/listfourniseur" element={<ListFournisseur />} />
                <Route path="/formfournisseur/:id" element={<EditFournisseur />} />

                <Route path="/formproduit" element={<FormProduit />} />
                <Route path="/listproduit" element={<ListProduit />} />
                <Route path="/formproduit/:id" element={<EditFournisseur />} />

                <Route path="/formzonedetravail" element={<FormZDT />} />
                <Route path="/listzonedetravail" element={<ListZDT />} />
                <Route path="/formzonedetravail/:id" element={<EditZDT />} />

                <Route path="/formprix" element={<FormPrix />} />
                <Route path="/listprix" element={<ListPrix />} />
                <Route path="/formprix/:id" element={<EditPrix />} />

                <Route path="/formzdd" element={<FormZDD />} />
                <Route path="/listzdd" element={<ListZDD />} />
                <Route path="/formzdd/:id" element={<EditZDD />} />

                <Route path="/formcamion" element={<FormCamion />} />
                <Route path="/listcamion" element={<ListCamion/>} />
                <Route path="/formcamion/:id" element={<EditCamion />} />

                <Route path="/formetab" element={<FormEtab />} />
                <Route path="/listetab" element={<ListEtab/>} />
                <Route path="/formetab/:id" element={<EditEtab />} />

                <Route path="/formblocetab" element={<FormBlocEtab />} />
                <Route path="/listblocetab" element={<ListBlocEtab/>} />
                <Route path="/formnlocetab/:id" element={<EditEtab />} />

                <Route path="/formetage" element={<FormEtage />} />
                <Route path="/listetage" element={<ListEtage/>} />
                <Route path="/formetage/:id" element={<EditEtage />} />

                <Route path="/formblocpoubelle" element={<FormBlocPoubelle />} />
                <Route path="/listblocpoubelle" element={<ListBlocPoubelle/>} />
                <Route path="/formblocpoubelle/:id" element={<EditBlocPoubelle />} />

                <Route path="/formpoubelle" element={<FormPoubelle />} />
                <Route path="/listpoubelle" element={<ListPoubelle/>} />
                <Route path="/formpoubelle/:id" element={<EditPoubelle />} />

                <Route path="/formouvrier" element={<FormOuvrier />} />
                <Route path="/listouvrier" element={<ListOuvrier/>} />
                <Route path="/formouvrier/:id" element={<EditOuvrier />} />

                <Route path="/formre" element={<FormRE />} />
                <Route path="/listre" element={<ListRE/>} />
                <Route path="/formre/:id" element={<EditRE />} />

                <Route path="/contacts" element={<Contacts />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/form" element={<Form />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/line" element={<Line />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/geography" element={<Geography />} />
              </Routes>
            </main>
          </div>
        </MyProSidebarProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}
function LinkRE() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MyProSidebarProviderRE>
        <div style={{ height: "100%", width: "100%" }}>
          <main>
            <TopbarRE />
            <Routes>
                <Route path="/" element={<DashboardRE />} />
                
                 <Route path="/dashboard" element={<DashboardRE/>} />
                 <Route path="/poubellere" element={<ListPoubellere/>} />
                <Route path="/team" element={<Team />} />
                <Route path="/formstock" element={<FormStock />} />
                <Route path="/liststock" element={<ListStock />} />
                <Route path="/formstock/:id" element={<EditStock />} />

                <Route path="/formzonedetravail" element={<FormZDT />} />
                <Route path="/listzonedetravail" element={<ListZDT />} />
                <Route path="/formzonedetravail/:id" element={<EditZDT />} />

                <Route path="/formprix" element={<FormPrix />} />
                <Route path="/listprix" element={<ListPrix />} />
                <Route path="/formprix/:id" element={<EditPrix />} />

                <Route path="/formzdd" element={<FormZDD />} />
                <Route path="/listzdd" element={<ListZDD />} />
                <Route path="/formzdd/:id" element={<EditZDD />} />

                <Route path="/formcamion" element={<FormCamion />} />
                <Route path="/listcamion" element={<ListCamion/>} />
                <Route path="/formcamion/:id" element={<EditCamion />} />

                <Route path="/formetab" element={<FormEtab />} />
                <Route path="/listetab" element={<ListEtab/>} />
                <Route path="/formetab/:id" element={<EditEtab />} />

                <Route path="/formblocetab" element={<FormBlocEtab />} />
                <Route path="/listblocetab" element={<ListBlocEtab/>} />
                <Route path="/formnlocetab/:id" element={<EditEtab />} />

                <Route path="/formetage" element={<FormEtage />} />
                <Route path="/listetage" element={<ListEtage/>} />
                <Route path="/formetage/:id" element={<EditEtage />} />

                <Route path="/formblocpoubelle" element={<FormBlocPoubelle />} />
                <Route path="/listblocpoubelle" element={<ListBlocPoubelle/>} />
                <Route path="/formblocpoubelle/:id" element={<EditBlocPoubelle />} />

                <Route path="/formpoubelle" element={<FormPoubelle />} />
                <Route path="/listpoubelle" element={<ListPoubelle/>} />
                <Route path="/formpoubelle/:id" element={<EditPoubelle />} />

                <Route path="/formouvrier" element={<FormOuvrier />} />
                <Route path="/listouvrier" element={<ListOuvrier/>} />
                <Route path="/formouvrier/:id" element={<EditOuvrier />} />

                <Route path="/formre" element={<FormRE />} />
                <Route path="/listre" element={<ListRE/>} />
                <Route path="/formre/:id" element={<EditRE />} />

                <Route path="/contacts" element={<Contacts />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/form" element={<Form />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/line" element={<Line />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/geography" element={<Geography />} />
              </Routes>
            </main>
          </div>
        </MyProSidebarProviderRE>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}
const App = () => {
  const [, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
    <CssBaseline />
      <div style={{ height: "100%", width: "100%" }}>
        <main>
          <Routes>
{/* <Route path="/" element={<Home/>}/>
<Route path="/login" element={<Login/>}/>
<Route path="/inscription" element={<Inscription/>}/>

<Route path="/test" element={<Test/>}/>
<Route path="/global" element={<GlobalVariable/>}/> */}
<Route path="/login" element={<Login/>}/>
<Route path="/" element={<Internaute/>}/>
<Route path="/gestionnaire/*" element={<Protected><LinkAdmin /></Protected>} />
<Route path="/responsableetablissement/*" element={ <LinkRE />} />
</Routes>
        </main>
      </div>
</ColorModeContext.Provider>
  );
};

export default App;
