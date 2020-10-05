//Component to display the list of DSN prefixes

import React from "react";
import ShowListItem from "./ShowListItem";

export default function ShowList(props) {
  const { itemList, loading } = props;

  if (loading) return "Loading....";

  return (
    <>
      <h2>DSN List</h2>
      <div id="itemListContainer">
        <div className="itemHeader"></div>
        <div className="itemHeader">DSN</div>
        <div className="itemHeader">COMM</div>
        <div className="itemHeader">Location</div>

        {itemList.map((item) => (
          <ShowListItem key={item.id} {...item} />
        ))}
      </div>
    </>
  );
}
