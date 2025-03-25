import React from 'react';
import styled from 'styled-components';

const Button = ({type}) => {
    return (
        <StyledWrapper>
            <button>
                {type === "Locked" ? "Locked" : "Unlock"}
            </button>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  button {
    position: relative;
    display: inline-block;
    margin: 15px;
    padding: 15px 30px;
    text-align: center;
    font-size: 18px;
    letter-spacing: 1px;
    text-decoration: none;
    color: #725AC1;
    background: transparent;
    cursor: pointer;
    transition: ease-out 0.5s;
    border: 2px solid #725AC1;
    border-radius: 10px;
    box-shadow: inset 0 0 0 0 #725AC1;
  }

  button:hover {
    color: white;
    box-shadow: inset 0 -100px 0 0 #725AC1;
  }

  button:active {
    transform: scale(0.9);
  }`;

export default Button;
