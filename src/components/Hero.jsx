import { useEffect, useRef } from 'react'
import styles from './Hero.module.css'

export default function Hero() {
    const canvasRef = useRef(null)
    const mouseRef = useRef({ x: -9999, y: -9999 })
    const starsRef = useRef([])
    const animFrameRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')

        const initStars = () => {
            starsRef.current = Array.from({ length: 220 }, () => ({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 1.4 + 0.4,
                baseAlpha: Math.random() * 0.5 + 0.25,
                twinkleSpeed: Math.random() * 0.025 + 0.004,
                twinkleOffset: Math.random() * Math.PI * 2,
                vx: 0,
                vy: 0,
            }))
        }

        const resize = () => {
            canvas.width = canvas.offsetWidth
            canvas.height = canvas.offsetHeight
            initStars()
        }

        const draw = (time) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            const { x: mx, y: my } = mouseRef.current
            const INFLUENCE = 130

            for (const star of starsRef.current) {
                const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset)
                let alpha = star.baseAlpha + twinkle * 0.25
                let r = star.radius

                const dx = mx - star.x
                const dy = my - star.y
                const dist = Math.sqrt(dx * dx + dy * dy)

                if (dist < INFLUENCE) {
                    const force = (1 - dist / INFLUENCE)
                    star.vx -= (dx / (dist || 1)) * force * 0.35
                    star.vy -= (dy / (dist || 1)) * force * 0.35
                    alpha = Math.min(1, alpha + force * 0.75)
                    r = star.radius + force * 1.2
                }

                star.vx *= 0.91
                star.vy *= 0.91
                star.x += star.vx
                star.y += star.vy

                // Wrap
                if (star.x < 0) star.x += canvas.width
                if (star.x > canvas.width) star.x -= canvas.width
                if (star.y < 0) star.y += canvas.height
                if (star.y > canvas.height) star.y -= canvas.height

                ctx.beginPath()
                ctx.arc(star.x, star.y, Math.max(0.1, r), 0, Math.PI * 2)
                ctx.fillStyle = `rgba(255,255,255,${Math.max(0, Math.min(1, alpha))})`
                ctx.fill()
            }

            animFrameRef.current = requestAnimationFrame(draw)
        }

        const onMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect()
            mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
        }

        const onMouseLeave = () => {
            mouseRef.current = { x: -9999, y: -9999 }
        }

        resize()
        animFrameRef.current = requestAnimationFrame(draw)
        window.addEventListener('resize', resize)
        canvas.addEventListener('mousemove', onMouseMove)
        canvas.addEventListener('mouseleave', onMouseLeave)

        return () => {
            cancelAnimationFrame(animFrameRef.current)
            window.removeEventListener('resize', resize)
            canvas.removeEventListener('mousemove', onMouseMove)
            canvas.removeEventListener('mouseleave', onMouseLeave)
        }
    }, [])

    return (
        <div className={styles.hero}>
            <canvas ref={canvasRef} className={styles.starCanvas} />
            <div className={styles.heroContent}>
                <h1 className={styles.heroName}>Stone Casey</h1>
                <p className={styles.heroDescription}>I build full stack web applications</p>
            </div>
        </div>
    )
}
