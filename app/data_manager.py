import sqlite3
import datetime
import uuid


class DataManager:
    db_location = '/etc/discord-and-dices/'
    production_database_name = 'prod_database.db'
    debug_database_name = 'debug_database.db'

    def connect_to_database(self, database_name):
        connection = sqlite3.connect(self.db_location + database_name)
        return connection

    def insert_roll(self, is_prod):
        connection = self.connect_to_database(
            self.production_database_name if is_prod else self.debug_database_name)
        cursor = connection.cursor()

        try:

            cursor.execute()

            connection.commit()

        finally:
            connection.close()
