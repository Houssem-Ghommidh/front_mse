import {configureStore} from '@reduxjs/toolkit'
import dreSlice  from '../Responsable Etablissement/redux/dashboardSlice'
import plusRemplisSlice  from '../Responsable Etablissement/redux/plusRemplisSlice'
import blocetabSlice from './blocetabSlice'
import blocPoubelleSlice  from './blocpoubelleSlice'
import camionSlice from './camionSlice'
import etablissementSlice from './etablissementSlice'
import etageSlice from './etageSlice'
import ouvrierSlice from './ouvrierSlice'
import poubelleSlice from './poubelleSlice'
import prixSlice from './prixSlice'
import stockSlice from './stockSlice'
import zddSlice from './zddSlice'
import zdtSlice from './zdtSlice'
import  poubellereSlice  from '../Responsable Etablissement/redux/poublereSlice'
import respetabSlice from './respetabSlice'
import fournisseurSlice from './fournisseurSlice'
import produitSlice from './produitSlice'
export const store = configureStore({
    reducer:{
       
        stock:stockSlice,
        zdt:zdtSlice,
        prix:prixSlice,
        zdd:zddSlice,
        camion:camionSlice,
        etablissement:etablissementSlice,
        blocetab:blocetabSlice,
        etage:etageSlice,
        blocPoubelle:blocPoubelleSlice,
        poubelle:poubelleSlice,
        ouvrier:ouvrierSlice,
        dre:dreSlice,
        respetab:respetabSlice,
        plusRemplis:plusRemplisSlice,
        poubellere:poubellereSlice,
        fournisseur:fournisseurSlice,
        produit:produitSlice
    },
})