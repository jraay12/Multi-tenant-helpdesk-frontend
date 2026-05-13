type ButtonProps = {
  button_name: string;
};

const Button = ({ button_name }: ButtonProps) => {
  return (
    <div className="px-3 bg-blue-500 rounded-sm py-1 text-white cursor-pointer">
      {button_name}
    </div>
  );
};

export default Button;
