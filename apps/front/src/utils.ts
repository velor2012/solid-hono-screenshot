import helMicro from 'hel-micro';
import { date } from '@velor2012/common-lib';
export async function callRemoteMethod() {
  const lib = await helMicro.preFetchLib('@velor2012/common-lib', {versionId: '2.6.2'});
  const res = lib.date.isGtThan('2022-01-01', '2022-01-02')  
  return res
}