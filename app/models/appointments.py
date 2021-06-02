from .db import db


class Appointment(db.Model):
    __tablename__ = 'appointments'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    feeder_id = db.Column(db.Integer, default=0)
    description = db.Column(db.Text, nullable=False)
    date_time = db.Column(db.TIMESTAMP, nullable=False)
    completed = db.Column(db.Boolean, nullable=False, default=False)
    image_url = db.Column(db.Text, nullable=False)
    street_address = db.Column(db.Text, nullable=False)
    city = db.Column(db.String(100), nullable=False)
    zip_code = db.Column(db.String(9), nullable=False)

    appointment_type_id = db.Column(
        db.Integer, db.ForeignKey('appointment_types.id'))
    fish_type_id = db.Column(db.Integer, db.ForeignKey('fish_types.id'))

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "feeder_id": self.feeder_id,
            "description": self.description,
            "completed": self.completed,
            "image_url": self.image_url,
            "street_address": self.street_address,
            "city": self.city,
            "date_time": self.date_time,
            "zip_code": self.zip_code,
            "appointment_type_id": self.appointment_type_id,
            "fish_type_id": self.fish_type_id
        }
