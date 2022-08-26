
from flask import request, render_template, Flask
from werkzeug.utils import secure_filename
from flask_socketio import SocketIO, emit
import os.path
import dill

UPLOAD_FOLDER = 'E:/Python_Internship/task/audios'

app = Flask(__name__)
# app.config['UPLOAD_FOLDER']=UPLOAD_FOLDER

app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

@app.route("/", methods=['GET'])
def hello_world():
    return render_template("index.html")

@socketio.on('my event')
def upload(data):
    file_audio=dill.dump(data, file = open("audio_file.wav", "wb"))
    print("received",file_audio)



# @app.route('/upload', methods=['POST'])
# def upload():
#     file = request.files['audio_file']
#     filename=secure_filename(file.filename)
#     file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
#     print(file)
#     return "files are saved"
SS




    # new_data=[]
    # new_data.append(file_data)










# @sock.route('/echo')
# def echo(sock):
#     while True:
#         data=sock.receive()

    # sock.receive(formData)
    # file = request.files['audio_file']
    # file = sock.receive('audio_file')
    # print("heelo")
    # return "files"



if __name__ == '__main__':
# app.run(debug=True)
    socketio.run(app, debug=True)

