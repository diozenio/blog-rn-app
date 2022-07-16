import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import { TextInput as T, Title } from "react-native-paper";
import { useField } from "@unform/core";
import { TextInputProps as TP } from "react-native-paper/lib/typescript/components/TextInput/TextInput";
import styled from "styled-components/native";
import { Alert } from "react-native";

export interface TextInputProps extends Omit<TP, "theme"> {
  name: string;
}
interface InputValueReference {
  value: string;
}
interface InputRef {
  focus(): void;
}

const Input = React.forwardRef<InputRef, TextInputProps>(
  ({ name, label, ...rest }, ref) => {
    const { defaultValue, fieldName, registerField } = useField(name);
    const inputRef = useRef<InputValueReference>({ value: defaultValue });
    const inputElementRef = useRef<any>(null);
    useImperativeHandle(ref, () => ({
      focus() {
        inputElementRef.current.focus();
      },
    }));

    const [activeColor, setactiveColor] = useState("#1b1b29");


    useEffect(() => {
      registerField<string>({
        name: fieldName,
        ref: inputRef.current,
        path: "value",
        setValue(_, value) {
          inputRef.current.value = value;
          inputElementRef.current.setNativeProps({ text: value });
        },
        clearValue() {
          inputRef.current.value = "";
          inputElementRef.current.clear();
        },
      });
    }, [fieldName, registerField]);
    return (
      <>
        <LabelText>{label}</LabelText>
        <StyledInput
          ref={inputElementRef}
          underlineColor={"transparent"}
          activeUnderlineColor={"transparent"}
          defaultValue={defaultValue}
          onFocus={() => setactiveColor("#1e1e2d")}
          onBlur={() => setactiveColor("#1b1b29")}
          style={{ backgroundColor: activeColor }}
          onChangeText={(value) => {
            inputRef.current.value = value;
          }}
          selectTextOnFocus={true}
          selectionColor={"white"}
          autoComplete="off"
          {...rest}
        />
      </>
    );
  }
);

export const StyledInput = styled(T)`
  width: 100%;
  margin-bottom: 15px;
  border-radius: ${(props) => props.theme.roundness}px;
`;

export const LabelText = styled(Title)`
  font-size: 16px;
  color: ${(props) => props.theme.colors.onSurface};
`;

export default Input;
