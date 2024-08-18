import React, { useEffect, useRef, useState } from "react";

function Otp({ size = 4 }) {
  const [otpInputs, setOtpInputs] = useState(new Array(size).fill(""));
  const [seconds, setSeconds] = useState(30);
  const timer = useRef(null);

  //let ref be an array
  const otpRefs = useRef([]);

  useEffect(() => {
    if (timer.current == null) {
      timer.current = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    }
  }, []);

  useEffect(() => {
    otpRefs.current[0].focus();
  }, []);

  function handleChange(e, index) {
    let value = e.target.value;
    // only 1,2,3 and empty strings " " are numbers
    if (isNaN(value)) return;

    //get the latest value entered
    value = value[value.length - 1];

    // always copy array/object by creating new one by spreading
    let newOtpInputs = [...otpInputs];

    newOtpInputs[index] = value;
    setOtpInputs(newOtpInputs);

    if (index < size - 1 && value) {
      otpRefs.current[index + 1].focus();
    }
  }

  function handleBackChange(e, index) {
    if (e.key == "Backspace") {
      if (otpRefs.current[index].value) {
        otpRefs.current[index].focus();
      } else if (index > 0) {
        otpRefs.current[index - 1].focus();
      }
    }
  }

  return (
    <div>
      {otpInputs.map((value, index) => {
        return (
          <input
            //important code
            ref={(input) => (otpRefs.current[index] = input)}
            type="text"
            key={index}
            value={value}
            className="otpInput"
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleBackChange(e, index)}
          />
        );
      })}
      {/* Resend otp code */}
      <div className="timer">
        {seconds > 0 ? (
          <>Resend OTP in : {seconds} seconds</>
        ) : (
          <>
            <button
              onClick={(e) => {
                setSeconds(30);
                setOtpInputs(new Array(size).fill(""));
              }}
            >
              Resend OTP{" "}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Otp;
