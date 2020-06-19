import React from "react";
import { Link } from "react-router-dom";

export const LinksList = ({links}) => {
    if (!links.length) {
        return(
        <div>no links yet</div>)
    }
    return(
        <table style={{fontSize:"30px"}}>
        <thead>
          <tr>
              <th>id</th>
              <th>Original</th>
              <th>Shortcut</th>
              <th>Open</th>
          </tr>
        </thead>

        <tbody>
            { links.map((link,index)=>{
                debugger
                return(
          <tr>
            <td>{index +1}</td>
            <td>{link.from}</td>
            <td>{link.to}</td>
            <td>
                <Link to={`/detail/${link._id}`}>open</Link>
            </td>
          </tr>
            )})}
        </tbody>
      </table>
    )
}