import styles from './Hero.module.css'

export default function Hero(){ 
    return(
        <>
        <div className={styles.hero}>
            <div className={styles.heroTextWrapper}>
                <h2 className={styles.heroName}>Stone Casey</h2>
                <div className={styles.heroDescriptionWrapper}>
                    <p className={styles.heroDescription}>I build full stack web applications</p>
                </div>
            </div>
        </div>
        </>
    )
}