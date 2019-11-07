import { writeFile, write } from "fs";
import input from "./crawler_output.json";
import { normalize } from "./utils.js";

const inputCopy = Object.assign(input, {});

writeFile(
  "normalize_output.json",
  JSON.stringify(
    inputCopy.map(item => {
      let [abbr, suffix] = item.name.split(" : ").map(str => normalize(str));
      if (!suffix) {
        abbr = undefined;
      }
      return Object.assign(item, {
        si: normalize(item.si),
        abbr,
        name: normalize(item.name),
        suffix
      });
    })
  ),
  () => console.log("done!")
);
