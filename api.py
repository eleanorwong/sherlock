from enum import Enum
import pyrebase
import json

config = {
  "apiKey": "AIzaSyDzV4LHW-Z177LuCopYh7Vsd65AShwU3F8",
  "authDomain": "sherlock-3c9fd.firebaseapp.com",
  "databaseURL": "https://sherlock-3c9fd.firebaseio.com/",
  "storageBucket": "sherlock-3c9fd.appspot.com"
}

firebase = pyrebase.initialize_app(config)

db = firebase.database()

class game(object):
  """docstring for game"""

  def __init__(self, gameID):
    super(game, self).__init__()
    self.gameID = gameID
    self.end_of_day = True
    self.num_mafia_remaining = 4
    self.num_town_remaining = 0
    self.players = []

  # def giveRoles(self):
    #random role assignment

  def death(self, userID, deathCause):
    deadPlayer = db.child("games").child(self.gameID).child("players").child(userID)
    role = deadPlayer.child("role").get()
    if role.val() == "MAFIA":
      self.num_mafia_remaining -= 1
    else:
      self.num_town_remaining -= 1
    db.child("games").child(self.gameID).child("players").child(userID).child("isAlive").set(False)
    db.child("games").child(self.gameID).child("players").child(userID).child("causeOfDeath").set(deathCause)


def stream_handler(post):
  # User database info
  path = post["path"].split("/")
  if path[len(path) - 2] == "past_games":
    me.finishedGame(path[2])
  if path[len(path) - 1] == "active_game":
    me.addActiveGame(path[2], post["data"])

  # Game database info

mygame = game("-KWNPXBaDrA8BK8WZBK4")
db.child("games").child("-KWNPXBaDrA8BK8WZBK4").child("players").child("Mortimer 'Morty' Smith").child("role").set("MAFIA")
db.child("games").child("-KWNPXBaDrA8BK8WZBK4").child("config").child("num_mafia_remaining").set(4)
mygame.death("Mortimer 'Morty' Smith", "Lynched by town")
my_stream = db.child("/").stream(stream_handler)
