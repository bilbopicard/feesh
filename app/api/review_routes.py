from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Review

review_routes = Blueprint('reviews', __name__)


@review_routes.route('/')
@login_required
def users():
    reviews = Review.query.all()
    return {"reviews": [review.to_dict() for review in reviews]}


@review_routes.route('/<int:id>')
@login_required
def review(id):
    review = Review.query.get(id)
    return review.to_dict()


# @review_routes.route('/<int:id>', methods=['PUT'])
# @login_required
# def review(id):
#     review = Review.query.get(id)
#     return review.to_dict()

# @review_routes.route('/<int:id>', methods=['DELETE'])
# @login_required
# def review(id):
#     review = Review.query.get(id)
#     return review.to_dict()

@review_routes.route('/users/<int:user_id>')
@login_required
def user_reviews(user_id):
    reviews = Review.query.filter(Review.feeder_id == user_id).all()
    return {"user_reviews": [review.to_dict() for review in reviews]}
