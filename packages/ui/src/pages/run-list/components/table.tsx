/* eslint-disable max-len */
import { Button } from "src/components/Button";
import { getFormattedLocalTime } from "../../../utils/time";

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
          <thead className="rounded-xl bg-larch-dark_2">
            <tr className="border-b-2 border-dark-700">
              <th className="px-6 py-3 w-56.25  text-left" scope="col">
                ID
              </th>
              <th className="px-6 py-3  text-center" scope="col">
                Operation
              </th>
              <th className="px-6 py-3  text-left" scope="col">
                Network name
              </th>
              <th className="px-6 py-3  text-center" scope="col">
                Status code
              </th>
              <th className="px-6 py-3 " scope="col">
                Date &nbsp;
                <span aria-hidden onClick={() => setSort(!sort)}>
                  {sort ? <span>&darr;</span> : <span>&uarr;</span>}
                </span>
              </th>
              <th className="px-6 py-3  text-center" scope="col">
                Operation
              </th>
            </tr>
          </thead>
          <tbody>
            {runList.map((activity, index) => (
              <tr
                className={
                  index + 1 < runList.length ? "border-b-2 border-dark-700" : ""
                }
              >
                <td className="px-6 py-3 w-56.25">{activity.id}</td>
                <td className="px-6 py-3 w-56.25 text-center">{activity.intention}</td>
                <td className="px-6 py-3 w-56.25 ">{activity.relatedId}</td>
                <td className="px-6 py-3 w-56.25 text-center">{activity.statusCode}</td>
                <td className="px-6 py-3 w-56.25 text-center">
                  {getFormattedLocalTime(activity.createdAt)}
                </td>
                <td>
                  <div className="flex flex-row justify-center gap-3 my-2">
                    <Button
                      className='border-dark-700 border-2 rounded-md px-2 bg-larch-dark_3 hover:bg-brand-gradient'
                      onClick={() => {
                        onViewCommand(activity.id);
                      }}
                    >
                      View Command
                    </Button>
                    <Button
                      className='border-dark-700 border-2 rounded-md px-2 bg-larch-dark_3 hover:bg-brand-gradient'
                      onClick={() => {
                        onViewStandardOutput(activity.id);
                      }}
                    >
                      View Output
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
