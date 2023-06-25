export type NodeType = {
  id: string;
  name: string;
  children?: NodeType[];
};