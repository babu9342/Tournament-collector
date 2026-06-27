from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")

db = client["sports_event_db"]

users_collection = db["users"]
tournaments_collection = db["tournaments"]
registrations_collection = db["registrations"]
fixtures_collection = db["fixtures"]

print("Connected to MongoDB")