from .db import db


class AppointmentType(db.Model):
    __tablename__ = 'appointment_types'

    id = db.Column(db.Integer, primary_key=True)
    appointment_type = db.Column(db.Text, nullable=False)

    def to_dict(self):
        return {
            "appointment_type": self.appointment_type
        }
