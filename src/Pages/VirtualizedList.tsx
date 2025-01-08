import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

const VirtualizedList = () => {
  const Row = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => (
    <div
      className={`${
        index % 2
          ? "dark:bg-slate-700 bg-slate-200"
          : "dark:bg-slate-800 bg-slate-300"
      } px-4 py-2`}
      style={style}
    >
      Row {(index + 1).toLocaleString()}
    </div>
  );

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold">Virtualized List 1 แสนรายการ</h1>
      <div className="flex items-center justify-center">
        <AutoSizer style={{ height: "80vh", width: "100%" }}>
          {({ height, width }) => (
            <List
              height={height}
              itemCount={100000}
              itemSize={35}
              width={width}
              className="rounded-lg"
            >
              {Row}
            </List>
          )}
        </AutoSizer>
      </div>
    </div>
  );
};

export default VirtualizedList;
