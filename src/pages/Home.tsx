import { useRouteLoaderData, useSearchParams } from "react-router-dom";
import type { District, Province, Regency } from "./../type";
import { Breadcrumbs } from "./../components";

interface LoaderData {
  provinces: Province[];
  regencies: Regency[];
  districts: District[];
}

export default function Home() {
  const loaderData = useRouteLoaderData("root") as LoaderData;
  const [searchParams] = useSearchParams();

  const provinces = loaderData.provinces;
  const regencies = loaderData.regencies;
  const districts = loaderData.districts;

  const selectedProvince = searchParams.get("province") || "";
  const selectedRegency = searchParams.get("regency") || "";
  const selectedDistrict = searchParams.get("district") || "";

  const province = provinces.find((p) => p.id === Number(selectedProvince));
  const regency = regencies.find((r) => r.id === Number(selectedRegency));
  const district = districts.find((d) => d.id === Number(selectedDistrict));

  return (
    <div className="p-6 flex-1">
      <Breadcrumbs
        provinces={provinces}
        regencies={regencies}
        districts={districts}
      />
      <div className="mt-12 flex flex-col items-center justify-center">
        {province && (
          <>
            <div className="text-center mb-12">
              <span className="text-base-content text-primary">PROVINSI</span>
              <h1 className="text-base-content text-7xl font-bold mb-12">
                {province?.name}
              </h1>
            </div>
          </>
        )}
        {regency && (
          <>
            <div className="text-center mb-12">
              <h4 className="text-base-content text-primary">KABUPATEN</h4>
              <h1 className="text-base-content text-7xl font-bold mb-12">
                {regency?.name}
              </h1>
            </div>
          </>
        )}
        {district && (
          <>
            <div className="text-center mb-12">
              <h4 className="text-base-content  text-primary">KECAMATAN</h4>
              <h1 className="text-base-content text-7xl font-bold mb-12">
                {district?.name}
              </h1>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
