const CardWithSeparatorTitleText = ({ children }: { children: string }) => {
  return <p className="text-[#45464E] font-semibold text-lg">{children}</p>;
};

const CardWithSeparator = ({
  titleComponent,
  children,
  cardClassName,
  subtext,
}: {
  titleComponent: React.ReactNode;
  children: React.ReactNode;
  cardClassName?: string;
  subtext?: string;
}) => {
  return (
    <div className={`bg-white p-5 flex flex-col rounded-12 ${cardClassName}`}>
      <div className="flex flex-col gap-2">
        {titleComponent}
        {subtext && <p className="text-sm text-gray-400">{subtext}</p>}
      </div>
      <div className="w-full h-[1px] border border-[#E1E2E9] my-3" />
      {children}
    </div>
  );
};

export { CardWithSeparator, CardWithSeparatorTitleText };
