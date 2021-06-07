from werkzeug.security import generate_password_hash
from app.models import db, User, Appointment
import datetime

# Adds a demo user, you can add other users here if you want


def seed_appointments():

    trying = Appointment(user_id=1,
                         description='what is this',
                         date=datetime.date.today(),
                         time=datetime.datetime.now().time(),
                         image_url='https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2756&q=80',
                         street_address='231123 Old Road',
                         city='San Francisco',
                         zip_code=95112,
                         appointment_type_id=1,
                         fish_type_id=1
                         )
    completedAppointment = Appointment(
        user_id=1,
        description='I completed this',
        date=datetime.date.today(),
        time=datetime.datetime.now().time(),
        image_url='https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2756&q=80',
        street_address='231123 the road',
        city='San Jose',
        zip_code=95112,
        appointment_type_id=4,
        fish_type_id=2,
        completed=True,
        feeder_id=3
    )
    newAppointment = Appointment(
        user_id=3,
        description='Leaving town',
        date=datetime.date.today(),
        time=datetime.datetime.now().time(),
        image_url='https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2756&q=80',
        street_address='1000 Vin Scully Ave',
        city='Los Angeles',
        zip_code=90012,
        appointment_type_id=3,
        fish_type_id=1,
    )

    db.session.add(trying)
    db.session.add(completedAppointment)
    db.session.add(newAppointment)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_appointments():
    db.session.execute('TRUNCATE appointments RESTART IDENTITY CASCADE;')
    db.session.commit()
