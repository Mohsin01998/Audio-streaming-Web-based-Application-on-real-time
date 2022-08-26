// const log = (text, color) => {
//     document.getElementById('log').innerHTML += `<span style="color: ${color}">${text}</span><br>`;
// };
//
// const socket = new WebSocket('ws://' + location.host + '/echo');
// socket.addEventListener('message', ev => {
//     log('<<< ' + ev.data, 'blue');
// });
// document.getElementById('form').onsubmit = ev => {
//     ev.preventDefault();
//     const textField = document.getElementById('text');
//     log('>>> ' + textField.value, 'red');ssss
//     socket.send(textField.value);
//     textField.value = '';
// };



class VoiceRecorder {
    constructor() {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            console.log(" Get User media supported")
        } else {
            console.log("Get user medua NOT supported")
        }

        this.mediaRecorder
        this.stream
        this.chunks = []
        this.isRecording = false

        this.recorderRef = document.querySelector("#recorder")
        this.playerRef = document.querySelector("#player")
        this.startRef = document.querySelector("#start")
        this.stopRef = document.querySelector("#stop")

        this.startRef.onclick = this.startRecording.bind(this);
        this.stopRef.onclick = this.stopRecording.bind(this);

        this.constraints = {
            audio: true,
            video: false
        }
    }

    // Handle sucees
    handleSucess(stream) {
        this.stream = stream
        this.stream.oninactive = () => {
            console.log("stream ended");
        }

        this.recorderRef.srcObject = this.stream
        this.mediaRecorder = new MediaRecorder(this.stream)
        this.mediaRecorder.ondataavailable = this.onMediaRecorderDataAvailable.bind(this)
        this.mediaRecorder.onstop = this.onMediaRecorderStop.bind(this)
        this.recorderRef.play();
        this.mediaRecorder.start();
    }

    onMediaRecorderDataAvailable(e) { this.chunks.push(e.data) }


  onMediaRecorderStop(e) {

    var blob = new Blob(this.chunks, { 'type': 'audio/wav; codesc=opus' });
    // var blob = new Blob(this.chunks, {  type: recorder.mimeType });
    var audioURL = window.URL.createObjectURL(blob);
    this.playerRef.src = audioURL;
    this.chunks = []
    this.stream.getAudioTracks().forEach(track => track.stop());
    this.stream = null
    console.log(blob)

// Create Formdata object then use socket.io

    var formData = new FormData()
    formData.append('audio_file', blob)
    console.log(formData)

// Use socket.io to send blob object to server

//    var socket = io();
//    socket.on('connect', () => {
//    console.log('connected');
//    socket.emit('my event' ,blob)
//
//});



    var ws = new WebSocket("ws://localhost:5000/ws");
    ws.onopen= function(){
    ws.send("connected to js");
    console.log("connected")
    ws.send(blob)
    console.log("file sent")
}
}

// Use websocket to send data


//        var ws = new WebSocket("ws://localhost:5000/echo");
//
//               ws.onopen = function() {
//
//                  // Web Socket is connected, send data using send()
//                  ws.send("Message to send",formData);
//                  alert("Message is sent...");
//                  console.log("file is sent")
//               };
//


// Send formdata via XMLHTTPRequest()

//
//         var request = new XMLHttpRequest();
//         request.open("POST", "http://127.0.0.1:5000/upload");
//         request.send(formData);
//         console.log("files are uploaded and stored")






    // start Recording

    startRecording() {
        if (this.isRecording) return
        this.isRecording = true
        this.startRef.innerHTML = "Recording..."
        this.playerRef.src = " ";
        navigator.mediaDevices.getUserMedia(this.constraints)
            .then(this.handleSucess.bind(this))
            .catch(this.handleSucess.bind(this))
    }

    // stop Recording

    stopRecording() {
        if (!this.isRecording) return
        this.isRecording = false
        this.startRef.innerHTML = "Record"
        this.recorderRef.pause();
        this.mediaRecorder.stop();

    }


}



window.VoiceRecorder = new VoiceRecorder();


