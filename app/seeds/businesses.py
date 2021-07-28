from app.models import db, Business


# Adds a demo business, you can add other businesses here if you want
def seed_businesses():

    biz1 = Business(
        name='Halo-Halo Bar', user_id=1, description='Filipino inspired desserts and snack foods!', location_description=None, now_open=False, current_lat=None, current_long=None, rating=4, category_id=1
    )

    db.session.add(biz1)
    # db.session.add(marnie)
    # db.session.add(bobbie)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the businesses table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_businesses():
    db.session.execute('TRUNCATE businesses RESTART IDENTITY CASCADE;')
    db.session.commit()
