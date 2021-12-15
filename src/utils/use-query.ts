import { useLocation } from 'umi';

interface IQuery {
  [key: string]: string;
}

export default function useQuery(): IQuery {
  const query = new URLSearchParams(useLocation().search);
  return [...query.entries()].reduce((p, n) => ({...p, [n[0]]: n[1]}), {});
}