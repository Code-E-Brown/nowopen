from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Review, Business, db
from app.config import Config
from app.forms import ReviewForm


review_routes = Blueprint('reviews', __name__)


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



@review_routes.route('/<int:id>', methods=['DELETE'])
# @login_required
def deleteReview(id):
    reviewToDelete = Review.query.get(id)
    # print("DELETE THIS", reviewToDelete)
    businessId= reviewToDelete.to_dict()['business_id']
    db.session.delete(reviewToDelete)
    db.session.commit()

    bussinessBeingUpdated = Business.query.get(businessId)
    listOfCurrentBizReviews = bussinessBeingUpdated.to_dict()['reviews']

    sumOfCurrentBizRatings = sum([review['rating'] for review in listOfCurrentBizReviews])

    if (len(listOfCurrentBizReviews)):
        newAvg = round(sumOfCurrentBizRatings/len(listOfCurrentBizReviews))
    else:
        newAvg = 0

    bussinessBeingUpdated.rating = newAvg
    # businessBeingReviewed.rating = newAvg
    db.session.add(bussinessBeingUpdated)
    db.session.commit()
    # return {[business.to_dict() for business in businesses]}
    return {'Success': "Review Deleted"}

@review_routes.route('/<int:id>/edit', methods=['PUT'])
# @login_required
def editReview(id):
    reviewToEdit = Review.query.get(id)
    # print("Edit THIS ***********", request.json)

    form = ReviewForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    form['text'].data = request.json['text']


    if form.validate_on_submit():

        businessId= reviewToEdit.to_dict()['business_id']
        reviewToEdit = Review.query.get(id)
        reviewToEdit.text = request.json['text']
        reviewToEdit.rating = request.json['rating']


        db.session.add(reviewToEdit)
        db.session.commit()

        bussinessBeingUpdated = Business.query.get(businessId)
        listOfCurrentBizReviews = bussinessBeingUpdated.to_dict()['reviews']

        sumOfCurrentBizRatings = sum([review['rating'] for review in listOfCurrentBizReviews])

        if (len(listOfCurrentBizReviews)):
            newAvg = round(sumOfCurrentBizRatings/len(listOfCurrentBizReviews))
        else:
            newAvg = 0

        bussinessBeingUpdated.rating = newAvg
        # businessBeingReviewed.rating = newAvg
        db.session.add(bussinessBeingUpdated)
        db.session.commit()
        # return {[business.to_dict() for business in businesses]}
        return reviewToEdit.to_dict()
        
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

