import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import * as render from './render.js'

const posts = [
  { id: 0, title: 'aaa', body: 'aaaaa', created_at: new Date() },
  { id: 1, title: 'bbb', body: 'bbbbb', created_at: new Date() }
];

const router = new Router();

// 設定路由與對應的處理函數
router.get('/', list)     // 首頁：列出所有文章
  .get('/post/new', add)
  .get('/post/:id', show)
  .post('/post', create);

const app = new Application();
app.use(router.routes());         // 註冊路由
app.use(router.allowedMethods()); // 處理路由允許的方法

async function list(ctx) {
  ctx.response.body = await render.list(posts); // 呼叫 render 模組的 list 方法渲染文章列表
}

async function add(ctx) {
  ctx.response.body = await render.newPost(); // 呼叫 render 模組的 newPost 方法渲染新增文章表單
}

// 顯示單篇文章內容
async function show(ctx) {
  const id = ctx.params.id; // 從 URL 參數取得文章 ID
  const post = posts[id];   // 根據 ID 查找對應的文章
  if (!post) ctx.throw(404, 'invalid post id');
  ctx.response.body = await render.show(post);
}

// 處理新文章的提交
async function create(ctx) {
  const body = ctx.request.body// 獲取請求的 body
  if (body.type() === "form") {
    const pairs = await body.form() // 獲取表單資料
    const post = {}     // 初始化空的文章物件
    for (const [key, value] of pairs) {
      post[key] = value
    }
    console.log('post=', post)
    const id = posts.push({
      ...post,
      created_at: new Date(), // 設定創建時間
      id: posts.length        // 設定文章的 ID
    }) - 1;

    ctx.response.redirect('/');// 提交後重定向到首頁
  }
}

console.log('Server run at http://127.0.0.1:8000')
await app.listen({ port: 8000 });