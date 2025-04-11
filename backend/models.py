
from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base


Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    
    id = Column(Integer, primary_key=True)
    username = Column(String(50), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
   
    def __repr__(self):
        return f"<User {self.username}>"


class Data(Base):
    __tablename__ = 'data'
    
    id = Column(Integer, primary_key=True)
    existing_value = Column(Integer, nullable=False)