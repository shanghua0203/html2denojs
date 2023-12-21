import { superoak } from "https://deno.land/x/superoak@4.7.0/mod.ts";
import { app } from '../src/app.js'

Deno.test("/", async () => {
    const request = await superoak(app);
    await request.get("/").expect(/<title>Posts<\/title>/).expect(/<p>You have <strong>0<\/strong> posts!<\/p>/)
})

Deno.test("/", async () => {
    const request = await superoak(app);
    await request.get("/post/new").expect(200).expect(/Create a new post/)
})

Deno.test("/", async () => {
    const request = await superoak(app);
    await request.post("/post").send({title: 'Title', body: 'Contents'})
})

Deno.test("/", async () => {
    const request = await superoak(app);
    await request.get("/").expect(/<title>Posts<\/title>/).expect(/<p>You have <strong>1<\/strong> posts!<\/p>/)
})
