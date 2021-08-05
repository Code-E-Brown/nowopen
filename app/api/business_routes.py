from flask import Blueprint, jsonify, request, redirect
from flask_login import login_required
from app.models import db, Business, Review
from app.forms import CreateForm, ReviewForm

business_routes = Blueprint('businesses', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            # errorMessages.append(f'{field} : {error}')
            errorMessages.append(f'{error}')
    return errorMessages



@business_routes.route('')
# @login_required
def businesses():
    businesses = Business.query.all()
    # return {[business.to_dict() for business in businesses]}
    return {'businesses': [business.to_dict() for business in businesses]}

@business_routes.route('', methods=['POST'])
@login_required
def create_business():

    form = CreateForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    form['category_id'].data = request.json['business']['category_id']
    form['description'].data = request.json['business']['description']
    form['name'].data = request.json['business']['name']
    # form['name'].data = request.json['business']['name']


    if form.validate_on_submit():

        newBiz = Business(
            name=request.json['business']['name'],
            user_id=request.json['business']['user_id'],
            description=request.json['business']['description'],
            category_id=request.json['business']['category_id'],
            card_image=request.json['business']['card_image'],
            banner_image=request.json['business']['banner_image'],

            )

        db.session.add(newBiz)
        db.session.commit()
        return newBiz.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@business_routes.route('/<int:id>/edit', methods=["PUT"])
@login_required
def edit_business(id):
    # print('**************************', request.json)

    form = CreateForm()


    businessToUpdate = Business.query.get(id)

    form['csrf_token'].data = request.cookies['csrf_token']
    form['category_id'].data = request.json['category_id']
    form['description'].data = request.json['description']
    form['name'].data = request.json['name']

    if form.validate_on_submit():
        businessToUpdate.name = request.json['name']
        businessToUpdate.category_id = request.json['category_id']
        businessToUpdate.description = request.json['description']
        businessToUpdate.now_open = request.json['now_open']
        businessToUpdate.current_lat = request.json['current_lat']
        businessToUpdate.current_long = request.json['current_long']
        businessToUpdate.location_description = request.json['location_description'],
        businessToUpdate.card_image=request.json['card_image'],
        businessToUpdate.banner_image=request.json['banner_image'],

        db.session.add(businessToUpdate)
        db.session.commit()
        return businessToUpdate.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@business_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_business(id):
    businessToDelete = Business.query.get(id)
    print(businessToDelete)
    db.session.delete(businessToDelete)
    db.session.commit()
    return {'Success': 'Business deleted'}

@business_routes.route('/<int:id>/reviews', methods=["POST"])
@login_required
def create_review(id):

    form = ReviewForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    # form['category_id'].data = request.json['category_id']
    # form['description'].data = request.json['description']
    form['text'].data = request.json['text']

    if form.validate_on_submit():

        newReview = Review(
            text= request.json['text'],
            rating=request.json['rating'],
            business_id=request.json['business_id'],
            user_id=request.json['user_id'],
            )


        db.session.add(newReview)
        db.session.commit()

        businessBeingReviewed = Business.query.get(id)
        currentRating = businessBeingReviewed.rating

        # newAvgBizRating = sum(bussinessBeingReviewed.to_dict()['reviews']['rating'])
        # print(len(bussinessBeingReviewed.to_dict()['reviews']))
        listOfCurrentBizReviews = businessBeingReviewed.to_dict()['reviews']

        sumOfCurrentBizRatings = sum([review['rating'] for review in listOfCurrentBizReviews])

        newAvg = round(sumOfCurrentBizRatings/len(listOfCurrentBizReviews))
        # print("*************", newAvg)
        businessBeingReviewed.rating = newAvg
        db.session.add(businessBeingReviewed)
        db.session.commit()

        # print('AVERAGE',int(newAvg))
        return newReview.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@business_routes.route('/<int:id>/reviews')
# @login_required
def get_reviews(id):

    allReviewsForBusiness = Review.query.filter(Review.business_id == id).all()

    # print('heres your list*****************', allReviewsForBusiness)
    return {'reviews': [review.to_dict() for review in allReviewsForBusiness]}
