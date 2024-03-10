import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getDatabase, ref, set, onValue, get, child, onDisconnect, onChildAdded, onChildRemoved, remove } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCk_AHohdcBuHwhJzmAmk38QMyio16yRD8",
    authDomain: "penguinsociety.firebaseapp.com",
    databaseURL: "https://penguinsociety-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "penguinsociety",
    storageBucket: "penguinsociety.appspot.com",
    messagingSenderId: "278753807617",
    appId: "1:278753807617:web:81ca1400ded7d05090df00",
    measurementId: "G-K0BX7BD7WW"
};

const App = initializeApp(firebaseConfig);
const Auth = getAuth(App);
const Database = getDatabase(App);
// Initialize Firebase

(async function () {

    let PlayerId;
    let PlayerReference;
    let Players = {};
    let PlayerElements = {};

    const World = document.getElementById("Game-World");

    function InitializeGame() {

        new KeyPressListener("ArrowUp", () => HandleArrowPress(0, -1));
        new KeyPressListener("ArrowDown", () => HandleArrowPress(0, 1));
        new KeyPressListener("ArrowLeft", () => HandleArrowPress(-1, 0));
        new KeyPressListener("ArrowRight", () => HandleArrowPress(1, 0));

        const AllPlayerReference = ref(Database, "world");

        async function HandleArrowPress(x = 0, y = 0){
            const newX = Players[PlayerId].x + x;
            const newY = Players[PlayerId].y + y;
            if(true){
                Players[PlayerId].x = newX;
                Players[PlayerId].y = newY;
                if(x === 1){
                    Players[PlayerId].direction = "right";
                }
                if(x === -1){
                    Players[PlayerId].direction = "left";
                }
                await set(PlayerReference, Players[PlayerId]);
            }
        }

        onValue(AllPlayerReference, (users) => {
            Players = users.val() || {};
            Object.keys(Players).forEach((Key) => {
                const CharacterState = Players[Key];
                let CharacterElement = PlayerElements[Key];
                CharacterElement.setAttribute("data-direction", CharacterState.direction);
                const left = 16 * CharacterState.x + "px";
                const top = 16 * CharacterState.y + "px";
                CharacterElement.style.transform = "translate3d(" + left + "," + top + ", 0)";
            })
        })

        onChildAdded(AllPlayerReference, (user) => {
            const newUser = user.val();

            const CharacterElement = document.createElement("div");
            CharacterElement.classList.add("Character", "Grid-Cell");

            if (newUser.id === PlayerId) {
                CharacterElement.classList.add("you");
            }

            CharacterElement.setAttribute("data-color", newUser.color);
            CharacterElement.setAttribute("data-direction", newUser.direction);

            const CharacterSprite = document.createElement("div");
            CharacterSprite.classList.add("Sprite", "Grid-Cell");

            const PlayerInfoContainer = document.createElement("div");
            PlayerInfoContainer.classList.add("PlayerInfoContainer");
            const PlayerName = document.createElement("span");
            PlayerName.textContent = newUser.name;
            PlayerInfoContainer.appendChild(PlayerName);

            const left = 16 * newUser.x + "px";
            const top = 16 * newUser.y + "px";
            CharacterElement.style.transform = "translate3d(" + left + "," + top + ", 0)";

            CharacterElement.appendChild(CharacterSprite);
            CharacterElement.appendChild(PlayerInfoContainer);
            PlayerElements[newUser.id] = CharacterElement;

            World.appendChild(CharacterElement);
        });

        onChildRemoved(AllPlayerReference, (user) => {
            const id = user.val().id;
            World.removeChild(PlayerElements[id]);
            delete PlayerElements[id];
        });
    }

    onAuthStateChanged(Auth, async (user) => {
        if (user) {
            PlayerId = user.uid;
            PlayerReference = ref(Database, "world/" + PlayerId);

            await set(PlayerReference, {
                id: PlayerId,
                name: "Dave",
                direction: "right",
                color: "red",
                x: 3,
                y: 10,
                coins: 0
            })

            await onDisconnect(PlayerReference).remove();

            InitializeGame();
        }
    })

    await signInAnonymously(Auth).catch((error) => {
        console.log(error.code, error.message);
    });
})();

class KeyPressListener {
    constructor(keyCode, callback) {
        let keySafe = true;
        this.KeyDownFunction = function (event) {
            if (event.code === keyCode) {
                if (keySafe) {
                    keySafe = false;
                    callback();
                }
            }
        };
        this.KeyUpFunction = function (event) {
            if (event.code === keyCode) {
                keySafe = true;
            }
        };
        document.addEventListener("keydown", this.KeyDownFunction);
        document.addEventListener("keyup", this.KeyUpFunction);
    }
    unbind() {
        document.removeEventListener("keydown", this.KeyDownFunction);
        document.removeEventListener("keyup", this.KeyUpFunction);
    }
}