from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Appointment

appointment_routes = Blueprint('appointments', __name__)


@appointment_routes.route('/')
@login_required
def appointments():
    appointments = Appointment.query.all()
    return {"appointments": [appointment.to_dict() for appointment in appointments]}


# @appointment_routes.route('/', methods=['POST'])
# @login_required
# def appointments():
#     appointments = Appointment.query.all()
#     return {"appointments": [appointment.to_dict() for appointment in appointments]}

@appointment_routes.route('/<int:id>')
@login_required
def get_appointment(id):
    appointment = Appointment.query.get(id)
    return appointment.to_dict()


# @appointment_routes.route('/<int:id>', methods=['PUT'])
# @login_required
# def get_appointment(id):
#     appointment = Appointment.query.get(id)
#     return appointment.to_dict()

# @appointment_routes.route('/<int:id>', methods=['DELETE'])
# @login_required
# def get_appointment(id):
#     appointment = Appointment.query.get(id)
#     return appointment.to_dict()
