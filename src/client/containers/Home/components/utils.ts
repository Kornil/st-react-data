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

type formatTimeType = (date: number) => string;

export const formatTime: formatTimeType = date =>
  `${new Date(date).getDate()}. ${Months[new Date(date).getMonth()]}`;

type formatDataType = (
  data: number[][]
) => Array<{
  date: Date;
  gbps: number;
}>;

export const formatData: formatDataType = (data: number[][]) => {
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
