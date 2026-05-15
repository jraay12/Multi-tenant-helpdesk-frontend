type ButtonProps = {
  button_name: string;
  onClick: () => void
};

const Button = ({ button_name, onClick }: ButtonProps) => {
  return (
    <button className="bg-blue-900 px-4 rounded-lg text-white text-xs font-medium h-10 w-full cursor-pointer" onClick={onClick}>{button_name}</button>
  );
};

export default Button;
