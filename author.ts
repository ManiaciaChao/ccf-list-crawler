import {
  readdirSync,
  existsSync,
  realpathSync,
  writeFile,
  writeFileSync,
  createWriteStream,
  write
} from "fs";
import { promisify } from "util";
import { exec } from "child_process";
import { processByLine, execute, IProcessCallback } from "./utils";
import { IPaper, IAuthor } from "./type";
import authorID from "./output/authorID_output.json";

const multiRead = async (
  path: string,
  filter: string,
  processCb: IProcessCallback
) => {
  if (!existsSync(path)) {
    throw Error("ls: given path doesn't exist!");
  }
  const files = readdirSync(path).filter(filename => filename.includes(filter));
  for (const [index, file] of files.entries()) {
    const totalLineNum = parseInt(
      (await execute(`wc -l ${path}/${file}`)).stdout
    );
    await processByLine(`${path}/${file}`, (line, lineNum) => {
      console.log(`processing: ${lineNum}/${totalLineNum} of ${file}`);
      processCb(line, lineNum, totalLineNum);
    });
  }
};

(async () => {
  console.log("loading set...");
  const set = new Set<string>(authorID as string[]);
  console.log("set loaded.");
  const writeStream = createWriteStream("./output/author_output.txt", {
    flags: "a"
  });
  // const path = "./output/tag_output.txt";
  multiRead("./raw/aminer", "authors", (line, lineNum, totalLineNum) => {
    const author = JSON.parse(line) as IAuthor;
    set.has(author.id) ? writeStream.write(line + "\n") : null;
  });
})();
