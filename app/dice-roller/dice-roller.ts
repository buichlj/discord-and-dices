export class DiceRoller {
    public rollDice(message: string): string {
        let amount: number;
        let dieType: number;
        let adder: number;
        let multiplier: boolean = false;
        let value: number = 0;
        let returnString: string = '(';

        message = message.replace(' ', '').replace('$roll', '').replace('$r', '');
        const diceArray = message.split('d');

        if (diceArray.length != 2) {
            throw "Invalid Command";
        }

        amount = parseInt(diceArray[0]);

        if (diceArray[1].indexOf('(+') >= 0) {
            multiplier = true;
            diceArray[1].replace('(', '').replace(')', '');
        }

        if (diceArray[1].indexOf('+') >= 0) {
            let tempArray = diceArray[1].split('+');
            if (tempArray.length != 2) {
                throw "Invalid Command";
            }

            diceArray[1] = tempArray[0];
            adder = parseInt(tempArray[1]);
        }

        dieType = parseInt(diceArray[1]);

        let tempRolls = [];

        for (let i = 0; i < amount; i++) {
            let tempNumber = Math.floor((Math.random() * dieType) + 1);
            tempRolls.push(tempNumber);
            value += tempNumber;
        }

        if (multiplier && adder) {
            value += (amount * adder);

        } else if (adder) {
            value += adder;
        }

        if (multiplier && adder) {
            returnString += tempRolls.join(`+${adder}) + (`);
            returnString += `+${adder})`;
        } else {
            returnString += tempRolls.join('+');
        }

        if (!multiplier) {
            returnString += ')';
            if (adder) {
                returnString += ' + ' + adder
            }
        }

        returnString += ' = ' + value

        return returnString

    }
}