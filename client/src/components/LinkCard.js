import React from "react";

export const LinkCard = ({link}) => {
    debugger
    return(
        <div style={{fontSize:"40px"}}>
        <h2 >Reference</h2>
        <p>Your reference: <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a></p>
        <p>From: <br></br><a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></p>
        <p>Amount Clicks by Reference: <strong>{link.clicks}</strong></p>
        <p>Date of create: <strong>{new Date(link.data).toLocaleDateString()}</strong></p>
        </div>
    )
}