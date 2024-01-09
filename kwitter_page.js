
const firebaseConfig = {

    apiKey: "AIzaSyAIaYRvxrvPjq6Y0BYJYa_Eb4b-P5hmhjg",

    authDomain: "kwitter-3510c.firebaseapp.com",

    databaseURL: "https://kwitter-3510c-default-rtdb.firebaseio.com",

    projectId: "kwitter-3510c",

    storageBucket: "kwitter-3510c.appspot.com",

    messagingSenderId: "714365339171",

    appId: "1:714365339171:web:7038fd8b45a6d17c82d396"

};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

user_name = localStorage.setItem('user_name')

room_name = document.getElementById('room_name').value;

function send() {
    msg = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
        name: user_name,
        message: msg,
        like: 0
    });
    document.getElementById("msg").value = "";
}

function getData() {
    firebase.database().ref("/" + room_name).on('value', function (snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            childData = childSnapshot.val();

            if (childKey != "purpose") {
                firebase_message_id = childKey;
                message_data = childData;
                //Inicia el Codigo
                console.log(firebase_message_id);
                console.log(message_data);
                name = message_data['name'];
                message = message_data['message'];
                like = message_data['like'];
                name_with_tags = "<h4>" + name + "</img class = 'user_tick' src = 'tick.png'></h4>";
                message_with_tag = "<h4 class = 'message_h4'>" + message + "</h4>";
                like_button = "<button class = 'btn btn-warning' + firebase_message_id + value = " + like + 'onclick="updateLike(this.id)"'
                span_with_tag = "<span class = 'glyphicon glyphicon-thumbs-up'>Likes:" + like + "</span></button><hr>";

                row = name_with_tag + message_with_tag + like_button + span_with_tag;
                document.getElementById("output").innerHTML += row;
            }
        });
    });
}
getData();

function updateLike(message_id) {
    console.log("Presiono el boton de like :" + message_id);
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    updated_likes = Number(likes) + 1;
    console.log(updated_likes);

    firebase.database().ref(room_name).child(message_id).update({
        like: updated_likes
    });
} 
