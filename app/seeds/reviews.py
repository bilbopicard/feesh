from werkzeug.security import generate_password_hash
from app.models import db, Review
import datetime

# Adds a demo user, you can add other users here if you want


def seed_reviews():

    review1 = Review(user_id=2,
                     feeder_id=1,
                     rating=4,
                     content='The best feeding my fish have ever gotten'
                     )

    db.session.add(review1)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
