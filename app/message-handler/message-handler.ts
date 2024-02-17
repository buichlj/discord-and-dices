import { DiceRoller } from "../dice-roller/dice-roller";
import { MTGLookup } from "../mtg-lookup/mtg-lookup";
import { SpellLookup } from "../spell-lookup/spell-lookup";

export class MessageHandler {

    public async handleMessage(message: string): Promise<string> {
        message = message.toLocaleLowerCase();
        let returnMessage = '';
        try {
            if (message.startsWith('$roll') || message.startsWith('$r')) {
                const diceRoller = new DiceRoller();
                returnMessage = diceRoller.rollDice(message);
            } else if (message.startsWith('$mtg')) {
                const mtgLookup = new MTGLookup();
                returnMessage = await mtgLookup.lookupCard(message);
            } else if (message.startsWith('$spell')) {
                const spellLookup = new SpellLookup();
                returnMessage = await spellLookup.lookupSpell(message);
            } else if (message.startsWith('$github')) {
                returnMessage = 'https://github.com/buichlj/discord-and-dices'
            } else if (message.startsWith('$stats')) {
                const diceRoller = new DiceRoller();
                returnMessage = diceRoller.rollStats();
            } else {
                returnMessage = `Commands:
                                $help
                                $hello
                                $roll <number of dice>d<type of dice> <optional: +<addition modifier (use parentheses to denote multiplier)>>
                                $r alternate to $roll`
            }
        } catch (ex) {
            returnMessage = 'Command Error, type $help for a list of commands.'
        }

        return returnMessage;
    }
}