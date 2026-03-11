import styles from './Hero.module.css'
import HeroImage from '../assets/Stone.jpg'
export default function Hero(){ 
    return(
        <>
        <div className={styles.hero}>
            <div className={styles.heroImageWrapper}><img className={styles.heroImage}src={HeroImage} alt="hero-image"></img></div>
            <div className={styles.heroContent}>
                <div className={styles.heroNameWrapper}><h1 className={styles.heroName}>Stone Casey</h1></div>
                <div className={styles.heroDescriptionWrapper}><p className={styles.heroDescription}>I develop full stack web applications</p></div>
            </div>
        </div>
        </>
    )
}