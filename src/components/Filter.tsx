import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import type { Province, Regency, District } from "./../type";

type FilterProps = {
  provinces: Province[];
  regencies: Regency[];
  districts: District[];
};

export default function Filter({
  provinces,
  regencies,
  districts,
}: FilterProps) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [selectedProvince, setSelectedProvince] = useState<string>(
    searchParams.get("province") || "",
  );
  const [selectedRegency, setSelectedRegency] = useState<string>(
    searchParams.get("regency") || "",
  );
  const [selectedDistrict, setSelectedDistrict] = useState<string>(
    searchParams.get("district") || "",
  );

  const handleReset = () => {
    setSelectedProvince("");
    setSelectedRegency("");
    setSelectedDistrict("");
    navigate("/");
  };

  const hanldeChangeSelect = (
    e: React.ChangeEvent<HTMLSelectElement> | null = null,
    type: string | null,
  ) => {
    const value = e?.target.value || "";
    if (type == "province") {
      setSelectedProvince(value);
      setSelectedRegency("");
      navigate(`/?province=${value}`);
    } else if (type == "regency") {
      setSelectedRegency(value);
      navigate(`/?province=${selectedProvince}&regency=${value}`);
    } else if (type == "district") {
      setSelectedDistrict(value);
      navigate(
        `/?province=${selectedProvince}&regency=${selectedRegency}&district=${value}`,
      );
    } else {
      handleReset();
    }
  };

  /**
   * handle ketika user mengubah URL secara manual atau klik via breadcrumbs,
   * maka state select input akan mengikuti perubahan tersebut
   */
  useEffect(() => {
    setSelectedProvince(searchParams.get("province") || "");
    setSelectedRegency(searchParams.get("regency") || "");
    setSelectedDistrict(searchParams.get("district") || "");
  }, [searchParams]);

  const filteredRegencies = selectedProvince
    ? regencies.filter((r) => r.province_id === Number(selectedProvince))
    : [];

  const filteredDistricts = selectedRegency
    ? districts.filter((d) => d.regency_id === Number(selectedRegency))
    : [];

  return (
    <div>
      <div className="grid gap-2 mb-4 mt-4">
        <label className="label-text text-base-content/80" htmlFor="province">
          PROVINSI
        </label>
        <div className="select">
          <span className="icon-[tabler--map] text-base-content/80 my-auto size-5 shrink-0"></span>
          <select
            className="select"
            id="province"
            name="province"
            value={selectedProvince}
            onChange={(e) => hanldeChangeSelect(e, "province")}
          >
            <option value="">Pilih Provinsi</option>

            {provinces.map((province) => (
              <option key={province.id} value={province.id}>
                {province.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-2 mb-4 mt-4">
        <label className="label-text text-base-content/80" htmlFor="regency">
          KOTA/KABUPATEN
        </label>
        <div className="select">
          <span className="icon-[tabler--buildings] text-base-content/80 my-auto size-5 shrink-0"></span>
          <select
            className="select"
            id="regency"
            name="regency"
            value={selectedRegency}
            onChange={(e) => hanldeChangeSelect(e, "regency")}
            disabled={!selectedProvince}
          >
            <option value="">
              {selectedProvince
                ? "Pilih Kota/Kabupaten"
                : "Pilih Provinsi dulu"}
            </option>
            {filteredRegencies.map((regency) => (
              <option key={regency.id} value={regency.id}>
                {regency.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-2 mb-4 mt-4">
        <label className="label-text text-base-content/80" htmlFor="district">
          KECAMATAN
        </label>
        <div className="select">
          <span className="icon-[tabler--map-pin] text-base-content/80 my-auto size-5 shrink-0"></span>
          <select
            className="select"
            id="district"
            name="district"
            value={selectedDistrict}
            onChange={(e) => hanldeChangeSelect(e, "district")}
            disabled={!selectedRegency}
          >
            <option value="">
              {selectedRegency
                ? "Pilih Kecamatan"
                : "Pilih Kota/Kabupaten dulu"}
            </option>

            {filteredDistricts.map((district) => (
              <option key={district.id} value={district.id}>
                {district.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-2 mb-4 mt-6 pt-6">
        <button
          className="btn btn-outline btn-secondary rounded-full"
          onClick={handleReset}
        >
          <span className="icon-[tabler--filter-off] text-base-content/80 my-auto size-5 shrink-0 "></span>
          Reset
        </button>
      </div>
    </div>
  );
}
