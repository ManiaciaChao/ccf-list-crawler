# Output

## 命名

_[脚本名称]_\_output._[后缀名]_, e.g. `author_output.txt`

## 清单

### `crawler_output.json`

爬取的 CCF 推荐列表。

```json
[
  {
    "area": "计算机体系结构/高性能计算/存储系统",
    "type": "conference",
    "level": "A",
    "name": "ASPLOS : Architectural Support for Programming Languages and Operating Systems"
  },
  // ...
  {
    "area": "人机交互与普适计算",
    "type": "journal",
    "level": "C",
    "name": "Pervasive and Mobile Computing",
    "si": "Special Issue on Blockchain and Smart Contracts for Pervasive Systems"
  }
]
```

### `normalize_output.json`

将`crawler_output.json`中的`name`和`si`字段进行标准化。

```json
[
  {
    "area": "计算机体系结构/高性能计算/存储系统",
    "type": "conference",
    "level": "A",
    "name": "asplos architectural support for programming languages and operating systems",
    "abbr": "asplos",
    "suffix": "architectural support for programming languages and operating systems"
  },
  // ...
  {
    "area": "计算机体系结构/高性能计算/存储系统",
    "type": "journal",
    "level": "B",
    "name": "journal of parallel and distributed computing",
    "si": "special issue on blockchain enabled secure communications in smart cities"
  }
]
```

### `map_output.json`

将`aminer_venues.txt`中每个`venue`的`id`字段映射到对应的 CCF 分类。

```json
{
  "54509befdabfaed2f6e7616f": ["人机交互与普适计算"],
  "54509befdabfaed2f6e76190": ["计算机图形学与多媒体"],
  "54509befdabfaed2f6e761bb": ["人工智能"]
}
```

### `tag_output.txt`

从`aminer_papers_*.txt`中筛选出属于 CCF 分类的`paper`。

每行均为一个`JSON`对象字面量。

共`423039`行，占用空间`542M`。

```json
{"id":"53a7258520f7420be8b514a9","title":"Semantic Wikipedia.","authors":[{"name":"Max Völkel","id":"53f47915dabfaefedbbb728f"},{"name":"Markus Krötzsch","id":"53f44a27dabfaedf435dbf2e"},{"name":"Denny Vrandecic","id":"5433f551dabfaebba5832602"},{"name":"Heiko Haller","id":"53f322dddabfae9a84460560"},{"name":"Rudi Studer","id":"53f556b9dabfaea7cd1d5e32"}],"venue":{"raw":"WWW","id":"547ffa8cdabfaebedf84f229"},"year":2006,"n_citation":639,"page_start":"585","page_end":"594","lang":"en","volume":"","issue":"","url":["http://doi.acm.org/10.1145/1135777.1135863"],"area":["交叉/新兴／综合"]}
{"id":"53a7280320f7420be8ba5e96","title":"Parsing.","authors":[{"name":"Ralph Grishman"}],"venue":{"raw":"ACL","id":"547ffa8cdabfaebedf84f2ad"},"year":1981,"n_citation":11,"page_start":"","page_end":"","lang":"en","volume":"","issue":"","pdf":"//static.aminer.org/pdf/20160902/aclanthology/aclweb/ACL-1981-6538.pdf","url":["http://aclweb.org/anthology-new/P/P81/P81-1022.pdf","https://static.aminer.org/pdf/20160902/aclanthology/index.txt","https://static.aminer.org/pdf/20170130/aclanthology/index.txt"],"area":["人工智能"]}
```

### `authorID_output.json`

从`tag_output.txt`提取出现过的`author.id`。

```json
[
  // ...
  "5c3dd74e3a55ac1f28c58bbe",
  "5c3dd74e3a55ac1f28c58bbf",
  "5c3dd74e3a55ac1f28c58bc0",
  "5c3dd74e3a55ac1f28c58bc1",
  "5c3dd74e3a55ac1f28c58bc2",
  "5c3dd74e3a55ac1f28c58bc4",
  "5c3dd74e3a55ac1f28c58bc5"
]
```

### `author_output.txt`

基于`authorID_output.json`提取`aminer_authors_*.txt`中符合条件的`author`。

每行均为一个`JSON`对象字面量。

共`410045`行，占用空间`1.7G`。

```json
{"id": "53f43cbfdabfaedd74dd578f", "name": "E Wambacq", "h_index": 1, "n_pubs": 1, "tags": [], "pubs": [{"i": "53e9adc7b7602d97037ce451", "r": 0}], "n_citation": 9, "orgs": [""]}
{"id": "53f43e5cdabfaee0d9b9db3d", "name": "J. Boritz", "h_index": 3, "n_pubs": 4, "tags": [{"w": 1, "t": "computerized virtual environment"}, {"w": 1, "t": "virtual reality"}, {"w": 1, "t": "three dimensional"}, {"w": 1, "t": "virtual environment"}, {"w": 1, "t": "user interfaces"}, {"w": 1, "t": "degree of freedom"}, {"w": 1, "t": "input device"}, {"w": 1, "t": "dof docking"}, {"w": 1, "t": "3d graphics"}], "pubs": [{"i": "53e99f86b7602d970285cd07", "r": 0}, {"i": "53e9a914b7602d9703266aef", "r": 0}, {"i": "53e9ad4fb7602d9703736d54", "r": 0}, {"i": "53e9b769b7602d9704310173", "r": 0}], "n_citation": 62, "orgs": ["Department of Computer Science; University of British Columbia"]}
```
