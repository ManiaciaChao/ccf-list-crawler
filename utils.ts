import { createReadStream, fstat, existsSync } from "fs";
import { createInterface } from "readline";

export const mapToObject = map => {
  let object = Object.create(null);
  for (let [k, v] of map) {
    object[k] = v;
  }
  return object;
};

export const normalize = str =>
  str
    ? str
        .replace(/(&amp;)|,|:|-|“|”|\/|\(|\)/g, " ")
        .replace(/  +/g, " ")
        .trim()
        .toLowerCase()
    : undefined;

export async function processByLine(filepath, callback) {
  if (!existsSync(filepath)) {
    console.log(`NO FILE ${filepath}!`);
    return;
  }
  const fileStream = createReadStream(filepath);
  let lineNum = 0;
  const rl = createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    lineNum++;
    // if (lineNum > 1000) break;
    callback(line, lineNum);
  }
}
