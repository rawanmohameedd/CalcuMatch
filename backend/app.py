from flask import Flask, jsonify, request
from flask_cors import CORS
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base, Data
import jwt
import datetime
from jwt import ExpiredSignatureError, InvalidTokenError
from dotenv import load_dotenv
import os


app = Flask(__name__)
CORS(app)

load_dotenv()
SECRET_KEY = os.getenv('SECRET_KEY')
engine = create_engine(os.getenv('DB_URI'))
Base.metadata.create_all(engine)
Session = sessionmaker(bind=engine)

@app.route('/api/login', methods=['POST'])
def login():
    credentials = request.json
    username = credentials.get('username')
    password = credentials.get('password')

    # Simple hardcoded auth for demo
    if username == 'admin' and password == '123':
        payload = {
            'username': username,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
        }
        token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
        return jsonify({'status': 'success', 'token': token})
    
    return jsonify({'status': 'failure'}), 401

@app.route('/api/data', methods=['GET'])
def get_data():
    token = request.headers.get('Authorization')

    if not token:
        return jsonify({'error': 'Missing token'}), 401

    try:
        decoded = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
    except ExpiredSignatureError:
        return jsonify({'error': 'Token expired'}), 401
    except InvalidTokenError:
        return jsonify({'error': 'Invalid token'}), 401

    session = Session()
    data = session.query(Data).all()
    session.close()

    return jsonify([{'id': d.id, 'existing_value': d.existing_value} for d in data])

if __name__ == '__main__':
    app.run(debug=True)
