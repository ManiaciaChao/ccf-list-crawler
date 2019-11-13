import {
  readdirSync,
  existsSync,
  realpathSync,
  writeFile,
  writeFileSync
} from "fs";
import { promisify } from "util";
import { exec } from "child_process";
import { processByLine, execute, getSelfFilename } from "./utils";
import { IPaper } from "./type";

(async () => {
  const path = "./output/tag_output.txt";
  // multiRead("./raw/aminer","authors",()=>{})
  const totalLineNum = (await execute(`wc -l ${path}`)).stdout;
  const authorsID = new Set<string>();

  await processByLine(path, (line, lineNum) => {
    const paper = JSON.parse(line) as IPaper;
    const ids = [paper.id, ...paper.authors.map(author => author.id)];
    ids.filter(id => id).forEach(id => authorsID.add(id));
    console.log(`processing: ${lineNum}/${totalLineNum}`);
  });
  console.log("writing...");
  writeFileSync(
    "./output/authorID_output.json",
    JSON.stringify(Array.from(authorsID))
  );
  console.log("done!");
})();
