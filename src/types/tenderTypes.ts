// src/types/tenderTypes.ts

// Subtype for 'Organ' information
export interface Organ {
  nom: string;
  web: string;
  nuts: string;
  email: string;
  telefon: string;
  localitat: string;
  codiPostal: string;
  direccioPostal: string;
}

// Subtype for 'DadesBasiquesPublicacio' (Basic Publication Data)
export interface DadesBasiquesPublicacio {
  descripcio: string;
  denominacio: string;
  tipusContracte: string;
  tipusTramitacio: string;
  normativaAplicable: string;
  procedimentAdjudicacio: string;
  tipusPublicacioExpedient: string;
}

// Subtype for 'DadesPublicacio' (Publication Data)
export interface DadesPublicacio {
  pressupostLicitacio: number;
  contracteHarmonitzat: boolean;
  valorEstimatContracte: number;
  pressupostBaseLicitacioAmbIva: number;
  dataTerminiPresentacioOSolicitud: string; // ISO date string
}

// Subtype for individual 'Lot' in the tender
export interface Lot {
  lotId: number;
  titol: string;
  codiNuts: string;
  descripcio: string;
  fiTermini: string; // ISO date string
  valorEstimat: number;
  cpvPrincipal_codi: string;
  cpvPrincipal_descripcio?: string;
  criterisAdjudicacio: {
    criteri_id: number;
    ponderacio: number;
    criteri_descripcio: string;
  }[];
  pressupostBaseLicitacioAmbIva: number;
}

// Subtype for 'Info' (detailed info)
export interface Info {
  organ: Organ;
  publicacio: DadesBasiquesPublicacio;
  // Add any other fields related to `info` here
}

// Main 'Tender' type
export interface Tender {
  id: number;
  title: string;
  description: string;
  info?: Info;
}
