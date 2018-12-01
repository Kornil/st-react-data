const Months: string[] = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

interface DataInterface {
  date: Date;
  gbps: number;
}

type formatTimeType = (date: number) => string;

export const formatTime: formatTimeType = date =>
  `${new Date(date).getDate()}. ${Months[new Date(date).getMonth()]}`;

type formatDataType = (data: number[][]) => DataInterface[];

export const formatData: formatDataType = data => {
  const result = [];
  for (let i = 0; i < data.length; i += 1) {
    const newData = {
      date: new Date(data[i][0]),
      gbps: data[i][1]
    };
    result[i] = newData;
  }
  return result;
};

type formatBytesType = (bytes: number) => string;

export const formatBytes: formatBytesType = bytes =>
  `${(bytes / 1073741824).toFixed(1)}\nGbps`;

type findRightDataType = (
  date: Date,
  cdn: DataInterface[],
  p2p: DataInterface[]
) => {
  cdn: DataInterface | undefined;
  p2p: DataInterface | undefined;
};

export const findRightData: findRightDataType = (date, cdn, p2p) => {
  const cdnValue = cdn.find((value: DataInterface) => value.date.getTime() === date.getTime());
  const p2pValue = p2p.find((value: DataInterface) => value.date.getTime() === date.getTime());
  return {
    cdn: cdnValue,
    p2p: p2pValue
  }
};

type getPercentageType = (value1: number, value2: number) => string;

export const getPercentage: getPercentageType = (value1, value2) => {
  const decreaseValue = value1 - value2;
  const result = (decreaseValue / value1) * 100
  return isNaN(result) ? "0.00" : result.toFixed(2);
}
