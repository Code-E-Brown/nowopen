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


# @user_routes.route('/<int:id>')
# @login_required
# def user(id):
#     user = User.query.get(id)
#     return user.to_dict()
