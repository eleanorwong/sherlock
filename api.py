from enum import Enum
from flask import Flask
import pyrebase
import json
#import random
#from sets import Set

config = {
  "apiKey": "AIzaSyDzV4LHW-Z177LuCopYh7Vsd65AShwU3F8",
  "authDomain": "sherlock-3c9fd.firebaseapp.com",
  "databaseURL": "https://sherlock-3c9fd.firebaseio.com/",
  "storageBucket": "sherlock-3c9fd.appspot.com"
}

firebase = pyrebase.initialize_app(config)

db = firebase.database()

app = Flask(__name__)

class game(object):
  """docstring for game"""

  def __init__(self, gameID):
    super(game, self).__init__()
    self.gameID = gameID
    db.child("games").child(gameID).child("winner").set("")
    self.end_of_day = True
    self.num_mafia_remaining = 4
    self.num_town_remaining = 0

  def death(self, userID, deathCause):
    deadPlayer = db.child("games").child(self.gameID).child("players").child(userID)
    role = deadPlayer.child("role").get()
    if role.val() == "MAFIA":
      self.num_mafia_remaining -= 1
    else:
      self.num_town_remaining -= 1
    db.child("games").child(self.gameID).child("players").child(userID).child("isAlive").set(False)
    db.child("games").child(self.gameID).child("players").child(userID).child("causeOfDeath").set(deathCause)

  def checkWinner(self):
    if self.num_mafia_remaining == self.num_town_remaining:
      db.child("games").child(self.gameID).child("winner").set("MAFIA")
    elif self.num_mafia_remaining == 0:
      db.child("games").child(self.gameID).child("winner").set("TOWN")


def stream_handler(post):
  # User database info
  path = post["path"].split("/")
  if path[len(path) - 2] == "past_games":
    me.finishedGame(path[2])
  if path[len(path) - 1] == "active_game":
    me.addActiveGame(path[2], post["data"])

  # Game database info

@app.route('/winner')
def api_winner():
  return db.child("games").child(self.gameID).child("winner") == "MAFIA"

@app.route('/start')
def api_start():
  print("Will start the game")

# mygame = game("-KWNPXBaDrA8BK8WZBK4")
# db.child("games").child("-KWNPXBaDrA8BK8WZBK4").child("players").child("Mortimer 'Morty' Smith").child("role").set("MAFIA")
# db.child("games").child("-KWNPXBaDrA8BK8WZBK4").child("config").child("num_mafia_remaining").set(4)
# mygame.death("Mortimer 'Morty' Smith", "Lynched by town")

my_stream = db.child("/").stream(stream_handler)

if __name__ == '__main__':
    app.run()
