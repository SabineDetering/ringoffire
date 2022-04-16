import { animation, style, animate, trigger, transition, stagger, useAnimation, keyframes } from '@angular/animations';

export const takeCardAnimation = animation([
    animate('1s ease',
        keyframes([
            style({ transform: 'rotate({{ orgDegrees }}deg) translateY(-45vh)', offset: 0.2 }),
            style({
                zIndex: '100',
                transform: 'scale(1.2) rotate({{ orgDegrees }}deg) translateY(-35vh) rotateX(-120deg) ', offset: 0.4
            }),
            style({
                zIndex: '100',
                transform: 'scale(1.2) rotate({{ orgDegrees }}deg) translateY(-25vh) rotateX(-180deg) ', offset: 0.6
            }),
            style({
                zIndex: '100',
                transform: 'scale(1.2) rotate({{ orgDegrees }}deg) translateY(-12vh) rotate({{ interDegrees }}deg) rotateX(-180deg) ', offset: 0.8
            }),
            style({
                zIndex: '{{ level }}',
                transform: ' rotateX(-180deg)   translateX({{ XOffset }}vh) translateY({{ YOffset }}px) rotate({{ degrees }}deg) ', offset: 1
            })
        ])
    )
])