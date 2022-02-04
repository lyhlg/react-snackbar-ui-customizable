import React, { useState } from "react";
import styled from "styled-components";
import useSnackbar from "../../hooks/snackbar/useSnackbar";
import { SnackbarProps } from "../Snackbar";

type Type = "SUCCESS" | "WARN" | "ERROR" | "INFO";

const Example = () => {
  const snackbar = useSnackbar<SnackbarProps>();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState<Type>("SUCCESS");
  const [buttonText, setButtonText] = useState("");

  const onClickButton = () => alert("hello world");

  return (
    <StyledContainer>
      <h2>Snackbar Property Set</h2>
      <form>
        <StyledInputWrappper>
          <label>
            <h4>title:</h4>
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
          </label>
        </StyledInputWrappper>
        <StyledInputWrappper>
          <label>
            <h4>message:</h4>
            <input
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </label>
        </StyledInputWrappper>
        <StyledRadioWrappper>
          <h4>type</h4>
          <StyledInline>
            {["SUCCESS", "WARN", "ERROR", "INFO"].map((snackbarType) => (
              <label key={snackbarType}>
                <input
                  type="radio"
                  value={snackbarType}
                  checked={type === snackbarType}
                  onChange={(e) => {
                    setType(e.target.value as Type);
                  }}
                />
                {snackbarType}
              </label>
            ))}
          </StyledInline>
        </StyledRadioWrappper>

        <StyledInputWrappper>
          <label>
            <h4>buttonText:</h4>
            <input
              value={buttonText}
              onChange={(e) => setButtonText(e.target.value)}
            />
          </label>
        </StyledInputWrappper>

        <button
          type="submit"
          disabled={!message}
          onClick={(e) => {
            e.preventDefault();
            snackbar?.on({ title, message, type, buttonText, onClickButton });
          }}
        >
          SHOW SNACKBAR
        </button>
      </form>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  padding: 10px 50px;
`;

const StyledInputWrappper = styled.div`
  margin-bottom: 20px;
  label {
    display: flex;
    align-items: center;
  }
  h4 {
    margin: 0;
    flex-basis: 100px;
  }
`;
const StyledRadioWrappper = styled.div`
  display: flex;
  margin-bottom: 20px;

  h4 {
    margin: 0;
    flex-basis: 100px;
  }
`;

const StyledInline = styled.div`
  display: flex;
  label {
    margin-right: 10px;
  }
`;

export default Example;
