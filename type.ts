export type level = "A" | "B" | "C";

export interface IOutputItem {
  area: string; // CCF领域
  type: "journal" | "conference"; // 类别
  level: level; // 级别
  name: string; // 会议名称或期刊名称
  si?: string; // 专刊名称
}

export interface ICategory {
  href: string;
  area: string;
}