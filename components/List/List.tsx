import React from 'react';

interface Props extends React.ComponentProps<"ul"> {
  data: any[];
  innerRef?: React.RefObject<HTMLUListElement>;
  iterator: (item: any) => React.ReactNode;
}

function List(props: Props) {
  const {
    data,
    iterator,
    innerRef,
    ...rest
  } = props;
  return (
    <ul
      ref={innerRef}
      {...rest}
    >
      {data.map((item, index) => (
        <React.Fragment key={index}>
          {iterator(item)}
        </React.Fragment>
      ))}
    </ul>
  );
}

export default List;
