const StatCard = ({ label, value }: { label?: string; value?: string }) => {
  return (
    <div className="flex flex-col gap-1">
      {label && <h3 className="text-black50 text-sm">{label}</h3>}
      {value && <h1 className="text-black">{value}</h1>}
    </div>
  );
};

export { StatCard };
