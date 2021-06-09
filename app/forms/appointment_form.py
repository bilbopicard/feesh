from flask_wtf import FlaskForm
from wtforms import TextAreaField, SubmitField, IntegerField, StringField
from wtforms.fields.html5 import DateField, TimeField
from wtforms.validators import DataRequired
from app.models import Appointment


class AppointmentForm(FlaskForm):
    userId = IntegerField('User ID', validators=[DataRequired()])
    description = TextAreaField('Decription', validators=[DataRequired()])
    date = DateField('Date', validators=[DataRequired()])
    time = TimeField('Time', validators=[DataRequired()])
    fishTypeId = IntegerField('Fish Type', validators=[DataRequired()])
    appointmentTypeId = IntegerField(
        'Appointment Type', validators=[DataRequired()])
    imageUrl = TextAreaField('Image URL', validators=[DataRequired()])
    streetAddress = TextAreaField(
        'Street Address', validators=[DataRequired()])
    city = StringField('City', validators=[DataRequired()])
    zipCode = StringField('Zip Code', validators=[DataRequired()])
    feeder_id = IntegerField('Feeder Id')
    submit = SubmitField('Submit')
