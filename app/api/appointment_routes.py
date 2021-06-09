from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Appointment, AppointmentType, FishType
from app.forms.appointment_form import AppointmentForm

appointment_routes = Blueprint('appointments', __name__)


@appointment_routes.route('/')
@login_required
def appointments():
    appointments = Appointment.query.join(
        AppointmentType, AppointmentType.id == Appointment.appointment_type_id).join(FishType, FishType.id == Appointment.fish_type_id).all()
    return {"appointments": [appointment.to_dict() for appointment in appointments]}


@appointment_routes.route('/', methods=['POST'])
@login_required
def create_appointment():
    # print('FROM BACKEND', request.data)
    form = AppointmentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print(form.data)
    if form.validate_on_submit():
        new_appointment = Appointment(
            user_id=form.data['userId'],
            description=form.data['description'],
            date=form.data['date'],
            time=form.data['time'],
            image_url=form.data['imageUrl'],
            street_address=form.data['streetAddress'],
            city=form.data['city'],
            zip_code=form.data['zipCode'],
            fish_type_id=form.data['fishTypeId'],
            appointment_type_id=form.data['appointmentTypeId'],

        )
        print(new_appointment)
        db.session.add(new_appointment)
        db.session.commit()
        return new_appointment.to_dict()
    return 'I think it worked'


@appointment_routes.route('/<int:id>')
@login_required
def get_appointment(id):
    appointment = Appointment.query.get(id)
    return appointment.to_dict()


@appointment_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_appointment(id):
    form = AppointmentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print(form.data)
    if form.validate_on_submit():
        print('inside validation lol')
    #     return 'whats up'
        appointment_to_update = Appointment.query.get(id)
        appointment_to_update.user_id = form.data['userId'],
        appointment_to_update.description = form.data['description'],
        appointment_to_update.date = form.data['date'],
        appointment_to_update.time = form.data['time'],
        appointment_to_update.image_url = form.data['imageUrl'],
        appointment_to_update.street_address = form.data['streetAddress'],
        appointment_to_update.city = form.data['city'],
        appointment_to_update.zip_code = form.data['zipCode'],
        appointment_to_update.fish_type_id = form.data['fishTypeId'],
        appointment_to_update.appointment_type_id = form.data['appointmentTypeId'],
        appointment_to_update.feeder_id = form.data['feeder_id'],
        appointment_to_update.completed = form.data['completed']
        db.session.add(appointment_to_update)
        db.session.commit()
        print('HELLO WORLD', appointment_to_update)
        return appointment_to_update.to_dict()
    return 'hello world'


@appointment_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_appointment(id):
    appointment = Appointment.query.get(id)
    db.session.delete(appointment)
    db.session.commit()
    appointments = Appointment.query.join(
        AppointmentType, AppointmentType.id == Appointment.appointment_type_id).join(FishType, FishType.id == Appointment.fish_type_id).all()
    return {"appointments": [appointment.to_dict() for appointment in appointments]}
