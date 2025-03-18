import PropTypes from "prop-types";
import React from "react";
import { useReducer } from "react";

export const Toggle = ({ property1, className }) => {
    const [state, dispatch] = useReducer(reducer, {
        property1: property1 || "default",
    });

    return (
        <div
            className={`w-[35px] h-[19px] rounded-[11px] ${state.property1 === "variant-2" ? "bg-[#6b6bf9]" : "bg-[#999999]"} ${className}`}
            onClick={() => {
                dispatch("click");
            }}
        >
            <div
                className={`w-4 top-0.5 h-4 rounded-xl bg-white relative ${state.property1 === "variant-2" ? "left-[18px]" : "left-0.5"}`}
            />
        </div>
    );
};

function reducer(state, action) {
    if (state.property1 === "default") {
        switch (action) {
            case "click":
                return {
                    property1: "variant-2",
                };
            default:
                break;
        }
    }

    if (state.property1 === "variant-2") {
        switch (action) {
            case "click":
                return {
                    property1: "default",
                };
        }
    }

    return state;
}

Toggle.propTypes = {
    property1: PropTypes.oneOf(["variant-2", "default"]),
};
