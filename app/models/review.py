from .db import db


class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(1000), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    business_id = db.Column(db.Integer, db.ForeignKey('businesses.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    business = db.relationship("Business", back_populates='reviews')
    images= db.relationship('Image', back_populates='review')
    user = db.relationship('User', back_populates='reviews')
    comments = db.relationship('Comment', back_populates='review')

    def to_dict(self):
        return {
            'id': self.id,
            'text': self.text,
            'rating': self.rating,
            'business_id': self.business_id,
            'user_id':self.user_id
        }
