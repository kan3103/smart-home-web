import React from 'react';
import styled from 'styled-components';

const Card = () => {
    return (
        <StyledWrapper>
            <div className="navigation-card">
                <a href="/" className="tab">
                    <svg className="svgIcon" viewBox="0 0 104 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100.5 40.75V96.5H66V68.5V65H62.5H43H39.5V68.5V96.5H3.5V40.75L52 4.375L100.5 40.75Z" stroke="black" strokeWidth={7} />
                    </svg>
                </a>
            </div>

            <div className="navigation-card">
                <a href="#" className="tab">
                    <div className="relative w-[25px] h-[25px] opacity-90 ">
                        <div className="relative h-[30px]">
                            <div className="absolute w-6 h-[27px] top-0 left-[0px]">
                                <div className="relative h-[27px]">
                                    <div className="absolute w-[19px] h-[27px] top-0 left-0 bg-black rounded-[2px_2px_0px_0px] border-2 border-solid" />

                                    <div className="absolute w-5 h-0.5 top-[25px] left-0 bg-black rounded-[1px]" />

                                    <div className="absolute w-1 h-1 top-3 left-[5px] bg-white rounded-sm" />
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
            </div>

            <div className="navigation-card">
                <a href="/add-member" className="tab">
                    <div className="relative h-[30px]">
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users-round">
                            <path d="M18 21a8 8 0 0 0-16 0" />
                            <circle cx={10} cy={8} r={5} />
                            <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3" />
                        </svg>
                    </div>
                </a>
            </div>

            <div className="navigation-card">
                {/* Fixed link to AddDevice page - removed inner checkbox structure that was preventing navigation */}
                <a href="/add-device" className="tab">
                    <svg id="Bookmark" viewBox="0 0 10 22" xmlns="http://www.w3.org/2000/svg" height="24px" width="24px" className="bookmark-icon">
                        <g fillRule="evenodd" fill="none">
                            <g className="color000000 svgShape" transform="translate(-265 -2679)" fill="#242424">
                                <g className="color000000 svgShape" fill="#242424" transform="translate(56 160)">
                                    <path className="color000000 svgShape" fill="#242424" d="M219 2521v16.998c0 .891-1.077 1.337-1.707.707l-2.586-2.586a1 1 0 0 0-1.414 0l-2.586 2.586c-.63.63-1.707.184-1.707-.707V2521a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2" />
                                </g>
                            </g>
                        </g>
                    </svg>
                </a>
            </div>

            <div className= "navigation-card" >
                <a href="/notification" className="tab">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22" width={24} height={24}>
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path fill="currentColor" d="M20 17h2v2H2v-2h2v-7a8 8 0 1 1 16 0v7zm-2 0v-7a6 6 0 1 0-12 0v7h12zm-9 4h6v2H9v-2z" />
                    </svg>
                </a>
            </div>

            <div className= "navigation-card" >
                <a href="/dashboard" className="tab">
                    <svg
                        width="50"
                        height="50"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="icon"
                    >
                        <path d="M3 3v18h18" />
                        <polyline points="6 17 10 12 13 15 18 9" />
                    </svg>
                </a>
            </div>

            <div className="navigation-card">
                <a href="/profile" className="tab">
                    <svg width={104} height={100} viewBox="0 0 104 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="21.5" y="3.5" width={60} height={60} rx={30} stroke="black" strokeWidth={7} />
                        <g clipPath="url(#clip0_41_27)">
                            <mask id="mask0_41_27" style={{maskType: 'luminance'}} maskUnits="userSpaceOnUse" x={0} y={61} width={104} height={52}>
                                <path d="M0 113C0 84.2812 23.4071 61 52.1259 61C80.706 61 104 84.4199 104 113H0Z" fill="white" />
                            </mask>
                            <g mask="url(#mask0_41_27)">
                                <path d="M-7 113C-7 80.4152 19.4152 54 52 54H52.2512C84.6973 54 111 80.3027 111 112.749H97C97 88.0347 76.9653 68 52.2512 68H52C27.1472 68 7 88.1472 7 113H-7ZM-7 113C-7 80.4152 19.4152 54 52 54V68C27.1472 68 7 88.1472 7 113H-7ZM52.2512 54C84.6973 54 111 80.3027 111 112.749V113H97V112.749C97 88.0347 76.9653 68 52.2512 68V54Z" fill="black" />
                            </g>
                        </g>
                        <defs>
                            <clipPath id="clip0_41_27">
                                <rect width={104} height={39} fill="white" transform="translate(0 61)" />
                            </clipPath>
                        </defs>
                    </svg>
                </a>
            </div>

            <div className="navigation-card">
                <a href="#" className="tab">
                    <svg xmlns="http://www.w3.org/2000/svg" width={20} viewBox="0 0 20 20" height={20} fill="none" className="svg-icon"><g strokeWidth="1.5" strokeLinecap="round" stroke="#000000"><circle r="2.5" cy={10} cx={10} /><path fillRule="evenodd" d="m8.39079 2.80235c.53842-1.51424 2.67991-1.51424 3.21831-.00001.3392.95358 1.4284 1.40477 2.3425.97027 1.4514-.68995 2.9657.82427 2.2758 2.27575-.4345.91407.0166 2.00334.9702 2.34248 1.5143.53842 1.5143 2.67996 0 3.21836-.9536.3391-1.4047 1.4284-.9702 2.3425.6899 1.4514-.8244 2.9656-2.2758 2.2757-.9141-.4345-2.0033.0167-2.3425.9703-.5384 1.5142-2.67989 1.5142-3.21831 0-.33914-.9536-1.4284-1.4048-2.34247-.9703-1.45148.6899-2.96571-.8243-2.27575-2.2757.43449-.9141-.01669-2.0034-.97028-2.3425-1.51422-.5384-1.51422-2.67994.00001-3.21836.95358-.33914 1.40476-1.42841.97027-2.34248-.68996-1.45148.82427-2.9657 2.27575-2.27575.91407.4345 2.00333-.01669 2.34247-.97026z" clipRule="evenodd" /></g></svg>
                    <span className="lable"></span>
                </a>
            </div>

        </StyledWrapper>

    );
}

