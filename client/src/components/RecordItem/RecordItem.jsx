import "./RecordItem.css";
import CustomDivider from "../CustomDivider/CustomDivider";
import RecordFooter from "../RecordFooter/RecordFooter";

const RecordItem = () => {

    return (
        <>
            <div className="record-item-container">
                <div className="record-item-title">
                    <h2>Medical Record Title</h2>
                </div>
                <div className="record-item-header">
                    <p>Dr. John Doe </p>
                    <p>Kevin Example</p>
                    <p>Status Active</p>
                    <p>535467346</p>
                </div>
                <div className="record-item-body">
                    <div className="record-item-body-category-header">
                        <h3>Diagnosis</h3>
                    </div>
                    <div className="record-item-body-details">
                        <p>Record Body Information about something very important stuff that is very important. Yes Very
                            Impotent</p>
                    </div>
                    <div className="record-item-body-category-header">
                        <h3>Prescription</h3>
                    </div>
                    <div className="record-item-body-details">
                        <p>Record Body Information about something very important stuff that is very important. Yes Very
                            Impotent</p>
                    </div>
                    <div className="record-item-body-category-header">
                        <h3>Other Notes</h3>
                    </div>
                    <div className="record-item-body-details">
                        <p>Record Body Information about something very important stuff that is very important. Yes Very
                            Impotent</p>
                    </div>
                </div>
            </div>
        </>
    )
}


export default RecordItem;