import React, { PureComponent } from "react";
import ReactDOM from "react-dom";

import { Sticky, StickyContainer } from "../src";
import { Header } from "./header";

let renderCount = 0;
export class Aside extends PureComponent {
  render() {
    return (
      <div>
        <div style={{ backgroundColor: 'cornflowerblue', height: 300, color: 'white', textAlign: 'center' }}>
          <h2>Container 1</h2>
        </div>
        <StickyContainer className="container" style={{ height: 2000 }}>
          <div className='row'>
            <div className='col col-sm-8'>
              <div
                style={{
                  textAlign: 'center',
                  backgroundColor: 'lightblue',
                  width: '100%',
                  height: '100%'
                }}
              >
                <h2>Hello world</h2>
              </div>
            </div>
            <div className='col col-sm-4'>
              <Sticky mobileStyle={{ width: 768, prop: 'bottomAnchor' }}>
                {({ style }) => (
                  <Header style={style} renderCount={renderCount++} />
                )}
              </Sticky>
            </div>
          </div>
        </StickyContainer>
        <div style={{ backgroundColor: 'mediumpurple', height: 1000, color: 'white', textAlign: 'center' }}>
          <h2>Container 2</h2>
        </div>
      </div>
    );
  }
}
