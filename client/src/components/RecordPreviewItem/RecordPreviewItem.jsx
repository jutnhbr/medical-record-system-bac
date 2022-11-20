import {IconButton} from "@mui/material";
import {Attachment, ExpandCircleDown} from "@mui/icons-material";
import "./RecordPreviewItem.css";

const RecordPreviewItem = ({ record }) => {
    return (
        <div className="record-preview-container">
            <div className={"record-preview-icon"}>
                <Attachment/>
            </div>
            <div className={"record-info"}>
                <p>{"ID: " + record.id}</p>
                <p>{record.patient}</p>
                <p>{"Status: " + record.status}</p>
            </div>
            <div className={"record-preview-buttons"}>
                <div>
                    <IconButton aria-label="delete">
                        <ExpandCircleDown/>
                    </IconButton>
                </div>
            </div>
        </div>
    )
}

export default RecordPreviewItem;