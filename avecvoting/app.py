from flask import render_template, session, jsonify,request,Flask
from flask_cors import CORS
from __init__ import app

# from config import  port, debug
# import manager
# import voter
# import voterWe
# import voterAvec
# import json
import user
# import survey
# app = Flask(__name__)
CORS(app)

if __name__ == "__main__":

    # app.logger.info(f"starting server at {host}:{port} (debug={debug})")
    app.run(debug=True)
