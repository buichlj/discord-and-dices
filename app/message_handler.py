from data_manager import DataManager
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
                print("HERE1")
                return_string = self.roll_dice(message_lower)
            elif message_lower.startswith('$help'):
                return_string = self.help_message()

        except:
            return_string = 'Command Error, type $help for a list of commands.'

        return return_string

    def roll_dice(self, dice_string):
        print("HERE2")
        print(dice_string)
        number = None
        die = None
        adder = None
        multiplyer = False
        retValue = 0
        print("HERE5")
        dice_string = dice_string.replace(
            ' ', '').replace('$roll', '').replace('$r', '')
        dice_array = dice_string.split('d')
        print("HERE6")

        if(len(dice_array) != 2):
            print("HERE3")
            raise Exception("Invalid command")
        print("HERE8")
        number = int(dice_array[0])
        print("HERE9")
        if('(+' in dice_array[1]):
            multiplyer = True
            dice_array[1] = dice_array[1].replace('(', '').replace(')', '')

        if('+' in dice_array[1]):
            temp_array = dice_array[1].split('+')

            if(len(temp_array) != 2):
                print("HERE4")
                raise Exception("Invalid command")

            dice_array[1] = temp_array[0]
            adder = temp_array[1]
        print("HERE7")
        die = int(dice_array[1])
        print("HERE10")
        for x in range(number):
            retValue += random.randrange(1, die+1)

        if(multiplyer and adder is not None):
            retValue += (number * adder)
        elif(adder is not None):
            retValue += adder

        return retValue

    def help_message(self):
        return "TODO: Insert a list of commands and examples."
