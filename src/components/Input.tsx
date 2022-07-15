import React, { useRef, useEffect, useCallback } from "react";
import { TextInputProps } from "react-native";
import { useField } from "@unform/core";
import styled from "styled-components/native";
import { TextInput as T } from "react-native-paper";

interface InputProps extends TextInputProps {
  name: string;
  label: string;
}

interface InputReference extends TextInput {
  value: string;
}

export default function Input(
  { name, label, onChangeText, ...rest }: InputProps,
  props: any
) {
  const inputRef = useRef<InputReference>(null);

  const { fieldName, registerField, defaultValue = "", error } = useField(name);

  useEffect(() => {
    if (inputRef.current) inputRef.current.value = defaultValue;
  }, [defaultValue]);

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputRef.current,
      getValue() {
        if (inputRef.current) return inputRef.current.value;

        return "";
      },
      setValue(ref, value) {
        if (inputRef.current) {
          inputRef.current.setNativeProps({ text: value });
          inputRef.current.value = value;
        }
      },
      clearValue() {
        if (inputRef.current) {
          inputRef.current.setNativeProps({ text: "" });
          inputRef.current.value = "";
        }
      },
    });
  }, [fieldName, registerField]);

  const handleChangeText = useCallback(
    (value: string) => {
      if (inputRef.current) inputRef.current.value = value;

      if (onChangeText) onChangeText(value);
    },
    [onChangeText]
  );

  return (
    <>
      <StyledInput
        label={label}
        ref={inputRef}
        onChangeText={handleChangeText}
        defaultValue={defaultValue}
        {...rest}
      />
    </>
  );
}

export const StyledInput = styled(T)`
  margin-bottom: 15px;
  padding: 5px;
  font-size: 16px;
  border-radius: ${(props) => props.theme.roundness}px;
`;
