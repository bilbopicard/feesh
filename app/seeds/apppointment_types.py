from app.models import db, AppointmentType


def seed_appointment_types():

    type1 = AppointmentType(appointment_type='Feeding')
    type2 = AppointmentType(appointment_type='Training')
    type3 = AppointmentType(appointment_type='Drop-In')
    type4 = AppointmentType(appointment_type='Boarding')
    type5 = AppointmentType(appointment_type='Sitting')

    db.session.add(type1)
    db.session.add(type2)
    db.session.add(type3)
    db.session.add(type4)
    db.session.add(type5)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_appointment_types():
    db.session.execute('TRUNCATE appointment_types RESTART IDENTITY CASCADE;')
    db.session.commit()
