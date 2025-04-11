# -*- coding: utf-8 -*-
"""
Created on Thu Apr 10 23:57:54 2025

@author: asus
"""

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base, Data, User  
from werkzeug.security import generate_password_hash 
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

if os.path.exists("./db.sqlite3"):
    os.remove("./db.sqlite3")
# Connect to the database
engine = create_engine(os.getenv('DB_URI'))
Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine)
session = Session()

# clear existing data to avoid duplicates
session.query(Data).delete()
session.query(User).delete()  
session.commit()

# Add users with hashed passwords
users = [
    User(
        username='admin',
        password_hash=generate_password_hash('123'),
       
    ),
    User(
        username='user',
        password_hash=generate_password_hash('123'),
       
    ),
    User(
        username='test',
        password_hash=generate_password_hash('123'),
       
    )
]

session.add_all(users)
session.commit()

print("Users seeded successfully.")

# Add dummy data entries
entries = [
    Data(existing_value=50),
    Data(existing_value=100),
    Data(existing_value=200),
    Data(existing_value=150),
    Data(existing_value=300),
    Data(existing_value=350),
    Data(existing_value=400),
    Data(existing_value=450),
    Data(existing_value=500),
]

session.add_all(entries)
session.commit()
session.close()

print("Database seeded successfully.")