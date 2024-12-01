// src/components/tender/TenderBasicInfo.tsx

interface TenderBasicInfoProps {
    title: string;
    description: string;
}

const TenderBasicInfo = ({ title, description }: TenderBasicInfoProps) => {
    return (
        <div>
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    );
};

export default TenderBasicInfo;
