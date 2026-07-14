import { sampleCards } from "../../data/sample-cards";
import { CardEngine } from "../card-engine";

function assert(condition: boolean, message: string): void {
  if (!condition) {
    throw new Error(message);
  }
}

const cardEngine = new CardEngine(sampleCards);

assert(
  cardEngine.getAllCards().length > 0,
  "No sample cards were loaded."
);

assert(
  cardEngine.getShips().length > 0,
  "No sample ships were loaded."
);

console.log(
  `Sample card import passed for ${cardEngine.getAllCards().length} card(s).`
);
