import MySQLdb


def Conexio():
    try:
        mydb = MySQLdb.connect(
            host="localhost",
            user="magikarp",
            password="magikarp",
            database="zksama"
        )
        return mydb
    except Exception as e:
        print("Error: {}".format(e))


Conexio()
