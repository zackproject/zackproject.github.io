import MySQLdb
def Conexio():
    mydb = MySQLdb.connect(
        host="example",
        user="example",
        password="",
        database="example"
    )
    return mydb