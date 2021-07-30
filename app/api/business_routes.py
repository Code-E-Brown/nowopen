from flask import Blueprint, jsonify, request, redirect
from flask_login import login_required
from app.models import db, Business, Review

business_routes = Blueprint('businesses', __name__)


@business_routes.route('')
# @login_required
def businesses():
    businesses = Business.query.all()
    # return {[business.to_dict() for business in businesses]}
    return {'businesses': [business.to_dict() for business in businesses]}

@business_routes.route('', methods=['POST'])
@login_required
def create_business():
    # newBusiness = Business(name=)
    # print('*************', request.json['business'])
    newBiz = Business(
        name=request.json['business']['name'],
        user_id=request.json['business']['user_id'],
        description=request.json['business']['description'],
        category_id=request.json['business']['category_id'],
        )

    db.session.add(newBiz)
    db.session.commit()
    return newBiz.to_dict()


@business_routes.route('/<int:id>/edit', methods=["PUT"])
@login_required
def edit_business(id):
    businessToUpdate = Business.query.get(id)
    businessToUpdate.name = request.json['name']
    businessToUpdate.category_id = request.json['category_id']
    businessToUpdate.description = request.json['description']
    businessToUpdate.now_open = request.json['now_open']
    businessToUpdate.current_lat = request.json['current_lat']
    businessToUpdate.current_long = request.json['current_long']
    businessToUpdate.location_description = request.json['location_description']
    db.session.add(businessToUpdate)
    db.session.commit()
    return businessToUpdate.to_dict()

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

    newReview = Review(
        text= request.json['text'],
        rating=request.json['rating'],
        business_id=request.json['business_id'],
        user_id=request.json['user_id'],
        )
    # businessToDelete = Business.query.get(id)

    db.session.add(newReview)
    db.session.commit()

    businessBeingReviewed = Business.query.get(id)
    currentRating = businessBeingReviewed.rating

    # newAvgBizRating = sum(bussinessBeingReviewed.to_dict()['reviews']['rating'])
    # print(len(bussinessBeingReviewed.to_dict()['reviews']))
    listOfCurrentBizReviews = businessBeingReviewed.to_dict()['reviews']

    sumOfCurrentBizRatings = sum([review['rating'] for review in listOfCurrentBizReviews])

    newAvg = sumOfCurrentBizRatings/len(listOfCurrentBizReviews)


    print('AVERAGE',int(newAvg))
    return {'Success': 'Business deleted'}
