from fastapi import FastAPI
# from fastapi.testclient import TestClient
from fastapi.websockets import WebSocket
from fastapi.responses import HTMLResponse
from fastapi import FastAPI, File, UploadFile
import dill

app = FastAPI()

html = ""
with open('index.html', 'r') as f:
    html = f.read()

@app.get("/")
async def get():
    return HTMLResponse(html)

@app.websocket_route("/ws")
async def websocket(websocket: WebSocket):
    print("Accepting connection")
    await websocket.accept()
    print("Accepted")
    while True:
        data= await websocket.receive()
         # Save the file
        audio_file=dill.dump(data, file = open("audio_file.wav", "wb"))
        print(audio_file)





