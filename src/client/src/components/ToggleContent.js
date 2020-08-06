import React, { useState, Fragment } from 'react';

function ToggleContent ({ toggle, content }) {
  const [isShown, setIsShown] = useState(false);
  const show = () => setIsShown(true);
  const hide = () => setIsShown(false);

  return (
    <Fragment>
      {toggle(show)}
      {isShown && content(hide)}
    </Fragment>
  );
};

export default ToggleContent;