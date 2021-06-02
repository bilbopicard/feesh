from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import AppointmentType

appointment_type_routes = Blueprint('appointment_types', __name__)


@appointment_type_routes.route('/')
@login_required
def appointment_types():
    appointment_types = AppointmentType.query.all()
    return {"appointment_types": [appointment_type.to_dict() for appointment_type in appointment_types]}
