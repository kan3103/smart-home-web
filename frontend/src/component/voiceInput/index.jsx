import React, {useState} from "react";
import useSpeechToText from '../../hooks/useSpeechToText';

const VoiceInput = () => {
    const [textInput, setTextInput] = useState("");
    const {isListening, transcript, startListening, stopListening} = useSpeechToText({continuous:true})
    const startStopListening =() => {
        isListening ? stopVoiceInput() : startListening()
    }
    const stopVoiceInput = () => {
        setTextInput(prevVal => prevVal + (transcript.length ? (prevVal.length ? " " : "") + transcript : ""))
        stopListening()
    }

    return (
        <div style={{display:"block", margin : "0 auto", width: "400px", tẽxtAlign: "center", marginTop: "200px"}}>
            <button
                onClick={()=> {
                    startStopListening()
                }}
                style={{
                  backgroundColor : isListening ? "#d62d20" :"#4CAF50",
                    color : "white",
                    padding : "10px 20px",
                    border : "none",
                    cursor : "pointer",
                    transition : "background-color 0.3s ease",
                    borderRadius : "5px"
                }}>
                {isListening? "Stop Listening" : "Speak"}
            </button>
            <textarea
                style={{
                    marginTop : "20px",
                    width : "100%",
                    height : "150px",
                    padding : "10px",
                    border : "1px solid #ccc",
                    borderRadius : "5px",
                    transition : "border 0.3s ease",
                    resize: "none",
                    backgroundColor : "#f8f8f8",
                    color: "#333"
            }}
                disabled={isListening}
                value = {isListening? textInput + (transcript.length ? (textInput.length ?  " " : "") + transcript : "") : textInput}
                onChange={(e) => setTextInput(e.target.value)}
            />
        </div>
    )
}

export default VoiceInput;