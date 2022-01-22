import React from 'react'
import { useStyle } from './hooks'
import withContext from './withContext'

interface CJOBProps {
    w : number, 
    h : number, 
    scale : number, 
    onClick : Function 
}

const CircleJumpOffBar = (props : CJOBProps) => {
    const {barStyle, circleStyle} = useStyle(props.w, props.h, props.scale)
    return (
        <React.Fragment>
            {[0, 1].map((i : number) => (<div key = {`bar_${i}`} style = {barStyle(i)}></div>))}
            <div onClick = {() => props.onClick()} style = {circleStyle()}></div>
        </React.Fragment>
    )
}

export default withContext(CircleJumpOffBar)