from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import FishType

fish_type_routes = Blueprint('fish_types', __name__)


@fish_type_routes.route('/')
@login_required
def fish_types():
    fish_types = FishType.query.all()
    return {"fish_types": [fish_type.to_dict() for fish_type in fish_types]}
