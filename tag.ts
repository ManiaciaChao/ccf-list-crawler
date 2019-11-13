import { createWriteStream, truncate, unlinkSync, existsSync } from "fs";
import { processByLine } from "./utils";
import venueIdMap from "./output/map_output.json";

interface IPaper {
  id: string;
  venue: {
    id: string;
    raw: string;
  };
}

(async () => {
  const writeStream = createWriteStream("./output/tag_output.txt", {
    flags: "a"
  });
  for (let i = 0; i <= 14; i++) {
    const filename = `aminer_papers_${i}.txt`;
    if (!existsSync(filename)) {
      continue;
    }
    await processByLine(filename, async (line, lineNum) => {
      let paper = JSON.parse(line) as IPaper;
      if (!paper.venue || !paper.venue.id) {
        return;
      }
      const area = venueIdMap[paper.venue.id];
      if (!area) {
        return;
      }
      writeStream.write(
        JSON.stringify(
          Object.assign(paper, {
            area
          })
        ) + "\n"
      );
      console.log(`processing ${lineNum} of ${filename}`);
    });
    unlinkSync(filename);
  }
})();
