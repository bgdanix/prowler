"use client";

import { Icon } from "@iconify/react";
import { Input } from "@nextui-org/react";
import React, { useState } from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";

import { FormControl, FormField, FormMessage } from "@/components/ui/form";

interface CustomInputProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  labelPlacement?: "inside" | "outside";
  variant?: "flat" | "bordered" | "underlined" | "faded";
  size?: "sm" | "md" | "lg";
  type?: string;
  placeholder?: string;
  password?: boolean;
  confirmPassword?: boolean;
  defaultValue?: string;
  isReadOnly?: boolean;
  isRequired?: boolean;
  isInvalid?: boolean;
  isDisabled?: boolean;
  showFormMessage?: boolean;
}

export const CustomInput = <T extends FieldValues>({
  control,
  name,
  type = "text",
  label = name,
  labelPlacement = "inside",
  placeholder,
  variant = "bordered",
  size = "md",
  confirmPassword = false,
  password = false,
  defaultValue,
  isReadOnly = false,
  isRequired = true,
  isInvalid,
  isDisabled = false,
  showFormMessage = true,
}: CustomInputProps<T>) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const inputLabel = confirmPassword
    ? "Confirm Password"
    : password
      ? "Password"
      : label;

  const inputPlaceholder = confirmPassword
    ? "Confirm Password"
    : password
      ? "Password"
      : placeholder;

  const inputType =
    password || confirmPassword
      ? isPasswordVisible || isConfirmPasswordVisible
        ? "text"
        : "password"
      : type;
  const inputIsRequired = password || confirmPassword ? true : isRequired;

  const toggleVisibility = () => {
    if (password) {
      setIsPasswordVisible(!isPasswordVisible);
    } else if (confirmPassword) {
      setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
    }
  };

  const endContent = (password || confirmPassword) && (
    <button type="button" onClick={toggleVisibility}>
      <Icon
        className="pointer-events-none text-2xl text-default-400"
        icon={
          (password && isPasswordVisible) ||
          (confirmPassword && isConfirmPasswordVisible)
            ? "solar:eye-closed-linear"
            : "solar:eye-bold"
        }
      />
    </button>
  );

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <>
          <FormControl>
            <Input
              id={name}
              classNames={{
                label:
                  "tracking-tight font-light !text-default-500 text-xs !z-0",
                input: "text-default-500 text-small",
              }}
              isRequired={inputIsRequired}
              label={inputLabel}
              labelPlacement={labelPlacement}
              placeholder={inputPlaceholder}
              type={inputType}
              variant={variant}
              size={size}
              isInvalid={isInvalid}
              defaultValue={defaultValue}
              endContent={endContent}
              isDisabled={isDisabled}
              isReadOnly={isReadOnly}
              {...field}
            />
          </FormControl>
          {showFormMessage && (
            <FormMessage className="max-w-full text-xs text-system-error dark:text-system-error" />
          )}
        </>
      )}
    />
  );
};
