const Navbar = () => {
  return (
    <header>
      <div className="flex flex-row justify-between">
        <div>
          <input type="checkbox" className="" />
          <span>Toggle admin</span>
        </div>
        <span>Brenda's 24th</span>
        <div>
          <span>11 Octubre 2024</span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
