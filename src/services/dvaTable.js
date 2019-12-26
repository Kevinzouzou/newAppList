import request from '@/utils/request';

export async function getTableDatas() {
  return request('/api/tableDatas');
}
