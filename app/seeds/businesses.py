from app.models import db, Business


# Adds a demo business, you can add other businesses here if you want
def seed_businesses():

    biz1 = Business(
        name='Halo-Halo Bar', user_id=1, description='Filipino inspired desserts and snack foods!', location_description='Open until 10pm! Located on the corner of J street.', now_open=True, current_lat='39.0518', current_long='-77.1164', rating=1, category_id=1,
        card_image="https://images.squarespace-cdn.com/content/v1/59fa255ea9db094b079fb588/1516901422704-LLFHMMAB503JB9ND1RH5/RickEdraPhotography__Photos_Halo_Halo_USB_10-21-17-57+copy.JPG",
        banner_image='https://assets.bonappetit.com/photos/60e46c6701084801b06de2a3/1:1/w_2560%2Cc_limit/Halo-Halo-Recipe-2021.jpg'
    )
    biz2 = Business(
        name='Pizza R Us', user_id=1, description='Hand tossed, brick oven pizza on wheels!', location_description='Open until midnight!', now_open=True, current_lat='38.9693', current_long='-77.0789', rating=1, category_id=1,
        card_image="https://images.pexels.com/photos/1082343/pexels-photo-1082343.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        banner_image='https://images.pexels.com/photos/3915857/pexels-photo-3915857.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    )
    biz3 = Business(
        name='Solo Los Tacos', user_id=1, description='Tacos and tacos only!!', location_description='Buy one get one! Currently in the shopping center parking lot!', now_open=True, current_lat='39.0703', current_long='-77.1324', rating=1, category_id=1,
        card_image="https://images.pexels.com/photos/3642718/pexels-photo-3642718.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        banner_image='https://images.pexels.com/photos/2092507/pexels-photo-2092507.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    )
    biz4 = Business(
        name='Mmm Waffles', user_id=1, description='Everything Waffles.', location_description='Buy one get one! Currently in the shopping center parking lot!', now_open=True, current_lat='39.1173', current_long='-77.1999', rating=1, category_id=1,
        card_image="https://images.pexels.com/photos/789327/pexels-photo-789327.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
        banner_image='https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F19%2F2018%2F02%2F13%2Famerica-best-breakfast-fried-chicken-waffles_0-2000.jpg'
    )
    biz5 = Business(
        name="Julie's Jewelry", user_id=1, description='Each piece is hand made. Come check them out!', location_description='Located in town square!', now_open=True, current_lat='39.0862', current_long='-77.1510', rating=1, category_id=2,
        card_image="https://images.pexels.com/photos/1413420/pexels-photo-1413420.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        banner_image='https://images.pexels.com/photos/1721937/pexels-photo-1721937.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    )
    biz6 = Business(
        name="Dope Threads", user_id=1, description='We have threads, and say things like "dope".', location_description='Open until 6pm', now_open=True, current_lat='39.0971', current_long='-77.1540', rating=1, category_id=2,
        card_image="https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        banner_image='https://images.pexels.com/photos/1020370/pexels-photo-1020370.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    )
    biz7 = Business(
        name="Shoe Donation", user_id=1, description='Help those in need by donating shoes!', location_description='Located in the shopping center parking lot!', now_open=True, current_lat='39.0942', current_long='-77.2006', rating=1, category_id=3,
        card_image="https://images.pexels.com/photos/2529157/pexels-photo-2529157.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        banner_image='https://images.pexels.com/photos/6646949/pexels-photo-6646949.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    )
    biz8 = Business(
        name="Classic Car Show", user_id=1, description='Annual Classic Car show hosted by Bob CarGuy', location_description='Until 5pm. Food and Entertainment until 4pm!', now_open=True, current_lat='38.9847', current_long='-77.0947', rating=1, category_id=3,
        card_image="https://images.pexels.com/photos/461824/pexels-photo-461824.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        banner_image='https://images.pexels.com/photos/163553/auto-cadillac-oldtimer-classic-163553.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    )
    biz9 = Business(
        name="Whack Castle", user_id=1, description='Burgers, fries and everything nice!', location_description='Buy one get one shakes! Open until 8pm!', now_open=True, current_lat='38.9187', current_long='-77.2311', rating=1, category_id=1,
        card_image="https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
        banner_image='https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    )

    biz10 = Business(
        name="Sweetheart's Sushi", user_id=1, description='From Sushi with Love <3', location_description='Open until 4pm. Located next to Bubbles and Tea', now_open=True, current_lat='38.8816', current_long='-77.0910', rating=1, category_id=1,
        card_image="https://images.pexels.com/photos/3147493/pexels-photo-3147493.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        banner_image='https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    )

    biz11 = Business(
        name="Adopt a Puppy", user_id=1, description='Local puppies looking for a home. So cute!', location_description='Located in the PetSmart parking lot', now_open=True, current_lat='38.8823', current_long='-77.1711', rating=1, category_id=3,
        card_image="https://images.pexels.com/photos/3790942/pexels-photo-3790942.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        banner_image='https://images.pexels.com/photos/1904105/pexels-photo-1904105.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    )











    db.session.add(biz1)
    db.session.add(biz2)
    db.session.add(biz3)
    db.session.add(biz4)
    db.session.add(biz5)
    db.session.add(biz6)
    db.session.add(biz7)
    db.session.add(biz8)
    db.session.add(biz9)
    db.session.add(biz10)
    db.session.add(biz11)
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
