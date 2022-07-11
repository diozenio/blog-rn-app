import React, { useRef, useEffect, useCallback } from "react";
import { TextInput, TextInputProps, Text } from "react-native";
import { useField } from "@unform/core";
import styled from "styled-components/native";

interface InputProps extends TextInputProps {
  name: string;
  label: string;
}

interface InputReference extends TextInput {
  value: string;
}

export default function Input({
  name,
  label,
  onChangeText,
  ...rest
}: InputProps) {
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
      {label && <LabelText>{label}</LabelText>}

      <StyledInput
        ref={inputRef}
        onChangeText={handleChangeText}
        defaultValue={defaultValue}
        {...rest}
      />
    </>
  );
}

export const StyledInput = styled.TextInput`
  width: 100%;
  margin-bottom: 15px;
  padding: ${(props) => props.theme.spacing.p1};
  color: ${(props) => props.theme.colors.info};
  font-size: ${(props) => props.theme.fontSize.h3};
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: ${(props) => props.theme.borderRadius};
`;

export const LabelText = styled.Text`
  color: ${(props) => props.theme.colors.info};
  font-size: ${(props) => props.theme.fontSize.h3};
  font-weight: bold;
  margin-vertical: 15px;
`;
