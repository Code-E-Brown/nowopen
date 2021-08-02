from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Review, Business, db
from app.config import Config


review_routes = Blueprint('reviews', __name__)


@review_routes.route('/<int:id>', methods=['DELETE'])
# @login_required
def deleteReview(id):
    reviewToDelete = Review.query.get(id)
    print("DELETE THIS", reviewToDelete)
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
