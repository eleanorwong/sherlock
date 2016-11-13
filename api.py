from flask import Flask, json, request
import pyrebase
import json
import random
from flask_cors import CORS, cross_origin

config = {
  "apiKey": "AIzaSyDzV4LHW-Z177LuCopYh7Vsd65AShwU3F8",
  "authDomain": "sherlock-3c9fd.firebaseapp.com",
  "databaseURL": "https://sherlock-3c9fd.firebaseio.com/",
  "storageBucket": "sherlock-3c9fd.appspot.com"
}

firebase = pyrebase.initialize_app(config)

db = firebase.database()

app = Flask(__name__)
CORS(app)


class game(object):
  """docstring for game"""

  def __init__(self, gameID):
    super(game, self).__init__()
    self.gameID = gameID
    db.child("games").child(gameID).child("winner").set("")
    self.end_of_day = True
    self.num_mafia_remaining = 4
    self.num_town_remaining = 0

  def giveRoles(self):
    s = []
    all_players = db.child("games").child(self.gameID).child("players").get()

    for userID in all_players.each():
      s.append(userID.key())
    #print (s)

    r = random.choice(list(s))
    db.child("games").child(self.gameID).child("players").child(r).child("role").set("SHERIFF")
    s.remove(r)

    r = random.choice(list(s))
    db.child("games").child(self.gameID).child("players").child(r).child("role").set("DOCTOR")
    s.remove(r)

    tupleCount = 2
    while len(s)>0:
      if tupleCount < 0:
        tupleCount = 2
      if tupleCount == 2:
        r = random.choice(list(s))
        db.child("games").child(self.gameID).child("players").child(r).child("role").set("MAFIA")
        s.remove(r)
      else:
        r = random.choice(list(s))
        db.child("games").child(self.gameID).child("players").child(r).child("role").set("VILLAGER")
        s.remove(r)

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
  path = post["path"].split("/")
  if path[1] == "games":
    gameID = path[2]
    userID = path[4]

  # if path[len(path) - 2] == "past_games":
  #   me.finishedGame(path[2])
  if path[len(path) - 1] == "isAlive" and post["data"] == False:
    print("HERE")
    dayid = db.child("games").child(gameID).child("currentDay").get()
    cause = db.child("days").child(dayid.val()).child("newspaper").child(userID).get()
    print(cause.val())
    db.child("games").child(gameID).child("players").child(userID).child("causeOfDeath").set(cause.val())
  print(path[len(path) - 1])


@app.route('/start/<startID>')
def api_start(startID):
  mygame = game(startID)
  mygame.giveRoles()
  return "hello"

# mygame = game("-KWNPXBaDrA8BK8WZBK4")
db.child("games").child("-KWNPXBaDrA8BK8WZBK4").child("players").child("Mortimer 'Morty' Smith").child("role").set("MAFIA")
# mygame.giveRoles()
# mygame.death("Mortimer 'Morty' Smith", "Lynched by town")

my_stream = db.child("/").stream(stream_handler)

if __name__ == '__main__':
    app.run()
