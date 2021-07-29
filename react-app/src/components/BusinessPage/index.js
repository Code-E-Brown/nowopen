import style from './BusinessPage.module.css'

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
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BusinessPage
