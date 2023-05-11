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

import { getFormattedLocalTime } from "../../../utils/time";
import { Link } from "react-router-dom";
import { ReactComponent as IconArrowUp2 } from "src/assets/ArrowUp2.svg";


type ActivityInfo = {
  id: string;
  operationDetail: string;
  createdAt: string;
  operation: string;
};

type ActivityListTableProps = {
  activityList: ActivityInfo[];
  setSort: (value: boolean) => void;
  sort: boolean;
};

export default function ActivityListTable({
  activityList,
  setSort,
  sort,
}: ActivityListTableProps) {
  return (
    <>
      <div className="rounded-xl border-2 border-dark-700 p-1">
        <table className="text-white w-full rounded-lg">
          <thead className="rounded-xl bg-larch-dark_2">
            <tr className="border-b-2 border-dark-700 text-xl">
              <th className="px-6 py-3 h-[48px]  text-left" scope="col">
                Activity ID
              </th>
              <th className="px-6 py-3 h-[48px] text-left" scope="col">
                Operation Details
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
              <th className="px-6 h-[48px] py-3  text-right" scope="col">
                Operation
              </th>
            </tr>
          </thead>
          <tbody className="text-xl">
            {activityList.map((activity, index) => (
              <tr
                className={
                  index + 1 < activityList.length
                    ? "border-b-2 border-dark-700"
                    : ""
                }
              >
                <td className="px-6 h-[72px] py-3">{activity.id}</td>
                <td className="px-6 h-[72px] py-3 ">
                  {activity.operationDetail}
                </td>
                <td className="px-6 h-[72px] py-3 text-center">
                  {getFormattedLocalTime(activity.createdAt)}
                </td>
                <td className="px-6 h-[72px] py-3 text-end ">{activity.operation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {activityList.length === 0 && (
        <div className="w-full text-white text-center pt-5">
          <div>
            Looks like there's no activity done, do opetations like{" "}
            <Link to="/templates">
              <span className="text-center text-larch-pink cursor-pointer">
                Create Network Template
              </span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
