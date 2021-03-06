import { writeFile } from "fs";
import { processByLine, normalize, mapToObject } from "./utils";
import normalizedInput from "./output/normalize_output.json";

const res = new Map<string, string[]>();

(async () => {
  //    processByLine('aminer_papers_0.txt',(line)=>{
  //        const {doc_type,venue} = JSON.parse(line)
  //      if(!venue) return;
  //      const {raw, id}= venue;
  //      if(!id) return;

  await processByLine("aminer_venues.txt", (line, lineNum) => {
    const { id, NormalizedName: rawName } = JSON.parse(line);
    if (!id && !rawName) return;
    const fullname = normalize(rawName);
    const set = new Set<string>();
    const areas = normalizedInput
      .filter(item => {
        const { abbr, name, suffix, si } = item;
        const flag =
          fullname === abbr ||
          (fullname.includes(name) && !si) ||
          fullname.includes(si) ||
          fullname.includes(suffix);
        return flag;
      })
      .forEach(item => set.add(item.area));
    if (set.size > 0) {
      res.set(id, Array.from(set));
    }
    console.log(`processing: ${lineNum}/69397 found: ${res.size}`);
  });
  console.log(res);
  writeFile("./output/map_output.json", JSON.stringify(mapToObject(res)), () =>
    console.log("done!")
  );
})();
