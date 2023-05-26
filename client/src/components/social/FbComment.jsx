import React from 'react';

const FbComment = () => {
  return (
    <div
      class="fb-comments"
      data-href={window.location.href}
      data-width=""
      data-numposts="5"
    ></div>
  );
};

export default FbComment;
