import {CSSProperties, useEffect, useState} from 'react'

const scGap : number = 0.01 
const delay : number = 20 
export const useAnimatedScale = () => {
    const [scale, setScale] = useState(0)
    const [animated, setAnimated] = useState(false)
    return {
        scale, 
        start() { 
            if (!animated) {
                setAnimated(true)
                const interval = setInterval(() => {
                    setScale((prev : number) => {
                        if (prev > 1) {
                            setAnimated(false)
                            clearInterval(interval)
                            return 0 
                        }
                        return prev + scGap 
                    })
                }, delay)
            }
        }
    }
}

export const useDimension = () => {
    const [w, setW] = useState(window.innerWidth)
    const [h, setH] = useState(window.innerHeight)
    useEffect(() => {
        window.onresize = () => {
            setW(window.innerWidth)
            setH(window.innerHeight)
        }
        return () => {
            window.onresize = () => {

            }
        }
    })
    return {
        w, 
        h
    }
}

const maxScale = (scale : number, i : number, n : number) : number => Math.max(0, scale - i / n)
const divideScale = (scale : number, i : number, n : number) : number => Math.min(1 / n, maxScale(scale, i, n)) * n 
const sinify = (scale : number) : number => Math.sin(scale * Math.PI)

export const useStyle = (w : number, h : number, scale : number) => {
    const position = 'absolute'
    const size = Math.min(w, h) / 10
    const circleSize = Math.min(w, h) / 20
    const background = 'indigo' 
    const sf : number = sinify(scale)
    return {
        barStyle(i : number) : CSSProperties {
            const shift : number = (2 * i - 1) * (w / 2 - size / 2) * sf
            const width = `${size / 2}px`
            const height = `${size}px`
            const left = `${w / 2 - size / 2 + size * i + shift}px`
            const top = `${h - size}px`
            return {
                position,
                left, 
                top,
                width, 
                height, 
                background
            }
        },
        circleStyle() : CSSProperties {
            const left = `${w / 2 - circleSize / 2}px`
            const top = `${(h - size) * (1  - sf)}px`
            const width = `${circleSize}px`
            const height = `${circleSize}px`
            const borderRadius = `50%`
            return {
                position, 
                left, 
                top, 
                width,
                height, 
                background,
                borderRadius
            }
        }
    }
}