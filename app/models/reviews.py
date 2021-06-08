from .db import db


class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    feeder_id = db.Column(
        db.Integer, db.ForeignKey('users.id'), nullable=False)
    rating = db.Column(db.Integer)
    appointment_id = db.Column(db.Integer, db.ForeignKey(
        'appointments.id'), nullable=False)
    content = db.Column(db.Text, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "feeder_id": self.feeder_id,
            "rating": self.rating,
            "content": self.content,
            "appointment_id": self.appointment_id
        }
