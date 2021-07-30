from flask import Blueprint, jsonify, request, redirect
from flask_login import login_required
from app.models import db, Business

business_routes = Blueprint('businesses', __name__)


@business_routes.route('')
# @login_required
def businesses():
    businesses = Business.query.all()
    # return {[business.to_dict() for business in businesses]}
    return {'businesses': [business.to_dict() for business in businesses]}

@business_routes.route('', methods=['POST'])
@ login_required
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
    print("ARE YOU NOT ENTERTAINED?********************", request.json)
    businessToUpdate.name = request.json['name']
    businessToUpdate.category_id = request.json['category_id']
    businessToUpdate.description = request.json['description']
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
