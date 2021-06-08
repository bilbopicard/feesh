from flask_wtf import FlaskForm
from wtforms import TextAreaField, SubmitField, IntegerField, StringField
from wtforms.fields.html5 import DateField, TimeField
from wtforms.validators import DataRequired
from app.models import Appointment


class ReviewForm(FlaskForm):
    user_id = IntegerField('User Id', validators=[DataRequired()])
    feeder_id = IntegerField('Feeder Id', validators=[DataRequired()])
    rating = IntegerField('Rating', validators=[DataRequired()])
    content = TextAreaField('Content', validators=[DataRequired()])
    submit = SubmitField('Submit')
