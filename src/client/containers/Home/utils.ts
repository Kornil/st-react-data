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

interface BandwidthDataInterface {
  date: Date;
  gbps: number;
}

interface AudienceDataInterface {
  date: Date;
  audience: number;
}

type formatTimeType = (date: number) => string;

export const formatTime: formatTimeType = date =>
  `${new Date(date).getDate()}. ${Months[new Date(date).getMonth()]}`;

type formatBandwidthDataType = (data: number[][]) => BandwidthDataInterface[];

export const formatBandwidthData: formatBandwidthDataType = data => {
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

type formatAudienceDataType = (data: number[][]) => AudienceDataInterface[];

export const formatAudienceData: formatAudienceDataType = data => {
  const result = [];
  for (let i = 0; i < data.length; i += 1) {
    const newData = {
      audience: data[i][1],
      date: new Date(data[i][0])
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
  cdn: BandwidthDataInterface[],
  p2p: BandwidthDataInterface[]
) => {
  cdn: BandwidthDataInterface | undefined;
  p2p: BandwidthDataInterface | undefined;
};

export const findRightData: findRightDataType = (date, cdn, p2p) => {
  const cdnValue = cdn.find(
    (value: BandwidthDataInterface) => value.date.getTime() === date.getTime()
  );
  const p2pValue = p2p.find(
    (value: BandwidthDataInterface) => value.date.getTime() === date.getTime()
  );
  return {
    cdn: cdnValue,
    p2p: p2pValue
  };
};

type getPercentageType = (value1: number, value2: number) => string;

export const getPercentage: getPercentageType = (value1, value2) => {
  const decreaseValue = value1 - value2;
  const result = (decreaseValue / value1) * 100;
  return isNaN(result) ? "0.00" : result.toFixed(2);
};
