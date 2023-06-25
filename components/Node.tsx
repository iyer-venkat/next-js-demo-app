"use client";

import { useState } from "react";
import { NodeType } from "../types/types";

const Node = ({ item }: { item: NodeType }) => {
  const [showChildren, expandCollapse] = useState(false);

  return (
    <>
      <div
        style={{ cursor: item.children?.length ? "pointer" : "default" }}
        id={`item-${item.id}`}
        onClick={() => expandCollapse(!showChildren)}
      >
        <span>{item.children?.length ? (showChildren ? "▼" : "▶") : "•"}</span>
        {item.name}
      </div>
      {item.children?.length && showChildren && (
        <div id={`child-item-${item.id}`} style={{ padding: "0 15px" }}>
          {item.children.map((child) => (
            <Node item={child} key={child.id} />
          ))}
        </div>
      )}
    </>
  );
};

export default Node;
