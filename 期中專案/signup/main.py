OPENAI_API_KEY=your_actual_api_key_here
SECRET_KEY=your_secret_key_here
from fastapi import FastAPI, Form, HTTPException, Depends
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from starlette.requests import Request
from starlette.middleware.sessions import SessionMiddleware
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
import hashlib
import openai
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# 初始化 FastAPI 應用
app = FastAPI()

# 設置 Session Middleware 用於登入狀態管理
app.add_middleware(SessionMiddleware, secret_key=os.getenv("SECRET_KEY"))

# 模擬 "資料庫"，實際應該使用真實資料庫
fake_db = {}

# 配置 OpenAI
openai.api_key = os.getenv('OPENAI_API_KEY')

# 設定 HTML 模板
templates = Jinja2Templates(directory="templates")

# 讓 FastAPI 支援靜態檔案 (如 CSS, JS)
app.mount("/static", StaticFiles(directory="static"), name="static")

# OAuth2 模擬登錄驗證
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


# 首頁顯示註冊登入選單
@app.get("/", response_class=HTMLResponse)
async def root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


# 註冊頁面
@app.get("/signup", response_class=HTMLResponse)
async def signup_form(request: Request):
    return templates.TemplateResponse("signup.html", {"request": request})


# 註冊處理
@app.post("/signup")
async def signup(username: str = Form(...), password: str = Form(...)):
    # 檢查帳號是否已經註冊
    if username in fake_db:
        raise HTTPException(status_code=400, detail="帳號已經註冊")
    
    # 密碼加密 (簡單的 hash，實際應用中應使用更安全的方式)
    hashed_password = hashlib.sha256(password.encode()).hexdigest()

    # 儲存帳號和密碼
    fake_db[username] = hashed_password
    return RedirectResponse(url="/login", status_code=303)


# 登入頁面
@app.get("/login", response_class=HTMLResponse)
async def login_form(request: Request):
    return templates.TemplateResponse("login.html", {"request": request})


# 登入處理
@app.post("/login")
async def login(username: str = Form(...), password: str = Form(...), request: Request = None):
    # 檢查帳號是否存在
    if username not in fake_db:
        raise HTTPException(status_code=400, detail="帳號不存在")
    
    # 檢查密碼是否正確
    hashed_password = hashlib.sha256(password.encode()).hexdigest()
    if fake_db[username] != hashed_password:
        raise HTTPException(status_code=400, detail="密碼錯誤")

    # 登錄成功，保存到 session
    request.session['user'] = username
    return RedirectResponse(url="/chatroom", status_code=303)


# 聊天室頁面 (需要登入)
@app.get("/chatroom", response_class=HTMLResponse)
async def chatroom(request: Request):
    # 確認用戶是否已登入
    username = request.session.get("user")
    if not username:
        return RedirectResponse(url="/login")

    return templates.TemplateResponse("chatroom.html", {"request": request, "username": username})


# AI 聊天 API
@app.post("/chat")
async def chat(prompt: str = Form(...), request: Request = None):
    # 確認用戶是否已登入
    username = request.session.get("user")
    if not username:
        raise HTTPException(status_code=401, detail="請先登入")

    # 調用 OpenAI API
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}]
        )
        return {"response": response.choices[0].message.content.strip()}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
