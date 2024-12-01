// src/components/tender/TenderInfo/TenderPublicationInfo.tsx
import { DadesBasiquesPublicacio } from '../../../types/tenderTypes';

interface TenderPublicationInfoProps {
    publication: DadesBasiquesPublicacio;
}

const TenderPublicationInfo = ({ publication }: TenderPublicationInfoProps) => {
    if (!publication) return null;

    return (
        <div>
            <h3>Publication Information</h3>
            <p>Description: {publication.descripcio}</p>
            <p>Denomination: {publication.denominacio}</p>
            <p>Contract Type: {publication.tipusContracte}</p>
            <p>Processing Type: {publication.tipusTramitacio}</p>
            <p>Applicable Law: {publication.normativaAplicable}</p>
            <p>Adjudication Procedure: {publication.procedimentAdjudicacio}</p>
            <p>Type of Publication: {publication.tipusPublicacioExpedient}</p>
        </div>
    );
};

export default TenderPublicationInfo;
