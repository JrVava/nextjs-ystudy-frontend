import * as React from 'react';

const sec5: any = {};

export const Test = () => {
  return (
    <div>
      {sec5.status !== false && (
        <section>
          <div>
            {/* sec5.tiles?.filter((tile: any) => tile.value || tile.label).map((tile: any, idx: number) => {
              return <span key={idx}></span>;
            }) */}
            <div>Open full calculator</div>
          </div>
        </section>
      )}
    </div>
  );
};
