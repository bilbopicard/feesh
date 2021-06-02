from .db import db


class FishType(db.Model):
    __tablename__ = 'fish_types'

    id = db.Column(db.Integer, primary_key=True)
    fish_type = db.Column(db.Text, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "fish_type": self.fish_type
        }
