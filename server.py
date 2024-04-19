#setups a local server to bypass CORS policy

from flask import Flask, request, jsonify
import json
import requests

app = Flask(__name__)

#just expose all the files in the current directory
app._static_folder = '.'
@app.route('/<path:path>')
def static_proxy(path):
    print(path)
    return app.send_static_file(path)

#start
if __name__ == '__main__':
    app.run(port=5000)
    
