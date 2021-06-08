from flask.cli import AppGroup
from .users import seed_users, undo_users
from .appointments import seed_appointments, undo_appointments
from .apppointment_types import seed_appointment_types, undo_appointment_types
from .fish_types import seed_fishtypes, undo_fishtypes
from .reviews import seed_reviews, undo_reviews
# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command


@seed_commands.command('all')
def seed():
    seed_users()
    seed_appointment_types()
    seed_fishtypes()
    seed_appointments()
    seed_reviews()
    # Add other seed functions here

# Creates the `flask seed undo` command


@seed_commands.command('undo')
def undo():
    undo_users()
    undo_reviews()
    undo_appointment_types()
    undo_fishtypes()
    undo_appointments()
    # Add other undo functions here
