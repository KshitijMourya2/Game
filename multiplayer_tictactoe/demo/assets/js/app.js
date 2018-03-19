import "phoenix_html"
import {Socket} from "phoenix"
//import Game from "./game"
import game_init from "./game"

let socket = new Socket(
  "/socket",
  {params: {player: window.currentPlayer}}
)

let element = document.getElementById("root")
if (element) {
console.log("fjhgfjh");
//  Game.init(socket)
   game_init(root);

}
