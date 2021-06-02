from app.models import db, FishType


def seed_fishtypes():

    type1 = FishType(fish_type='Goldfish')
    type2 = FishType(fish_type='Koi')
    type3 = FishType(fish_type='Betta')

    db.session.add(type1)
    db.session.add(type2)
    db.session.add(type3)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_fishtypes():
    db.session.execute('TRUNCATE fish_types RESTART IDENTITY CASCADE;')
    db.session.commit()
