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

export interface IAuthor {
  id: string;
  name: string;
  normailized_name: string;
    /**
   * @description affiliations
   */
  orgs: string[];
      /**
   * @description last known affiliations
   */
  org:string;
  position: string[];
  /**
   * @description the number of author publications
   */
  n_pubs: number;
  /**
   * @description citation count
   */
  n_citation: number;
  h_index: number;
  tags: {
    /**
     * @description research interests
     */
    t: string;
    /**
     * @description weight of interests
     */
    w: number;
  };
  pubs: {
    /**
     * @description paper id
     */
    i: string;
    /**
     * @description author order in the paper
     */
    r: number;
  };
}

export interface IPaper {
  id:string;
  n_citation:number;
  authors:{
    name:string;
    id:string;
  }[];
}
