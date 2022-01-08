from app.data_manager import DataManager
import random


class MessageHandler:
    def handle_message(self, message):
        data_manager = DataManager()
        message_lower = message.content.lower()
        return_string = ''

        try:
            if message_lower.startswith('$hello'):
                return_string = f'Hello {message.author}!'
            elif message_lower.startswith('$roll') or message_lower.startswith('$r'):
                return_string = self.roll_dice(message_lower)
            elif message_lower.startswith('$help'):
                return_string = self.help_message()

        except:
            return_string = 'Command Error, type $help for a list of commands.'

        return return_string

    def roll_dice(self, dice_string):
        number = None
        die = None
        adder = None
        multiplyer = False
        retValue = 0

        dice_string = dice_string.replace(
            ' ', '').replace('$roll', '').replace('$r', '')
        dice_array = dice_string.split('d')

        if(dice_array.length != 2):
            raise Exception("Invalid command")

        number = int(dice_array[0])

        if('(+' in dice_array[1]):
            multiplyer = True
            dice_array[1] = dice_array[1].replace('(', '').replace(')', '')

        if('+' in dice_array[1]):
            temp_array = dice_array[1].split('+')

            if(temp_array != 2):
                raise Exception("Invalid command")

            dice_array[1] = temp_array[0]
            adder = temp_array[1]

        die = int(dice_array[1])

        for x in range(number):
            retValue += random.randrange(1, die+1)

        if(multiplyer and adder is not None):
            retValue += (number * adder)
        elif(adder is not None):
            retValue += adder

        return retValue

    def help_message(self):
        return "TODO: Insert a list of commands and examples."
