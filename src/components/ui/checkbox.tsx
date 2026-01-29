const CheckBox = ({ label, valid }: { label: string; valid: boolean }) => {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`h-3 w-3 rounded-full ${
          valid ? "bg-[#D97A5B]" : "bg-gray-300"
        }`}
      />
      <span className={`${valid ? "text-[#D97A5B]" : "text-gray-600"}`}>
        {label}
      </span>
    </div>
  );
};

export default CheckBox;
