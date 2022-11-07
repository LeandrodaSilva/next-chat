import React from 'react';

interface Props extends React.SVGProps<SVGSVGElement> {
  children?: React.ReactNode;
}

function StopIcon(props: Props) {
  const { children, ...rest } = props;
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...rest}
    >
      <path fill="currentColor" d="M18,18H6V6H18V18Z" />
    </svg>
  );
}

export default StopIcon;
