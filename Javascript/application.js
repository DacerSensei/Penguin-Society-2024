import { Player } from "./Game/Player.js";
import { GameEngine } from "./GameEngine.js";

const Game = new GameEngine();
Game.InitializeEngine().then(() => {
    const player = new Player(Game.InputManager);

    Game.OnUpdate = (deltaTime) => {
        player.Update(deltaTime);
    };

    Game.OnDraw = () => {
        player.Draw(Game.SpriteRenderer);
    }

    Game.Draw()
});