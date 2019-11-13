import fetch from "node-fetch";
import { JSDOM } from "jsdom";
import { writeFile } from "fs";
import { IOutputItem, ICategory, level } from "./type";

const output: IOutputItem[] = [];

(async () => {
  let res = await fetch("http://www.call4papers.cn/ccf/ccf-1.jsp").then(res =>
    res.text()
  );
  let {
    window: { document }
  } = new JSDOM(res);

  const categories: ICategory[] = [];
  const anchors = document.querySelectorAll(".field a,.field-mark a");

  for (const a of anchors) {
    categories.push({ href: (a as HTMLAnchorElement).href, area: a.innerHTML });
  }

  for (const [index, category] of categories.entries()) {
    const { href, area } = category;

    if (index !== 0) {
      res = await fetch(`http://www.call4papers.cn/ccf/${href}`).then(res =>
        res.text()
      );
      const {
        window: { document: temp }
      } = new JSDOM(res);
      document = temp;
    }
    console.log(res.length);

    const tables = document.querySelectorAll(".sub-frame .ccf-table");

    for (const [index, table] of tables.entries()) {
      const type = index < 3 ? "conference" : "journal";
      const level = ["A", "B", "C"][index % 3] as level;
      const contents = table.querySelectorAll(".table-tr-content");

      for (const [index, content] of contents.entries()) {
        if (index !== 0) {
          const name = content
            .querySelector(".table-tr-name a,.table-tr-jname h4")
            .innerHTML.trim();
          const siNode = content.querySelector(".table-tr-si a");
          output.push({
            area,
            type,
            level,
            name,
            si: siNode ? siNode.innerHTML.trim() : undefined
          });
        }
      }
    }
  }

  writeFile("./output/crawler_output.json", JSON.stringify(output, null, 2), () =>
    console.log(`${output.length} items saved in output.json!`)
  );
})();
