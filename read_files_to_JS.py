import eel, os, random

eel.init('web')
# folder = r"C:\Users\lenovo\Documents\WD_INNOVATIVE\songs"
@eel.expose
def fileextract(folder):
    if os.path.isdir(folder):
        print("yes..came")
        for root,dirs,files in os.walk(folder):
            print("returned..")
            print(files[0])
            return files
            # return random.choice(os.listdir(folder))
    else:
        return 'Not valid folder'

eel.start('file_access.html')