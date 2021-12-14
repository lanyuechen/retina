import { useLocation } from 'react-router-dom';

export default function useQuery(): any {
  const query = new URLSearchParams(useLocation().search);
  return [...query.entries()].reduce((p, n) => ({...p, [n[0]]: n[1]}), {});
}