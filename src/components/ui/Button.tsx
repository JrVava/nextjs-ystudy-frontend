import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

const variantClass = {
  orange: "btn-orange",
  blue: "btn-blue",
  white: "btn-white",
  black: "btn-black",
  ghost: "btn-ghost",
  outline: "btn-outline",
  dark: "btn-dark",
} as const;

const sizeClass = {
  sm: "btn-sm",
  md: "",
  lg: "btn-lg",
} as const;

type ButtonVariant = keyof typeof variantClass;
type ButtonSize = keyof typeof sizeClass;

type BaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

type ButtonAsButton = BaseProps &
  ComponentPropsWithoutRef<"button"> & { href?: undefined };

type ButtonAsLink = BaseProps &
  ComponentPropsWithoutRef<typeof Link> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({
  variant = "blue",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  const classes = cn("btn", variantClass[variant], sizeClass[size], className);

  if ("href" in props && props.href) {
    const { href, ...linkProps } = props;
    return <Link href={href} className={classes} {...linkProps} />;
  }

  const { type = "button", ...buttonProps } = props as ButtonAsButton;
  return <button type={type} className={classes} {...buttonProps} />;
}
