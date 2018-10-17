import React, { PureComponent } from "react";
import ReactDOM from "react-dom";

import { Sticky, StickyContainer } from "../../src";
import { Header } from "../header";

let renderCount = 0;
export class Footer extends PureComponent {
  render() {
    return (
      <div>
        <StickyContainer style={{ position: 'relative', height: 2000, background: 'green' }}>
          <Sticky bottomAnchor>
            {({ style }) => (
              <Header style={style} renderCount={renderCount++} />
            )}
          </Sticky>

          <h2 className="text-center">{"<StickyContainer />"}</h2>
        </StickyContainer>
        <div
          className="gap tall"
          style={{ background: "linear-gradient(#ddd, #fff)" }}
        >
          <h2>Content after the Sticky...</h2>
        </div>
      </div>
    );
  }
}
