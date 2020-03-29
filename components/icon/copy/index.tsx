import { memo } from 'react'

import IconComponent from '../types'

import '../icon.styl'

const Copy: IconComponent = memo(({ className = '', onClick = () => null }) => (
    <svg className={`icon ${className}`} {...{ onClick }} viewBox="0 0 561 561">
        <g>
            <path
                d="M395.25,0h-306c-28.05,0-51,22.95-51,51v357h51V51h306V0z M471.75,102h-280.5c-28.05,0-51,22.95-51,51v357
        c0,28.05,22.95,51,51,51h280.5c28.05,0,51-22.95,51-51V153C522.75,124.95,499.8,102,471.75,102z M471.75,510h-280.5V153h280.5V510
        z"
            />
        </g>
    </svg>
))

export default Copy
