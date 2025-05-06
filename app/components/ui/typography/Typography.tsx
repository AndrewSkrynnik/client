import { HTMLAttributes, JSX } from "react";

type TypographyVariant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";

interface TypographyProps extends HTMLAttributes<HTMLElement> {
  variant: TypographyVariant;
  children: React.ReactNode;
  className?: string;
}

export const Typography = ({
  variant,
  children,
  className = "",
  ...props
}: TypographyProps) => {
  const Tag = variant as keyof Pick<JSX.IntrinsicElements, TypographyVariant>;
  return (
    <Tag className={className} {...props}>
      {children}
    </Tag>
  );
};
