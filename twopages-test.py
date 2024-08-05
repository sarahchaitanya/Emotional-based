import eel
eel.init('web2')

@eel.expose
def getEmotion():
    return "hello"


eel.start("firstfile.html")
