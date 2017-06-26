import React from 'react';

const ListPreapprovalType = (props) => {
    const { item, messageSplit, status } = props;
    return (
        <>
            { status === 2 && 
                <>
                    <div className="date">Food: Rejected { messageSplit && messageSplit[0] && <> ,{ messageSplit[0] } </>}</div>
                    <div className="date">Appliance: Rejected { messageSplit && messageSplit[1] && <> ,{ messageSplit[1] } </>}</div>
                </>
            }
            { ((item === 'food' || (!item)) && status !== 2) && 
            <>  
                <div className="date">Food: Approved</div>
                <div className="date">Appliance: Rejected { messageSplit && messageSplit[1] && <> ,{ messageSplit[1] } </>}</div>
            </>
            }           
            { (item === 'food, appliance' && status !== 2) && 
                <>
                    <div className="date">Food: Approved</div>
                    <div className="date">Appliance: Approved</div>
                </>
            }
            
            
            { (item === 'appliance' && status !== 2) && 
                <>
                    <div className="date">Food: Rejected { messageSplit && messageSplit[0] && <> ,{ messageSplit[0] } </>}</div>
                    <div className="date">Appliance: Approved</div>
                </>
            }
        </>
    )
};


export default ListPreapprovalType;