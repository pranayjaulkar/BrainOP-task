import OtpInput from "react-otp-input";
export default function OTPInput({ handleChange, code }) {
  return (
    <div>
      <OtpInput
        value={code}
        onChange={handleChange}
        numInputs={4}
        separator={<span style={{ width: "8px" }}></span>}
        isInputNum={true}
        shouldAutoFocus={true}
        inputStyle={{
          border: "1px solid transparent",
          borderRadius: "8px",
          width: "54px",
          height: "54px",
          fontSize: "12px",
          color: "#000",
          fontWeight: "400",
          caretColor: "blue",
        }}
        focusStyle={{
          border: "1px solid #CFD3DB",
          outline: "none",
        }}
      />
    </div>
  );
}
