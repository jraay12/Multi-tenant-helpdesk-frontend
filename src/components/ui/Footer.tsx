const Footer = () => {
  return (
    <footer className="border-t border-gray-300 px-5 py-4 bg-white ">
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-black/60">
        

        <div className="flex gap-5 text-xs">
          <p>2024 ResolvDesk Inc.</p>
          <p className="cursor-pointer hover:text-black">
            Privacy Policy
          </p>

          <p className="cursor-pointer hover:text-black">
            Terms of Service
          </p>
        </div>
        <div className="flex gap-5 text-xs">
          <p>Language: English (US)</p>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;