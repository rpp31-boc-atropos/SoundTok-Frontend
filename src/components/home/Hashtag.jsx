import * as React from 'react';
import Linkify from 'linkify-react';
import 'linkify-plugin-hashtag';

export const Hashtag = (props) => {
  const linkifyOptions = {
    formatHref: {
      hashtag: (href) => 'https://soundtok.live/#/hashtag?q=' + href.substr(1),
    },
  };

  const content = props.text;

  return (
    <Linkify tagName="p" options={linkifyOptions}>
      {content}
    </Linkify>
  );
};
