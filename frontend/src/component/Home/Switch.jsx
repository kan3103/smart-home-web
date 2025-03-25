import React, { useId, useState,useEffect } from "react";
import styled from "styled-components";

const Switch = ({ status, onToggle }) => {
    const uniqueId = useId();
    const [isOn, setIsOn] = useState(status);

    useEffect(() => {
        setIsOn(status); // Cập nhật khi `status` thay đổi
    }, [status]);

    const toggleSwitch = () => {
        setIsOn(!isOn);
        onToggle(); // Gọi hàm cập nhật trong `DeviceControl`
    };

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

const StyledWrapper = styled.div`
    input[type="checkbox"] {
        display: none;
    }

    .toggleSwitch {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        width: 40px;
        height: 25px;
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

    input[type="checkbox"]:checked + .toggleSwitch {
        background-color: rgb(148, 118, 255);
        transition-duration: .2s;
    }

    input[type="checkbox"]:checked + .toggleSwitch::after {
        transform: translateX(200%);
        transition-duration: .2s;
        background-color: white;
    }
`;

export default Switch;
