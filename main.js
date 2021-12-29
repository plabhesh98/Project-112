Prediction = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach("#camera");

function Take_Snapshot() {
    Webcam.snap(function(data_uri){
       document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log("ml5 version: ", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/vujH-OxDB/model.json",modelLoaded);

function modelLoaded() {
    console.log("Model Loaded!");
}

function check_hand_gesture() {
    img = document.getElementById("captured_image");
    classifier.classify(img , gotResult);
}

function gotResult(error , results) {
    if(error) {
        console.log(error);
    }else {
        console.log(results);  
        document.getElementById("result_gesture_name").innerHTML = results[0].label;  
        Prediction = results[0].label;
        speak();
        if(results[0].label == "Best"){
            document.getElementById("update_hand_gesture").innerHTML = "&#128076;";
        }   
        if(results[0].label == "Thumbs Up") {
            document.getElementById("update_hand_gesture").innerHTML = "&#128077;";
        }
        if(results[0].label == "Thumbs Down"){
            document.getElementById("update_hand_gesture").innerHTML = "&#128078;";
        }
        if(results[0].label == "Horns"){
            document.getElementById("update_hand_gesture").innerHTML = "&#129304;";
        }
        if(results[0].label == "Raise Hand") {
            document.getElementById("update_hand_gesture").innerHTML = "&#9995;";
        }
        if(results[0].label == "Victory"){
            document.getElementById("update_hand_gesture").innerHTML = "&#9996;";
        }
    }
}

function speak() {
    var synth = window.speechSynthesis;
    Speak_data = "Hand Gesture is " + Prediction;
    var utterThis = new SpeechSynthesisUtterance(Speak_data);
    synth.speak(utterThis);
}

