import React from 'react';

interface Props extends React.SVGProps<SVGSVGElement> {
  children?: React.ReactNode;
}

function SendIcon(props: Props) {
  const { children, ...rest } = props;
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...rest}
    >
      <path fill="currentColor" d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
    </svg>
  );
}

export default SendIcon;
