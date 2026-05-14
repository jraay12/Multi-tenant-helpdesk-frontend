type ButtonProps = {
  button_name: string;
};

const Button = ({ button_name }: ButtonProps) => {
  return (
    <button className="bg-blue-900 px-4 rounded-lg text-white text-xs font-medium h-10 w-full">{button_name}</button>
  );
};

export default Button;
