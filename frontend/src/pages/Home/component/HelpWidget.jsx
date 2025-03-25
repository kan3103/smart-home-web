import React from "react";
import styled from "styled-components";
import theme from "../../../assets/images/home/theme.png";
import repair from "../../../assets/images/icon/repair.png";

const HelpWidget = () => (
    <StyledWrapper>
        <div className="help-container">
            <img className="theme-image" alt="Theme" src={theme} />
            <div className="text-content">
                <div className="help-text">Need help?</div>
                <p className="help-description">
                    Contact our highly trained<br />
                    personnel for help
                </p>
            </div>
            <div className="contact-button">Contact Host</div>
            <div className="repair-icon-container">
                <div className="repair-background" />
                <img className="repair-icon" alt="Repair tool" src={repair} />
            </div>
        </div>
    </StyledWrapper>
);

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  
  .help-container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 300px;
    padding: 20px;
    background-size: cover;
    text-align: center;
  }

  .theme-image {
    width: 100%;
    height: auto;
    border-radius: 12px;
  }

  .text-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
  }

  .help-text {
    font-family: 'Roboto-SemiBold', Helvetica;
    font-size: 22px;
    font-weight: bold;
    color: white;
  }

  .help-description {
    font-family: 'Roboto-Regular', Helvetica;
    font-size: 14px;
    color: white;
    opacity: 0.8;
    margin-top: 5px;
  }

  .contact-button {
    width: 80%;
    max-width: 200px;
    background: white;
    padding: 10px;
    border-radius: 8px;
    font-weight: bold;
    text-align: center;
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.12), 0px 4px 7px -1px rgba(0, 0, 0, 0.1);
    color: #252f40;
    cursor: pointer;
    margin-top: 15px;
  }

  .repair-icon-container {
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .repair-background {
    width: 38px;
    height: 38px;
    background: white;
    border-radius: 8px;
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.12), 0px 4px 6px -1px rgba(0, 0, 0, 0.1);
  }

  .repair-icon {
    width: 22px;
    height: 22px;
    position: absolute;
  }
`;

export default HelpWidget;
