"use client";

import { cn } from "@/utils";
import { Eye, EyeClosed } from "lucide-react";
import { ComponentProps, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const inputSizes = ["sm", "md", "lg"] as const;

interface CustomInputBase
  extends Omit<ComponentProps<"input">, "size, onChange"> {
  label?: string;
  inputSize?: (typeof inputSizes)[number];
  placeholder?: string;
  labelStyle?: ComponentProps<"label">;
  inputStyle?: Pick<ComponentProps<"input">, "className">;
  icon?: React.ReactNode;
  iconPosition?: "start" | "end";
}

export const CustomInputBase = (props: CustomInputBase) => {
  const {
    inputSize = "md",
    label,
    placeholder,
    labelStyle = {},
    inputStyle = {},
    icon,
    iconPosition = "end",
    className: classNameInputWrapper,
    onChange,
    type,
    ...otherProps
  } = props;

  const { className: classNameLabel, ...otherPropsLabelStyle } = labelStyle;
  const { className: classNameInput } = inputStyle;

  return (
    <div className={"h-screen flex justify-center items-center"}>
      <div className="flex flex-col">
        {label && (
          <label
            className={cn("pl-1 text-sm font-medium", classNameLabel)}
            {...otherPropsLabelStyle}
          >
            {label}
          </label>
        )}
        <div
          className={cn(
            "min-h-9 max-h-9 px-3 gap-1 border-theme-gray-300 border rounded-md flex items-center justify-between w-full",
            inputSize === "sm" && "",
            inputSize === "lg" && "min-h-11 max-h-11",
            classNameInputWrapper
          )}
          {...otherProps}
        >
          {iconPosition === "start" && icon && icon}
          <input
            placeholder={placeholder}
            className={cn("outline-none placeholder:text-sm", classNameInput)}
            type={type}
            onChange={onChange}
          />
          {iconPosition === "end" && icon && icon}
        </div>
      </div>
    </div>
  );
};

export const CustomInputPassword = (props: Omit<CustomInputBase, "type">) => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [inputType, setInputType] = useState<"text" | "password">("password");

  return (
    <CustomInputBase
      {...props}
      type={inputType}
      icon={
        isShowPassword ? (
          <Eye
            size={20}
            onClick={() => {
              setIsShowPassword((prevValue) => !prevValue);
              setInputType(() => "password");
            }}
          />
        ) : (
          <EyeClosed
            size={20}
            onClick={() => {
              setIsShowPassword((prevValue) => !prevValue);
              setInputType(() => "text");
            }}
          />
        )
      }
    />
  );
};
