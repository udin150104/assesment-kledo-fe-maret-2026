import { useLoaderData } from "react-router-dom";
import type { District, Province, Regency } from "./../../type";
import Filter from "./../Filter";

type SidebarProps = {
  title: string;
};

interface LoaderData {
  provinces: Province[];
  regencies: Regency[];
  districts: District[];
}

export default function Sidebar({ title }: SidebarProps) {
  const loaderData = useLoaderData() as LoaderData;

  const provinces = loaderData.provinces;
  const regencies = loaderData.regencies;
  const districts = loaderData.districts;

  return (
    <aside
      id="collapsible-mini-sidebar"
      className="overlay [--auto-close:sm] overlay-minified:w-17 sm:shadow-none overlay-open:translate-x-0 drawer drawer-start hidden w-66 sm:relative sm:z-30 sm:flex sm:translate-x-0 sm:h-auto sm:min-h-full self-stretch border-e border-base-content/20 bg-base-100"
      role="dialog"
      tabIndex={-1}
    >
      <div className="drawer-header overlay-minified:px-3.75 py-2 w-full flex items-center justify-between gap-3">
        <h3 className="drawer-title text-xl font-semibold sm:hidden pt-2">
          {title}
        </h3>
      </div>

      <div className="drawer-body flex-1 min-h-0 overflow-y-auto px-2 pt-2">
        <div className="px-4 ">
          <small className="text-base-content/80">FILTER WILAYAH</small>
          <Filter provinces={provinces} regencies={regencies} districts={districts} />
        </div>
      </div>
    </aside>
  );
}
