from werkzeug.security import generate_password_hash
from app.models import db, User, Appointment
import datetime

# Adds a demo user, you can add other users here if you want


def seed_appointments():

    trying = Appointment(user_id=1,
                         description='Stuck at work and need someone to check on my fish',
                         date=datetime.date.today(),
                         time=datetime.datetime.now().time(),
                         image_url='https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2756&q=80',
                         street_address='24 Willie Mays Plaza',
                         city='San Francisco',
                         zip_code=94107,
                         appointment_type_id=3,
                         fish_type_id=1
                         )
    completedAppointment = Appointment(
        user_id=1,
        description='I am out of town and need someone to stop by to feed my fish.',
        date=datetime.date.today(),
        time=datetime.datetime.now().time(),
        image_url='https://images.unsplash.com/photo-1509016068623-286b408eb841?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
        street_address='4900 Marie P DeBartolo Way',
        city='Santa Clara',
        zip_code=95054,
        appointment_type_id=1,
        fish_type_id=1,
    )
    newAppointment = Appointment(
        user_id=2,
        description='Going on a trip and need someone to come and watch my fish',
        date=datetime.date.today(),
        time=datetime.datetime.now().time(),
        image_url='https://images.unsplash.com/photo-1618419125747-ee5a210c6ebe?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
        street_address='175 W Cliff Dr',
        city='Santa Cruz',
        zip_code=95060,
        appointment_type_id=5,
        fish_type_id=2,
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
