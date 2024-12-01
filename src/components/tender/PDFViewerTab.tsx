import { FaDownload } from 'react-icons/fa';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { zoomPlugin } from '@react-pdf-viewer/zoom';
import '@react-pdf-viewer/core/lib/styles/index.css';
import styles from '../../styles/PDFViewer.module.css';

const PDFViewerTab = () => {
    const zoomPluginInstance = zoomPlugin();
    const { ZoomInButton, ZoomOutButton, ZoomPopover } = zoomPluginInstance;

    return (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <div className={styles.container}>
                <div className={styles.toolbar}>
                    <div className={styles.zoomControls}>
                        <ZoomInButton />
                        <ZoomOutButton />
                        <ZoomPopover />
                    </div>
                    <a href="/200024211_long.pdf" download className={styles.downloadButton}>
                        <FaDownload size={20} />
                    </a>
                </div>
                <Viewer fileUrl="/200024211_long.pdf" plugins={[zoomPluginInstance]} />
            </div>
        </Worker>
    );
};

export default PDFViewerTab;
