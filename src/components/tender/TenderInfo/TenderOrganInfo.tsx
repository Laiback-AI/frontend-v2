import { Organ } from '../../../types/tenderTypes';

interface TenderOrganInfoProps {
    organ: Organ;
}

const TenderOrganInfo = ({ organ }: TenderOrganInfoProps) => {
    if (!organ) return null;

    return (
        <div>
            <h3>Organ Information</h3>
            <p>Name: {organ.nom}</p>
            <p>Address: {organ.direccioPostal}</p>
            <p>City: {organ.localitat}</p>
            <p>Postal Code: {organ.codiPostal}</p>
            <p>NUTS: {organ.nuts}</p>
            <p>Website: <a href={`http://${organ.web}`} target="_blank" rel="noopener noreferrer">{organ.web}</a></p>
            <p>Phone: {organ.telefon}</p>
            <p>Email: {organ.email}</p>
        </div>
    );
};

export default TenderOrganInfo;
