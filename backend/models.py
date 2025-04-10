# -*- coding: utf-8 -*-
"""
Created on Thu Apr 10 23:43:16 2025

@author: asus
"""

from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Data(Base):
    __tablename__ = 'data'
    id = Column(Integer, primary_key=True)
    existing_value = Column(Float)
