import { Tooltip } from "@mui/material";

interface TooltipComponentProps {
  title: string;
  children: React.ReactElement;
}

export const TooltipComponent = ({
  children,
  title
}: TooltipComponentProps) => (
  <Tooltip placement="top" arrow enterDelay={0} leaveDelay={0} title={title}>
    {children}
  </Tooltip>
);
