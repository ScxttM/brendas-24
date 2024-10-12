const Navbar = (props: {
  viewMode: boolean;
  setViewMode: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <header className="m-5">
      <div className="flex flex-row justify-between">
        <div>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={props.viewMode}
              className="sr-only peer"
              onChange={() => props.setViewMode(!props.viewMode)}
            />
            <div className="relative w-11 h-6 rounded-full peer peer-checked:bg-red-600 bg-red-400 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all xl:scale-150"></div>
            <span className="ms-1 text-4xl md:text-4xl xl:text-8xl">
              View Mode
            </span>
          </label>
        </div>
        <span className="text-4xl md:text-4xl xl:text-8xl">Brenda's 24th</span>
        <div>
          <span className="text-4xl md:text-4xl xl:text-8xl">
            11 Octubre 2024
          </span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
