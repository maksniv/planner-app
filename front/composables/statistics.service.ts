export interface IStatisticsResponse {
  statisticsQuantity: {
    label: String[];
    value: Number[];
  };
  statisticsWeekly: {
    label: String[];
    value: Number[];
  };
}

const BASE_URL = '/user/statistics';

const getStatistics = async () => {
  const { $AxiosWithAuth } = useNuxtApp();

  const response = await $AxiosWithAuth.get<IStatisticsResponse>(BASE_URL);
  return response.data;
};

export { getStatistics };
