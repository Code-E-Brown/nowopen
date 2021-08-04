from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError, Length, NumberRange

class ReviewForm(FlaskForm):
    text = StringField('text', validators=[DataRequired(message='Review cannot be empty'), Length(max=255, message='Review cannot be longer than 255 characters')])
    # description = StringField('description', validators=[DataRequired('Business must have a description'), Length(max=100, message='Description cannot be longer than 100 characters')])
    rating = IntegerField('rating', validators=[DataRequired(message="Review must have a rating"), NumberRange(min=1, max = 5, message="Review must have a rating")])

