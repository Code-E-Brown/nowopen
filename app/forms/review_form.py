from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError, Length, NumberRange

class ReviewForm(FlaskForm):
    # name = StringField('name', validators=[DataRequired(message='Business must have a name'), Length(max=50, message='Name cannot be longer than 50 characters')])
    # description = StringField('description', validators=[DataRequired('Business must have a description'), Length(max=100, message='Description cannot be longer than 100 characters')])
    # category_id = IntegerField('category_id', validators=[DataRequired(message="Business must belong to a category"), NumberRange(min=1, max = 3, message="Business must belong to a category")])

