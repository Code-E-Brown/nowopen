from .db import db



class Image(db.Model):
    __tablename__ = 'images'

    id = db.Column(db.Integer, primary_key=True)
    caption = db.Column(db.String(255), nullable=False)
    img_url = db.Column(db.String(2000), nullable=False)
    business_id = db.Column(db.Integer, db.ForeignKey('businesses.id'), nullable=False)
    review_id = db.Column(db.Integer, db.ForeignKey('reviews.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    business = db.relationship("Business", back_populates='images')
    review =db.relationship('Review', back_populates='images')
    user =db.relationship('User', back_populates='images')

    def to_dict(self):
        return {
            'id': self.id,
            'caption': self.caption,
            'img_url': self.img_url,
            'business_id': self.business_id,
            'review_id': self.review_id,
            'user_id':self.user_id
        }
