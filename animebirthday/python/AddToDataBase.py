from Conexio import Conexio
import requests
from Character import Character
import pandas as pd
import time

def callBirthday(day, month):
    characterList = []
    headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36"}
    url = 'https://www.animecharactersdatabase.com/api_series_characters.php?month={1}&day={0}'.format(
        day, month)
    # Lets test what headers are sent by sending a request to HTTPBin
    r = requests.get(url=url, headers=headers)
    jsonC = r.json()
    # print(jsonC)
    num = 0
    for x in jsonC['characters']:
        c1 = Character(id=x['id'],
                       anime_id=x['anime_id'],
                       anime_image=x['anime_image'],
                       character_image=x['character_image'],
                       character_thumb=x['character_thumb'],
                       gender=x['gender'],
                       name=x['name'],
                       origin=x['origin'],
                       desc=x['desc'],
                       day=day,
                       month=month
                       )
        characterList.append(c1)
        num = num+1
    return characterList


def insertQuery(character_id, anime_id, anime_image, character_image, character_thumb, gender, name, origin, description_type, day, month):
    sql = "INSERT INTO characters (character_id, anime_id, anime_image, character_image, character_thumb, gender, name, origin, description_type,day,month) VALUES (%s, %s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
    val = (character_id, anime_id, anime_image, character_image,
           character_thumb, gender, name, origin, description_type, day, month)
    mycursor.execute(sql, val)
    mydb.commit()
    print(mycursor.rowcount, "record inserted.")

def extractDescType(desc,origin):
    return desc[desc.index("is a character")+24:desc.index(origin)-1]

mydb = Conexio()
mycursor = mydb.cursor()
llistaCumples = []
startdate = "1/1/2020"
num = 0

def insertAll():
    for x in range(0, 365):
        dia = pd.to_datetime(startdate) + pd.DateOffset(days=x)
        time.sleep(1.5)
        llistaCumples = callBirthday(dia.day, dia.month)
        for x in llistaCumples:
            insertQuery(x.id, x.anime_id, x.anime_image, x.character_image,
                        x.character_thumb, x.gender, x.name, (x.origin.replace("\"","'")), extractDescType(x.desc,x.origin), x.day, x.month)
            print("{}-{} =>{} {} {}".format(dia.day, dia.month,x.name,(x.origin.replace("\"","'")),extractDescType(x.desc,x.origin)))

#insertAll()


