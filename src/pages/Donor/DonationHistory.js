import React from "react";

function DonationHistory() {
    const history = [
                        {id: "700-00001", bank: "Lord's Pantry", type: "Canned Beans", amount: 3, date_sent: "2020-03-27", date_received: "2020-04-01"}, 
                        {id: "700-00002", bank: "Lord's Pantry", type: "Cash", amount: 24.99, date_sent: "2020-04-06", date_received: "2020-04-08"},
                    ];

    return (
        <React.Fragment>
            {history.length ? (
                <table className="table is-striped is-hoverable is-fullwidth has-text-centered">
                    <thead>
                        <tr>
                            <th className="has-text-centered">Donation ID</th>
                            <th className="has-text-centered">Food Bank</th>
                            <th className="has-text-centered">Type</th>
                            <th className="has-text-centered">Value</th>
                            <th className="has-text-centered">Date Sent</th>
                            <th className="has-text-centered">Date Received</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((item, idx) => (
                            <tr key={idx}>
                                <td className="has-text-centered">{item.id}</td>
                                <td className="has-text-centered">{item.bank}</td>
                                <td className="has-text-centered">{item.type}</td>
                                <td className="has-text-centered">{item.amount}</td>
                                <td className="has-text-centered">{item.date_sent}</td>
                                <td className="has-text-centered">{item.date_received}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="is-size-4 is-italic has-text-grey-light">Donation history not found...</p>
            )}
        </React.Fragment>
    );
}

export default DonationHistory;
