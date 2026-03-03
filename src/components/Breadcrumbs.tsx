import { useSearchParams, Link } from "react-router-dom";
import type { District, Province, Regency } from "../type";

type BreadcrumbsProps = {
  provinces: Province[];
  regencies: Regency[];
  districts: District[];
};

export default function Breadcrumbs({
  provinces,
  regencies,
  districts,
}: BreadcrumbsProps) {
  const [searchParams] = useSearchParams();

  const selectedProvince = searchParams.get("province") || "";
  const selectedRegency = searchParams.get("regency") || "";
  const selectedDistrict = searchParams.get("district") || "";

  const province = provinces.find((p) => p.id === Number(selectedProvince));
  const regency = regencies.find((r) => r.id === Number(selectedRegency));
  const district = districts.find((d) => d.id === Number(selectedDistrict));

  const items = [
    { name: "Indonesia", to: "/" },
    province ? { name: province.name, to: `?province=${province.id}` } : null,
    regency
      ? {
          name: regency.name,
          to: `?province=${province?.id}&regency=${regency.id}`,
        }
      : null,
    district
      ? {
          name: district.name,
          to: `?province=${province?.id}&regency=${regency?.id}&district=${district.id}`,
        }
      : null,
  ].filter(Boolean);

  return (
    <div className="mb-4">
      <div className="breadcrumbs">
        <ul>
          {items.map((item, index) => (
            <li
              key={index}
              className={
                index === items.length - 1 && item?.name !== 'Indonesia' ? "text-primary font-bold" : ""
              }
            >
              {item!.name === "Indonesia" && (
                <span className="icon-[tabler--globe] text-base-content/80 my-auto size-5 shrink-0 me-2"></span> 
              )}
              <Link to={item!.to}>{item!.name}</Link>
              {index < items.length - 1 && (
                <span className="breadcrumbs-separator rtl:rotate-180 mx-1">
                  <span className="icon-[tabler--chevron-right]" />
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
