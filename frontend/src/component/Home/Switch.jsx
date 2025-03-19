import React, { useId, useState } from "react";
import styled from "styled-components";

const Switch = () => {
    const uniqueId = useId();
    const [isOn, setIsOn] = useState(false);

    const toggleSwitch = () => setIsOn(!isOn);

    return (
        <StyledWrapper>
            <div>
                <input
                    type="checkbox"
                    id={`checkboxInput-${uniqueId}`}
                    checked={isOn}
                    onChange={toggleSwitch}
                />
                <label htmlFor={`checkboxInput-${uniqueId}`} className="toggleSwitch"></label>
            </div>
        </StyledWrapper>
    );
};

// CSS tạo switch đẹp và hoạt động mượt
const StyledWrapper = styled.div`
    /* Ẩn checkbox hoàn toàn */
    input[type="checkbox"] {
        display: none;
    }

    /* Thiết kế thanh switch */
    .toggleSwitch {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        width: 50px;
        height: 30px;
        background-color: rgb(82, 82, 82);
        border-radius: 20px;
        cursor: pointer;
        transition-duration: 0.3s;
    }



    .toggleSwitch::after {
        content: "";
        position: absolute;
        height: 10px;
        width: 10px;
        left: 5px;
        background-color: transparent;
        border-radius: 50%;
        transition-duration: .2s;
        box-shadow: 5px 2px 7px rgba(8, 8, 8, 0.26);
        border: 5px solid white;
    }




    /* Hiệu ứng khi bật */
    input[type="checkbox"]:checked + .toggleSwitch {
        background-color: rgb(148, 118, 255);
        transition-duration: .2s;
    }

    /* Nút tròn di chuyển khi bật */
    input[type="checkbox"]:checked + .toggleSwitch::after {
        transform: translateX(100%);
        transition-duration: .2s;
        background-color: white;
    }
`;

export default Switch;
