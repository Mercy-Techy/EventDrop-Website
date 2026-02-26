const CheckBox = ({
  label,
  valid,
  color,
}: {
  label: string;
  valid: boolean;
  color?: string;
}) => {
  const bg = color ? `bg-${color}` : "bg-green-500";
  const text = color ? `text-${color}` : "text-green-500";
  return (
    <div className="flex items-center gap-2">
      <div className={`h-3 w-3 rounded-full ${valid ? bg : "bg-gray-300"}`} />
      <span className={`${valid ? text : "text-gray-600"}`}>{label}</span>
    </div>
  );
};

export default CheckBox;
