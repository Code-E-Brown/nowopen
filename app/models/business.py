from .db import db


class Business(db.Model):
    __tablename__ = 'businesses'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    description = db.Column(db.String(2000), nullable=False)
    location_description = db.Column(db.String(1000))
    now_open = db.Column(db.Boolean, nullable=False, default=False)
    current_lat = db.Column(db.String(100))
    current_long = db.Column(db.String(100))
    rating = db.Column(db.Integer, default=0, nullable=False)
    category_id= db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)


    category = db.relationship("Category", back_populates='businesses')
    owner = db.relationship('User', back_populates='businesses')
    images= db.relationship('Image', back_populates='business')
    reviews=db.relationship('Review', back_populates='business')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'user_id':self.user_id,
            "category_id": self.category_id,
            'description': self.description,
            "location_description": self.location_description,
            'now_open': self.now_open,
            'current_lat': self.current_lat,
            'current_long':self.current_long,
            'rating': self.rating,
        }
