import style from './BusinessPage.module.css'
import { Link } from 'react-router-dom';

function BusinessPage() {

    return (
        <div>
            <div className={style.imageBox}>
                <div className={style.infoFlex}>
                    <div className={style.infoBox}>
                        <div className={style.nameBox}>
                            <h1 className={style.bizName}>
                                HaloHalo Bar
                            </h1>
                        </div>
                        <div className={style.ratingBox}>
                            ⭐⭐⭐⭐⭐ 57 reviews
                        </div>
                        <div className={style.openStatus}>
                            Now Open!
                        </div>
                        <div className={style.locationInfo}>
                            <Link>
                                Located at: 555 E street, Washington D.C
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BusinessPage
