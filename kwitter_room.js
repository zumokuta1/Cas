
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

user_name = localStorage.getItem('user_name');

document.getElementById('user_name').innerHTML = "Bienvenido a kwitter " + user_name;


function addRoom() {
      room_name = document.getElementById('room_name').value;

      firebase.database().ref("/").child(room_name).update({
            purpose: "Agregando el nombre de la sala"
      });
      localStorage.setItem("room_name", room_name);
      window.location = "kwitter_page.html";
}
function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;

                  // Inicia el código
                  console.log("Nombre de la sala: " + Room_names);
                  row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)' >#" + Room_names + "</div> <hr>";
                  document.getElementById("output").innerHTML += row;
                  // Finaliza el código
            });
      });
}

getData();


function logout() {
      localStorage.removeItem("user_name")

      localStorage.removeItem("room_name");

      window.location = "index.html";
}

function redirectToRoomName() {
      console.log(name)
      localStorage.setItem('room_name', name);
      window.location = "kwitter_page.html";
}

