# XHR and CORS

## 範例 1


1. 在 corsServer/ 執行 deno run -A corsPattern.js // 或換成 corsAll.js / corsPart.js
2. 在 staticServer/ 執行 deno run -A staticServer.js

到 http://localhost:8002/cors.html ，然後開啟開發人員工具看執行結果

結果

1. corsAll.js fetch 成功
2. corsPart.js fetch 失敗 // 看來是 cors 套件在這裡有問題 ...
3. corsPattern.js fetch 成功
4. corsNo.js fetch 失敗 // 正確：因為沒有開啟 CORS


## 參考: CORS

* [淺談跨來源資源共用（CORS）與解決辦法](https://ianchen0119.gitbook.io/deno/shi-yong-deno-da-zao-web-api/untitled-2)

* https://deno.land/x/cors@v1.2.2

* https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS

Modern browsers support cross-site requests by implementing the Cross-Origin Resource Sharing (CORS) standard. As long as the server is configured to allow requests from your web application's origin, XMLHttpRequest will work. Otherwise, an INVALID_ACCESS_ERR exception is thrown.


An example of a cross-origin request: the front-end JavaScript code served from https://domain-a.com uses XMLHttpRequest to make a request for https://domain-b.com/data.json.

...

For security reasons, browsers restrict cross-origin HTTP requests initiated from scripts. For example, XMLHttpRequest and the Fetch API follow the [same-origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy). This means that a web application using those APIs can only request resources from the same origin the application was loaded from unless the response from other origins includes the right CORS headers.

...

The CORS mechanism supports secure cross-origin requests and data transfers between browsers and servers. Modern browsers use CORS in APIs such as XMLHttpRequest or Fetch to mitigate the risks of cross-origin HTTP requests.



The Cross-Origin Resource Sharing standard works by adding new HTTP headers that let servers describe which origins are permitted to read that information from a web browser. 



![](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/simple-req.png)


```http
GET /resources/public-data/ HTTP/1.1
Host: bar.other
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:71.0) Gecko/20100101 Firefox/71.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip,deflate
Connection: keep-alive
Origin: https://foo.example
```

```http
HTTP/1.1 200 OK
Date: Mon, 01 Dec 2008 00:23:53 GMT
Server: Apache/2
Access-Control-Allow-Origin: *      // 允許所有來源存取本網址
// Access-Control-Allow-Origin: https://foo.example // 只允許 https://foo.example 來源存取本網址。

Keep-Alive: timeout=2, max=100
Connection: Keep-Alive
Transfer-Encoding: chunked
Content-Type: application/xml

[…XML Data…]

```