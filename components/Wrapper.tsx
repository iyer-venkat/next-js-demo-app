"use client";

import { useEffect, useState } from "react";
import { fetchData } from "../data/data";
import { NodeType } from "../types/types";
import Node from "./Node";

const Wrapper = () => {
  const [nodeData, setData] = useState<NodeType[]>([]);
  useEffect(() => {
    if (!nodeData.length) {
      console.log("fetch", nodeData);
      fetchData().then((data: NodeType[]) => setData(data));
    }
  }, [nodeData]);

  return (
    <div style={{ textAlign: "left" }}>
      {nodeData && nodeData.map((item) => <Node item={item} key={item.id} />)}
    </div>
  );
};

export default Wrapper;
