'use client';

import { cn } from '@/utils';
import { CircleAlert, CircleHelp, Eye, EyeClosed } from 'lucide-react';
import { ComponentProps, useState } from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import { Label } from '@radix-ui/react-form';

const inputSizes = ['sm', 'md', 'lg'] as const;

interface CustomInputBase
  extends Omit<ComponentProps<'input'>, 'size, onChange'> {
  label?: string;
  inputSize?: (typeof inputSizes)[number];
  labelStyle?: ComponentProps<'label'>;
  inputStyle?: Pick<ComponentProps<'input'>, 'className'>;
  icon?: React.ReactNode;
  iconPosition?: 'start' | 'end';
  isError?: boolean;
  errorMessage?: string;
  isShowLabelHelpTooltip?: boolean;
  isShowErrorHelpTooltip?: boolean;
  width?: number;
}

export const CustomInputBase = (props: CustomInputBase) => {
  const {
    inputSize = 'lg',
    label,
    labelStyle = {},
    icon,
    iconPosition = 'end',
    className: classNameInput,
    onChange,
    isError,
    errorMessage,
    width,
    type,
    isShowLabelHelpTooltip = false,
    isShowErrorHelpTooltip,
    ...otherProps
  } = props;

  const { className: classNameLabel, ...otherPropsLabelStyle } = labelStyle;

  const ToolTipInput = (props: {
    message: string;
    type: 'information' | 'error';
  }) => {
    const { message, type } = props;

    return (
      <Tooltip.Provider>
        <Tooltip.Root>
          <Tooltip.Trigger className="cursor-help" asChild>
            {type === 'information' ? (
              <CircleHelp className="text-gray-500" size={14} />
            ) : (
              <CircleAlert className="text-red-600" size={14} />
            )}
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content
              style={{
                maxWidth: width,
              }}
              className="text-[0.7rem] break-words bg-[#e7c8c1] p-1 rounded-md"
              sideOffset={5}
            >
              {message}
              <Tooltip.Arrow className="TooltipArrow" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    );
  };

  return (
    <div className={'h-screen flex justify-center items-center'}>
      <div style={{ width }} className={cn('w-full')}>
        {label && (
          <div className="flex items-center gap-1">
            <label
              className={cn(
                'block pl-2 text-sm font-medium max-w-[calc(100%-30px)] overflow-hidden text-ellipsis whitespace-normal',
                classNameLabel
              )}
              {...otherPropsLabelStyle}
            >
              {label}
            </label>
            {isShowLabelHelpTooltip && (
              <ToolTipInput message={label} type="information" />
            )}
          </div>
        )}
        <div className="w-auto flex items-center">
          {iconPosition === 'start' && icon && (
            <div
              className={cn(
                'border-theme-gray-300 bg-white border border-r-0 flex items-center min-h-9 max-h-9 px-2 rounded-l-md',
                inputSize === 'sm' && '',
                inputSize === 'lg' && 'min-h-11 max-h-11'
              )}
            >
              {icon}
            </div>
          )}
          <input
            className={cn(
              'min-h-9 max-h-9 px-3 gap-1 border-theme-gray-300 border   rounded-md flex items-center justify-between w-full outline-none placeholder:text-sm  text-sm',
              inputSize === 'sm' && '',
              inputSize === 'lg' && 'min-h-11 max-h-11',
              icon &&
                iconPosition === 'end' &&
                'rounded-r-none border-r-transparent pr-0 border-r-0',
              icon &&
                iconPosition === 'start' &&
                'rounded-l-none border-l-transparent pl-0 border-l-0',
              classNameInput
            )}
            type={type}
            onChange={onChange}
            onFocus={(e) => console.log(e)}
            {...otherProps}
          />
          {iconPosition === 'end' && icon && (
            <div
              className={cn(
                'border-theme-gray-300 bg-white border border-l-0 flex items-center  min-h-9 max-h-9 px-2 rounded-r-md',
                inputSize === 'sm' && '',
                inputSize === 'lg' && 'min-h-11 max-h-11'
              )}
            >
              {icon}
            </div>
          )}
        </div>
        {isError && errorMessage && (
          <div className="flex items-center gap-1">
            <span
              className={cn(
                'block text-[0.8rem] text-red-600 pl-2 whitespace-nowrap overflow-hidden text-ellipsis max-w-[calc(100%-30px)]'
              )}
            >
              {errorMessage}
            </span>

            {isShowErrorHelpTooltip && (
              <ToolTipInput message={errorMessage} type="error" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

CustomInputBase.Password = (props: Omit<CustomInputBase, 'type'>) => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [inputType, setInputType] = useState<'text' | 'password'>('password');

  const handleClick = () => {
    setIsShowPassword((prevValue) => !prevValue);
    setInputType((prevValue) =>
      prevValue === 'password' ? 'text' : 'password'
    );
  };

  return (
    <CustomInputBase
      {...props}
      type={inputType}
      icon={
        isShowPassword ? (
          <Eye size={20} onClick={handleClick} />
        ) : (
          <EyeClosed size={20} onClick={handleClick} />
        )
      }
    />
  );
};
