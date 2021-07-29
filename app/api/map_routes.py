from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Business
from app.config import Config


map_routes = Blueprint('maps', __name__)


@map_routes.route('', methods=['POST'])
# @login_required
def maps():
    print(Config.MAPS_API_KEY)
    # return {[business.to_dict() for business in businesses]}
    return {'MAPS_API_KEY': Config.MAPS_API_KEY}
