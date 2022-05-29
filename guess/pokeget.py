from os import lseek
import re
import requests
from bs4 import BeautifulSoup
import tweepy
from tweepy import OAuthHandler


def listGenerationUrl(URL):
    list = []
    page = requests.get('{0}/#quickfind'.format(URL))
    soup = BeautifulSoup(page.content, "html.parser")
    results = soup.find(id='text09')
    for a in results.find_all('a', href=True):
        localUrl = '{0}/{1}'.format(URL, a['href'])
        print("Found the URL:", localUrl)
        list.append(localUrl)
    return list


class Poke:
    def __init__(self, _id, name, imageUrl, tweet_original):
        self._id = _id
        self.name = name
        self.imageUrl = imageUrl
        self.tweet_original = tweet_original

    def toString(self):
        return "{{\"dex\": {0}, \"name\": \"{1}\", \"image\": \"{2}\"}},\n ".format(
            self._id, self.name, self.imageUrl)


def getTweetsByGen(firstDex, gen, idtext):
    list = []
    page = requests.get('{0}/{1}'.format(URL_BASE, gen))
    soup = BeautifulSoup(page.content, "html.parser")
    results = soup.find(id=idtext)
    for div in results.find_all('a'):
        url_base = div['href']
        name = div.contents[0]
        #print('Name: {0} URL: {1}'.format(name, url_base))
        pk1 = Poke(firstDex, name.capitalize(), 'emptyImage', url_base)
        list.append(pk1)
        firstDex = firstDex+1
    return list


def getImageTW(tweetm):
    api = twitter_api()
    status = api.get_status(
        tweetm, include_entities=True, tweet_mode='extended')
    pokejson = status._json
    image = pokejson['entities']['media'][0]['media_url_https']
    return image


def twitter_api():
    auth = OAuthHandler(keys['consumer_key'], keys['consumer_secret'])
    auth.set_access_token(keys['access_token'], keys['access_token_secret'])
    #    api = auth
    return tweepy.API(auth)


def peeledList():
    # le estoy pasando la url entera y tiene que ser el id
    for x in listpk:
        urltweet = x.tweet_original
        in_idID = urltweet.rfind('/')
        namepk = urltweet[in_idID+1:len(urltweet)]
        x.imageUrl = getImageTW(namepk)
        print(x.toString())
    return listpk


def toFileJSON(file, list):
    with open(file, 'a') as f:
       # f.write('[\n')
        for x in list:
            f.write(x.toString())
        # f.write(']')
    f.close


def toFileText(file, data):
    with open(file, 'a') as f:
        f.write(data)
    f.close


URL_BASE = "...rrd.co/" #url base
fileName = '.json' # data.json
keys = { # keys twitter 
    "username": "",
    "md_username": "",
    "access_token": "",
    "access_token_secret": "",
    "consumer_key": "",
    "consumer_secret": ""
}

listGenerationUrl(URL_BASE)

# Generarion 1 1-121
listpk = getTweetsByGen(1, "#genone", "text10") #text10 es genone
peList = peeledList()
# Open array json
toFileText(file=fileName, data="[\n")
toFileJSON(file=fileName, list=peList)

# Generarion 2
listpk = getTweetsByGen(152, "#gentwo", "text12") #text12 es gentwo
peList = peeledList()
toFileJSON(file=fileName, list=peList)
# Close array json
toFileText(file=fileName, data="\n]")
