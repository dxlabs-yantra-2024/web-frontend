import Image from "next/image";

type TextFieldProps = {
  label?: string;
  iconName?: string;
  name: string;
  register?: any;
  inputClassName?: string;
} & React.ComponentProps<"input">;

const TextField = ({
  label,
  iconName,
  register,
  inputClassName,
  ...props
}: TextFieldProps) => {
  return (
    <div className="flex flex-col gap-2 ">
      {label && <label className="text-primaryGreen text-sm">{label}</label>}
      <div className="relative flex ">
        {iconName && (
          <div className="absolute left-2 top-[8px]">
            <Image
              src={`/icons/${iconName}.svg`}
              alt={label ?? "icon"}
              width={24}
              height={24}
            />
          </div>
        )}
        <input
          className={`py-2 px-4 min-w-[375px] border border-textFieldBorder rounded-[8px] ${iconName ? "pl-10 " : ""} ${inputClassName}`}
          {...register?.(props.name)}
          {...props}
        />
      </div>
    </div>
  );
};

export { TextField };
