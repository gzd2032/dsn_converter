// Component to display the converted Commercial prefix on the MainApp.js

import React from "react";

export default function DisplayDetails({ commInfo, extension }) {
  const commPrefix = commInfo ? commInfo.split(":")[0] : "";
  const location = commInfo ? commInfo.split(":")[1] : "";

  return (
    <>
      {(commPrefix && (
        <div className="commOutput">
          <p>
            {commPrefix} {extension}
          </p>
          <p>{location}</p>
        </div>
      )) || <p>Enter a Valid DSN Prefix</p>}
    </>
  );
}
