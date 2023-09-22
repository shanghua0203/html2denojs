
```
$ deno run -A people.js
start at : http://127.0.0.1:8000

// visit http://127.0.0.1:8000/people/

[{"name":"john","tel":"082-313345"},{"name":"mary","tel":"082-313543"}]

// visit http://127.0.0.1:8000/people/find?name=john
{"name":"john","tel":"082-313345"}

// http://127.0.0.1:8000/people/add?name=ccc&tel=082313531

新增 (ccc, 082313531) 成功

列出所有人員

// visit http://127.0.0.1:8000/people/

[{"name":"john","tel":"082-313345"},{"name":"mary","tel":"082-313543"},{"name":"ccc","tel":"082313531"}]

```