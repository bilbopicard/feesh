from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Review
from app.forms.review_form import ReviewForm

review_routes = Blueprint('reviews', __name__)


@review_routes.route('/')
@login_required
def get_reviews():
    reviews = Review.query.all()
    return {"reviews": [review.to_dict() for review in reviews]}


@review_routes.route('/', methods=['POST'])
@login_required
def add_review():
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_review = Review(
            user_id=form.data['user_id'],
            feeder_id=form.data['feeder_id'],
            rating=form.data['rating'],
            content=form.data['content'],
            appointment_id=form.data['appointment_id']
        )
        db.session.add(new_review)
        db.session.commit()
        reviews = Review.query.all()
        return {"reviews": [review.to_dict() for review in reviews]}
    return 'hello world'


# @ review_routes.route('/<int:id>')
# @ login_required
# def review(id):
#     review = Review.query.get(id)
#     return review.to_dict()


@review_routes.route('/<int:id>', methods=['PUT'])
@login_required
def review(id):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        review = Review.query.get(id)
        review.content = form.data['content']
        review.rating = form.data['rating']
        # db.session.add(review)
        db.session.commit()
        reviews = Review.query.all()
        return {"reviews": [review.to_dict() for review in reviews]}
    return 'hello world'


@review_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_review(id):
    review = Review.query.get(id)
    db.session.delete(review)
    db.session.commit()
    reviews = Review.query.all()
    return {"reviews": [review.to_dict() for review in reviews]}

# @ review_routes.route('/users/<int:user_id>')
# @ login_required
# def user_reviews(user_id):
#     reviews = Review.query.filter(Review.feeder_id == user_id).all()
#     return {"user_reviews": [review.to_dict() for review in reviews]}
