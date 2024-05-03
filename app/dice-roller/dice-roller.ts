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

        if (amount > 10000) {
            return "Not today asshole!";
        }

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

        if (dieType > 1000) {
            return "You thought you were so clever";
        }

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

        if (returnString.length >= 2000) {
            returnString = value + ' (full text too long for message)';
        }

        return returnString

    }

    public rollStats(): string {
        let stats = [];

        let result = 0;
        while (result < 14) {
            result = this.rollStat();
        }

        stats.push(result);
        stats.push(this.rollStat());
        stats.push(this.rollStat());
        stats.push(this.rollStat());
        stats.push(this.rollStat());
        stats.push(this.rollStat());

        return stats.toString();
    }

    private rollStat(): number {
        let first = Math.floor((Math.random() * 6) + 1);
        let second = Math.floor((Math.random() * 6) + 1);
        let third = Math.floor((Math.random() * 6) + 1);
        let fourth = Math.floor((Math.random() * 6) + 1);
        return (first + second + third + fourth) - Math.min(first, second, third, fourth);
    }
}