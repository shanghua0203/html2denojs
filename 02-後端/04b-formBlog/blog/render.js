export async function list(posts) {
  return `
    <!DOCTYPE html>
    <html>
      <body>
        <h1>Blog Posts</h1>
        <a href="/post/new">New Post</a>
        <ul>
          ${posts.map(post => `
            <li>
              <a href="/post/${post.id}">${post.title}</a>
              ${post.created_at ? `<small> (Posted on ${post.created_at.toLocaleString()})</small>` : ''}
            </li>
          `).join('')}
        </ul>
      </body>
    </html>
  `;
}

export async function show(post) {
  return `
    <!DOCTYPE html>
    <html>
      <body>
        <h1>${post.title}</h1>
        <p>${post.body}</p>
        ${post.created_at ? `<small>Posted on: ${post.created_at.toLocaleString()}</small>` : ''}
        <br>
        <a href="/">Back to List</a>
      </body>
    </html>
  `;
}

export async function newPost() {
  return `
    <!DOCTYPE html>
    <html>
      <body>
        <h1>Create New Post</h1>
        <form action="/post" method="post">
          <input type="text" name="title" placeholder="Title" required><br>
          <textarea name="body" placeholder="Body" required></textarea><br>
          <input type="submit" value="Create Post">
        </form>
        <a href="/">Back to List</a>
      </body>
    </html>
  `;
}