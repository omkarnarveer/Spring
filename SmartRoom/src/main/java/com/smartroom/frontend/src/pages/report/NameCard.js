import React from 'react';
import clsx from "https://cdn.skypack.dev/clsx@1.1.1";
import Icon from './Icon';
import { animated, useSpring } from '@react-spring/web'

function NameCard({name,scored,rise,progress}) {
  const { score, barPlayhead } = useSpring({
        score: scored,
        barPlayhead: 1,
        from: { score: 0, barPlayhead: 0 },
    });
    return (
        <div className="w-full p-2 lg:w-1/6">
            <div className="rounded-lg bg-card flex flex-col justify-start p-3 px-5 h-28">
                <div className="flex">
                    <div className="flex items-center w-[60%]">
                        <div className=" font-bold text-white">{name}</div>
                    </div>
                    <div className="flex flex-col items-center w-[40%]">
                        <Icon
                            path={rise ? 'res-react-dash-bull' : 'res-react-dash-bear'}
                            className="w-8 h-8"
                        />
                        <animated.div
                            className={clsx(
                                rise ? 'text-green-500' : 'text-red-500',
                                'font-bold',
                                'text-lg',
                            )}
                        >
                            {score.interpolate((i) => `${i.toFixed(2)}`)}
                        </animated.div>

                    </div>
                </div>
                <svg
                    className="w-full mt-3"
                    height="6"
                    viewBox="0 0 200 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect width="200" height="6" rx="3" fill="#2D2D2D" />
                    <animated.rect
                        width={barPlayhead.interpolate(
                            (i) => i * (progress / 5) * 200,
                        )}
                        height="6"
                        rx="3"
                        fill="url(#paint0_linear)"
                    />
                    <rect x="38" width="2" height="6" fill="#171717" />
                    <rect x="78" width="2" height="6" fill="#171717" />
                    <rect x="118" width="2" height="6" fill="#171717" />
                    <rect x="158" width="2" height="6" fill="#171717" />
                    <defs>
                        <linearGradient id="paint0_linear" x1="0" y1="0" x2="1" y2="0">
                            <stop stopColor="#8E76EF" />
                            <stop offset="1" stopColor="#3912D2" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

        </div>
    );
}

export default NameCard