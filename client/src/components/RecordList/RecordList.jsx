import "./RecordList.css";
import RecordPreviewItem from "../RecordPreviewItem/RecordPreviewItem";

const RecordList = ({ records }) => {
    return (
        <div className={"record-container"}>
            {records.map(record => (
                <RecordPreviewItem record={record} key={record.id} />
            ))}
        </div>
    );
}

export default RecordList;