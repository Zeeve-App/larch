/*
 * Copyright (C) Zeeve Inc.
 * This file is part of Larch.
 * Larch is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * Larch is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with Larch.  If not, see <http://www.gnu.org/licenses/>.
 */

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
        <table className="text-white w-full rounded table-auto border-2 border-dark-700">
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
                className="border-b-2 border-dark-700 hover:bg-larch-dark_3"
                key={index}
              >
                <td className="px-6 h-[72px] break-all py-3">{activity.id}</td>
                <td className="px-6 h-[72px] py-3 text-center">{activity.intention}</td>
                <td className="px-6 h-[72px] py-3 break-all">{activity.relatedId}</td>
                <td className="px-6 h-[72px] py-3 text-center">{activity.statusCode}</td>
                <td className="px-6 h-[72px] py-3 text-center">
                  {getFormattedLocalTime(activity.createdAt)}
                </td>
                <td className="h-[72px]">
                  <div className="flex flex-col lg:flex-row justify-center gap-3 my-2 m-3">
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
      {runList.length === 0 && (
        <div className="w-full text-white text-center pt-5">
          <div>No Records found</div>
        </div>
      )}
    </>
  );
}
