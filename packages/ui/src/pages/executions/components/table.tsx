/* eslint-disable max-len */
import { Button } from "src/components/Button";
import { getFormattedLocalTime } from "../../../utils/time";
import { ReactComponent as IconArrowUp2 } from "src/assets/ArrowUp2.svg";
import { ReactComponent as IconEye } from 'src/assets/Eye.svg'

type RunInfo = {
  id: string;
  intention: string;
  relatedId: string;
  statusCode: string;
  createdAt: string;
  operation: string;
};

type RunListTableProps = {
  runList: RunInfo[];
  onViewCommand: (templateId: string) => void;
  onViewStandardOutput: (name: string) => void;
  setSort: (value: boolean) => void;
  sort: boolean;
};

export default function ActivityListTable({
  runList,
  onViewCommand,
  onViewStandardOutput,
  setSort,
  sort,
}: RunListTableProps) {
  return (
    <>
      <div className="rounded-xl border-2 border-dark-700 p-1">
        <table className="text-white w-full rounded">
          <thead className="rounded-xl text-xl bg-larch-dark_2">
            <tr className="border-b-2 border-dark-700">
              <th className="px-6 py-3 h-[48px]  text-left" scope="col">
                Execution ID
              </th>
              <th className="px-6 py-3 h-[48px]  text-center" scope="col">
                Operation
              </th>
              <th className="px-6 py-3 h-[48px]  text-left" scope="col">
                Network name
              </th>
              <th className="px-6 py-3 h-[48px]  text-center" scope="col">
                Status code
              </th>
              <th
                className="px-6 py-3 h-[48px] flex gap-2 justify-center items-center"
                scope="col"
              >
                <p className="cursor-pointer" onClick={() => setSort(!sort)}>
                  Date
                </p>
                <span aria-hidden>
                  {sort ? (
                    <IconArrowUp2 className="w-5 h-5 rotate-180" />
                  ) : (
                    <IconArrowUp2 className="w-5 h-5 " />
                  )}
                </span>
              </th>
              <th className="px-6 py-3  h-[48px] text-center" scope="col">
                Operation
              </th>
            </tr>
          </thead>
          <tbody className="text-xl">
            {runList.map((activity, index) => (
              <tr
                className={
                  index + 1 < runList.length ? "border-b-2 border-dark-700" : ""
                }
              >
                <td className="px-6 h-[72px] py-3">{activity.id}</td>
                <td className="px-6 h-[72px] py-3 text-center">{activity.intention}</td>
                <td className="px-6 h-[72px] py-3 ">{activity.relatedId}</td>
                <td className="px-6 h-[72px] py-3 text-center">{activity.statusCode}</td>
                <td className="px-6 h-[72px] py-3 text-center">
                  {getFormattedLocalTime(activity.createdAt)}
                </td>
                <td className="h-[72px]">
                  <div className="flex flex-row justify-center gap-3 my-2">
                    <Button
                      className='border-dark-700 border-2 gap-3 rounded-md px-3 bg-larch-dark_2 hover:bg-brand-gradient'
                      onClick={() => {
                        onViewCommand(activity.id);
                      }}
                      iconRight={<IconEye className="w-5 h-5" />}
                    >
                      Command
                    </Button>
                    <Button
                      className='border-dark-700 border-2 gap-3 rounded-md px-3 bg-larch-dark_2 hover:bg-brand-gradient'
                      onClick={() => {
                        onViewStandardOutput(activity.id);
                      }}
                      iconRight={<IconEye className="w-5 h-5" />}
                    >
                      Output
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {runList.length === 0 && (
        <div className="w-full text-white text-center pt-5">
          <div>No Records found</div>
        </div>
      )}
    </>
  );
}
