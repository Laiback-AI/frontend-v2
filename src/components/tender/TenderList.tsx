import { Spinner, Card, CardBody } from '@nextui-org/react';
import TenderItem from "./TenderItem";
import { Tender } from "../../types/tenderTypes";

interface Props {
    tenders: Tender[];
    loading: boolean;
}

const TenderList = ({ tenders, loading }: Props) => {
    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Spinner size="lg" />
            </div>
        );
    }

    if (tenders.length === 0) {
        return (
            <div>
                <Card>
                    <CardBody>
                        <p>No tenders available, change search filters.</p>
                    </CardBody>
                </Card>
            </div>
        );
    }

    return (
        <ul>
            {tenders.map((tender) => (
                <TenderItem key={tender.id} tender={tender} />
            ))}
        </ul>
    );
};


export default TenderList;
