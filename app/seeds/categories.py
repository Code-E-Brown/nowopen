from app.models import db, Category


# Adds a demo category, you can add other categories here if you want
def seed_categories():

    food = Category(
        name='Food'
    )
    retail = Category(
        name='Retail'
    )
    event = Category(
        name='Event'
    )

    db.session.add(food)
    db.session.add(retail)
    db.session.add(event)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the categories table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_categories():
    db.session.execute('TRUNCATE categories RESTART IDENTITY CASCADE;')
    db.session.commit()