const StyledWrapper = styled.div`
    
    #bookmark[type="checkbox"] {
        position: absolute;
        opacity: 0;
        width: 0;
        height: 0;
    }

    .bookmark {
        overflow: hidden;
        position: absolute;
        //left: calc(50% - 24px);
        //top: calc(50% - 24px);
        width: 48px;
        height: 48px;
        display: block;
        border-radius: 50%;
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
    }
    .bookmark:before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.06);
        border-radius: 50%;
        transform: scale(0.5);
        opacity: 0;
        transition: all 0.2s ease;
    }
    .bookmark:hover:before {
        transform: scale(1);
        opacity: 1;
    }
    .bookmark:active:before {
        transform: scale(0.8);
        transition: all 0.3s ease;
    }
    .bookmark .bookmark-icon {
        margin: 12px;
    }
    .bookmark .bookmark-icon path {
        stroke: black;
        fill: rgba(0, 0, 0, 0);
    }

    #bookmark:checked + .bookmark .bookmark-icon {
        animation: booking 0.3s linear forwards;
    }
    #bookmark:checked + .bookmark .bookmark-icon path {
        fill: black;
        transition: all 0.3s ease;
        transition-delay: 0.1s;
    }

    .bookmark .shimmer {
        position: absolute;
        inset: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        transform: skew(-13deg) translateX(-110%);
        background: rgba(255, 255, 255, 0.3);
        z-index: 0;
        transition: transform 1s ease;
    }
    .bookmark:hover .shimmer {
        transform: skew(-13deg) translateX(110%);
    }

    @keyframes booking {
        0% {
            transform: rotateY(0) translateY(0) scale(1);
        }
        50% {
            transform: rotateY(90deg) translateY(-16px) scale(1.1);
        }
        100% {
            transform: rotateY(180deg) translateY(0) scale(1.2);
        }
    }

    .container {
        position: relative;
        box-sizing: border-box;
        width: fit-content;
    }

    .mainbox {
        box-sizing: border-box;
        position: relative;
        width: 230px;
        height: 50px;
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
        justify-content: center;
        border-radius: 160px;
        background-color: rgb(0, 0, 0);
        transition: all 0.3s ease;
    }

    .checkbox:focus {
        border: none;
        outline: none;
    }

    .checkbox:checked {
        right: 10px;
    }

    .checkbox:checked ~ .mainbox {
        width: 50px;
    }

    .checkbox:checked ~ .mainbox .search_input {
        width: 0;
        height: 0px;
    }

    .checkbox:checked ~ .mainbox .iconContainer {
        padding-right: 8px;
    }

    .navigation-card {
        margin: 50px;
        padding: 0;
        width: fit-content;
        height: fit-content;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 30px;
        background-color: rgb(255, 255, 255);
        //padding: 10px 10px;
        border-radius: 0;
        position: relative;
        rotate: 90deg;
    }
    .tab {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50px;
        height: 50px;
        overflow: hidden;
        background-color: rgb(252, 252, 252);
        padding: 15px;
        border-radius: 50%;
        cursor: pointer;
        text-decoration: none;
        transition: all 0.3s;
    }
    .tab:hover {
        background-color: rgb(223, 223, 223);
    }

    /* Responsive: Ẩn bớt các mục khi màn hình nhỏ hoặc zoom lớn */

    @media (max-width: 1000px) {
        .navigation-card:nth-child(n+7) { /* Ẩn từ mục thứ 5 trở đi */
            display: none;
        }
        gap: 15px; /* Giảm khoảng cách khi màn hình nhỏ */
    }

    @media (max-width: 900px) {
        .navigation-card:nth-child(n+6) { /* Ẩn từ mục thứ 5 trở đi */
            display: none;
        }
        gap: 15px; /* Giảm khoảng cách khi màn hình nhỏ */
    }


    @media (max-width: 800px) {
        .navigation-card:nth-child(n+5) { /* Ẩn từ mục thứ 5 trở đi */
            display: none;
        }
        gap: 15px; /* Giảm khoảng cách khi màn hình nhỏ */
    }

    @media (max-width: 600px) {
        .navigation-card:nth-child(n+4) { /* Ẩn từ mục thứ 4 trở đi */
            display: none;
        }
        gap: 10px; /* Giảm thêm khoảng cách */
    }

    @media (max-width: 500px) {
        .navigation-card:nth-child(n+3) { /* Ẩn từ mục thứ 3 trở đi */
            display: none;
        }
        gap: 5px; /* Giảm tối đa khoảng cách */
    }

    @media (max-width: 400px) {
        .navigation-card:nth-child(n+2) { /* Ẩn từ mục thứ 3 trở đi */
            display: none;
        }
        gap: 0px; /* Giảm tối đa khoảng cách */
    }
    
    .search-bar {
        position: absolute;
        right: 0;
        width: 0;
        height: 30px;
        padding: 5px;
        border: 1px solid #ccc;
        border-radius: 5px;
        transition: width 0.3s ease, right 0.3s ease;
    }

    .navigation-card:hover .search-bar {
        width: 200px;
        right: -200px;
    }
`;

export default Card;
