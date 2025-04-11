from flask import Flask, jsonify, request
from flask_cors import CORS
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base, Data, User  # Add User model import
from werkzeug.security import check_password_hash  # For password verification
import jwt
import datetime
from jwt import ExpiredSignatureError, InvalidTokenError
from dotenv import load_dotenv
import os
from functools import wraps

load_dotenv()

app = Flask(__name__)
CORS(app)

SECRET_KEY = os.getenv('SECRET_KEY') 
engine = create_engine(os.getenv('DB_URI'))
Base.metadata.create_all(engine)
Session = sessionmaker(bind=engine)

@app.route('/auth/login', methods=['POST'])
def login():
    credentials = request.json
    username = credentials.get('username')
    password = credentials.get('password')
    
    if not username or not password:
        return jsonify({'status': 'failure', 'message': 'Missing credentials'}), 400
    
    session = Session()
    user = session.query(User).filter_by(username=username).first()
    session.close()
    
    if user and check_password_hash(user.password_hash, password):
        payload = {
            'username': username,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
        }
        token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
        return jsonify({
            'status': 'success', 
            'token': token,
            'username': username
        })
    
    return jsonify({'status': 'failure'}), 401

@app.route('/api/data', methods=['GET'])
def get_data():
    session = Session()
    data = session.query(Data).all()
    session.close()
    
    return jsonify([{'id': d.id, 'existing_value': d.existing_value} for d in data])

if __name__ == '__main__':
    app.run(debug=True)