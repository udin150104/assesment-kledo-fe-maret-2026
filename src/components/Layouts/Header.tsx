type HeaderProps = {
  title: string;
};

export default function Header({ title }: HeaderProps) {
  return (
    <header className="navbar bg-base-100 border-b border-base-content/20 sticky top-0 z-40 px-0">
      <div className="flex-none sm:hidden px-3">
        <button
          type="button"
          className="btn btn-text btn-square"
          aria-haspopup="dialog"
          aria-expanded="false"
          aria-controls="collapsible-mini-sidebar"
          data-overlay="#collapsible-mini-sidebar"
        >
          <span className="icon-[tabler--menu-2] size-5"></span>
        </button>
      </div>

      <div className="hidden sm:flex shrink-0 items-center px-6">
        <a className="text-xl font-semibold flex items-center gap-2" href="#">
          <span className="icon-[tabler--globe] text-base-content/80 my-auto size-5 shrink-0"></span>
          {title}
        </a>
      </div>
    </header>
  );
}
