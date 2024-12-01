import TenderBasicInfo from './TenderInfo/TenderBasicInfo';
import TenderOrganInfo from './TenderInfo/TenderOrganInfo';
import TenderPublicationInfo from './TenderInfo/TenderPublicationInfo';
import { Tender } from '../../types/tenderTypes';

interface TenderInfoTabProps {
    tender: Tender;
}

const TenderInfoTab = ({ tender }: TenderInfoTabProps) => (
    <>
        <TenderBasicInfo title={tender.title} description={tender.description} />
        {tender.info?.organ && <TenderOrganInfo organ={tender.info.organ} />}
        {tender.info?.publicacio && (
            <TenderPublicationInfo publication={tender.info.publicacio} />
        )}
    </>
);

export default TenderInfoTab;
