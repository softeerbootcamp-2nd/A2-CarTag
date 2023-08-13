import TrimBannerContainer from '../containers/TrimPage/TrimBannerContainer';
import TrimSelectContainer from '../containers/TrimPage/TrimSelectContainer';
import { useFetch } from '../hooks/useFetch';
import { TRIM_API } from '../utils/apis';

export default function TrimPage() {
  const { data, loading } = useFetch(TRIM_API + `carType=${1}`);

  console.log(data, loading);
  return (
    <>
      <TrimBannerContainer />
      <TrimSelectContainer />
    </>
  );
}
