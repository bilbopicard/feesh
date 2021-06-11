from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    print("Checking if user exits", field.data)
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError("User is already registered.")


def email_valid(form, field):
    print("Validating Email Address")
    email = field.data
    if not email.count("@"):
        raise ValidationError("Email is invalid")


def user_already_in_db(form, field):
    print("Checking if username exists")
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError("Username is already registered")


class SignUpForm(FlaskForm):
    username = StringField('username', validators=[
                           DataRequired(), user_already_in_db])
    email = StringField('email', validators=[
                        DataRequired(), user_exists, email_valid])
    password = StringField('password', validators=[DataRequired()])
    zip_code = StringField('zip_code', validators=[DataRequired()])
