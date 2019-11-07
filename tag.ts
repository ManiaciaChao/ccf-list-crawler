import { createWriteStream, truncate } from "fs";
import { processByLine } from "./utils";
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
    await processByLine(`aminer_papers_${i}.txt`, (line, lineNum) => {
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
    });
  }
})();
