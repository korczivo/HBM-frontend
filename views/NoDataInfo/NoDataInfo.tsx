interface INoDataInfo {
  title: string;
}

export const NoDataInfo = ({ title }: INoDataInfo) => (
  <div className="col-span-12 text-center">
    <h4 className="text-title-sm font-bold text-black dark:text-white">
      {title}
    </h4>
  </div>
);
