import { createWriteStream, truncate } from "fs";
import { processByLine } from "./utils";
import { exec } from "child_process";
import { promisify } from "util";

const execPromise = promisify(exec);

import venueIdMap from "./map_output.json";

const writeStream = createWriteStream("tag_output.txt", { flags: "a" });

interface IPaper {
  id: string;
  venue: {
    id: string;
    raw: string;
  };
}

(async () => {
  for (let i = 0; i <= 3; i++) {
    await processByLine(`aminer_papers_${i}.txt`, async (line, lineNum) => {
      const totalNum = await execPromise(`wc aminer_papers_${i}.txt`);

      let paper = JSON.parse(line) as IPaper;
      if (!paper.venue || !paper.venue.id) {
        return;
      }
      writeStream.write(
        JSON.stringify(
          Object.assign(paper, {
            area: venueIdMap[paper.venue.id]
          })
        )
      );
      console.log(`processing ${lineNum}/${totalNum}`);
    });
  }
})();
