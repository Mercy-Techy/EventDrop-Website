const CheckBox = ({ label, valid }: { label: string; valid: boolean }) => {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`h-3 w-3 rounded-full ${valid ? "bg-yellow-300" : "bg-gray-300"}`}
      />
      <span className={`${valid ? "text-black" : "text-gray-600"}`}>
        {label}
      </span>
    </div>
  );
};

export default CheckBox;
