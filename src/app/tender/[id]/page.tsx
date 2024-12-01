"use client";

import { useEffect, useState } from "react";
import { Card, CardBody, CardFooter, Button, Spinner, Textarea } from "@nextui-org/react";
import { Tabs, Tab } from "@nextui-org/tabs";
import { fetchTenderByIdService } from '../../../services/tender/tenderService';
import { Tender } from '../../../types/tenderTypes';
import Chat from '../../../components/chat/ChatMainComponent';
import TenderInfoTab from '../../../components/tender/TenderInfoTab';
import PDFViewerTab from '../../../components/tender/PDFViewerTab';
import styles from '../../../styles/TenderDetailPage.module.css';

interface Params {
    id: string;
}

/**
 * TenderDetailPage: Displays detailed information about a specific tender
 * 
 * This component fetches and displays tender details, a PDF viewer, and a chat interface.
 */
const TenderDetailPage = ({ params }: { params: Params }) => {
    const { id } = params;
    const [tender, setTender] = useState<Tender | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchTenderDetails = async () => {
            try {
                setLoading(true);
                const tenderDetail = await fetchTenderByIdService(id);
                setTender(tenderDetail ? { ...tenderDetail, id: parseInt(tenderDetail.id, 10) } : null);
            } catch (error) {
                console.error("Error fetching tender:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTenderDetails();
    }, [id]);

    return (
        <div className={styles.container}>
            <div className={styles.leftColumn}>
                <Card shadow="md" radius="lg" className={styles.card}>
                    <CardBody>
                        {loading ? (
                            <div className={styles.loadingSpinner}>
                                <Spinner color="primary" size="lg" />
                            </div>
                        ) : tender ? (
                            <Tabs aria-label="Tender Tabs" defaultSelectedKey="info">
                                <Tab title="Tender Info" key="info">
                                    <TenderInfoTab tender={tender} />
                                </Tab>
                                <Tab title="PDF Viewer" key="pdf">
                                    <PDFViewerTab />
                                </Tab>
                            </Tabs>
                        ) : (
                            <Textarea readOnly>Tender not found</Textarea>
                        )}
                    </CardBody>
                    <CardFooter>
                        <Button color="primary" onPress={() => window.history.back()}>
                            Go Back
                        </Button>
                    </CardFooter>
                </Card>
            </div>
            <div className={styles.rightColumn}>
                <Card shadow="md" radius="lg" className={styles.chatCard}>
                    <CardBody className={styles.chatCardBody}>
                        <Chat tenderId={id} />
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default TenderDetailPage;
