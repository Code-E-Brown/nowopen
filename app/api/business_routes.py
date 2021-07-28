from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Business

business_routes = Blueprint('businesses', __name__)


@business_routes.route('')
# @login_required
def businesses():
    businesses = Business.query.all()
    # return {[business.to_dict() for business in businesses]}
    return {'businesses': [business.to_dict() for business in businesses]}


# @user_routes.route('/<int:id>')
# @login_required
# def user(id):
#     user = User.query.get(id)
#     return user.to_dict()
