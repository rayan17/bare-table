import React from "react";
import { Column, Table, AutoSizer, InfiniteLoader} from "react-virtualized";
import Draggable from "react-draggable";

const TOTAL_WIDTH = 500;

export default function VirtualTable({list, loadData}){
  const [ widths, setWidths] = React.useState({
    name: 0.33,
    location: 0.33,
    description: 0.33,
    age: 0.33,
    status: 0.33
  });

  const headerRenderer = ({
    columnData,
    dataKey,
    disableSort,
    label,
    sortBy,
    sortDirection
  }) => {
    return (
      <React.Fragment key={dataKey}>
        <div className="ReactVirtualized__Table__headerTruncatedText">
          {label}
        </div>
        {/* <Draggable
          axis="x"
          defaultClassName="DragHandle"
          defaultClassNameDragging="DragHandleActive"
          onDrag={(event, { deltaX }) =>
            this.resizeRow({
              dataKey,
              deltaX
            })
          }
          position={{ x: 0 }}
          zIndex={999}
        >
          <span className="DragHandleIcon">⋮</span>
        </Draggable> */}
      </React.Fragment>
    );
  };

  const loadMoreRows = () => {
    loadData();
  }

  const resizeRow = ({ dataKey, deltaX }) =>
    setWidths((prevState) => {
      const prevWidths = prevState.widths;
      const percentDelta = deltaX / TOTAL_WIDTH;

      // This is me being lazy :)
      const nextDataKey = dataKey === "name" ? "location" : "description";

      return {
        widths: {
          ...prevWidths,
          [dataKey]: prevWidths[dataKey] + percentDelta,
          [nextDataKey]: prevWidths[nextDataKey] - percentDelta
        }
      };
    }
  );

  return (
    <div style={{ height: '90vh'}}>
      <InfiniteLoader
        isRowLoaded={({ index}) => !!list[index]}
        loadMoreRows={loadMoreRows}
        rowCount={10000}
      >
        {({onRowsRendered, registerChild}) => (
          <AutoSizer>
            {({ width, height }) => (
              <Table
                ref={registerChild}
                onRowsRendered={onRowsRendered}
                width={width}
                height={height}
                headerHeight={20}
                rowHeight={30}
                rowCount={list.length}
                rowGetter={({ index }) => list[index]}
              >
                <Column
                  headerRenderer={headerRenderer}
                  dataKey="name"
                  label="Name"
                  width={widths.name * width}
                />
                <Column
                  headerRenderer={headerRenderer}
                  dataKey="location"
                  label="Location"
                  width={widths.location * width}
                />
                <Column
                  dataKey="description"
                  label="Description"
                  width={widths.description * width}
                />
                <Column
                  dataKey="age"
                  label="Age"
                  width={widths.age * width}
                />
                <Column
                  dataKey="status"
                  label="Status"
                  width={widths.status * width}
                />
              </Table>
            )}
          </AutoSizer>
        )}
      </InfiniteLoader>
    </div>
  );
}
