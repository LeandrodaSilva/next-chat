import React from 'react';

interface Props extends React.SVGProps<SVGSVGElement> {
  children?: React.ReactNode;
}

function PlayIcon(props: Props) {
  const { children, ...rest } = props;
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...rest}
    >
      <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
    </svg>
  );
}

export default PlayIcon;
