# -*- coding: utf-8 -*-
"""
Created on Thu Apr 10 23:57:54 2025

@author: asus
"""

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base, Data

# Connect to the same database as your Flask app
engine = create_engine('sqlite:///db.sqlite3')
Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine)
session = Session()

# Add some dummy data
entries = [
    Data(existing_value=50),
    Data(existing_value=100),
    Data(existing_value=200),
    Data(existing_value=150),
    Data(existing_value=300),
]

session.add_all(entries)
session.commit()
session.close()

print("Database seeded successfully.")
