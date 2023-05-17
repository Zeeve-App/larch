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
import {
  Link,
  useNavigate,
} from "react-router-dom";
import { getFormattedLocalTime } from "../../../utils/time";
import { ReactComponent as IconDelete } from "src/assets/Trash.svg";
import { ReactComponent as IconArrowUp2 } from "src/assets/ArrowUp2.svg";
import { ReactComponent as IconEye } from "src/assets/Eye.svg";
import { IconButton } from "src/components/Button";
import { ReactComponent as IconError } from "src/assets/NotificationError.svg";
import { ReactComponent as IconSuccess } from "src/assets/NotificationSuccess.svg";
import { ReactComponent as IconInfo } from "src/assets/NotificationInfo.svg";

type NetworkInfo = {
  name: string;
  type: string;
  networkProvider: string;
  networkDirectory: string;
  createdAt: string;
  networkState: string;
};

type NetworkListTableProps = {
  networkList: NetworkInfo[];
  onCreateModal: (name: string) => void;
  setSort: (value: boolean) => void;
  sort: boolean;
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "failed":
      return <IconError className="text-md w-5 h-5" />;
    case "in-cleanup":
    case "creating":
      return <IconInfo className="text-md w-5 h-5" />;
    case "running":
    default:
      return <IconSuccess className="text-md w-5 h-5" />;
  }
};

export default function NetworkListTable({
  networkList,
  onCreateModal,
  setSort,
  sort,
}: NetworkListTableProps) {
  const navigate = useNavigate();

  return (
    <>
      <div className="rounded-xl border-2 border-dark-700 p-1 overflow-scroll">
        <table className="text-white w-full table-auto">
          <thead className="rounded-xl text-xl bg-larch-dark_2 ">
            <tr className="border-b-2 border-dark-700 align-middle">
              <th className="px-6 py-3 h-[48px] text-left" scope="col">
                Network Name
              </th>
              <th className="px-6 py-3 h-[48px] text-center" scope="col">
                Type
              </th>
              <th className="px-6 py-3 h-[48px] text-left" scope="col">
                Provider
              </th>
              <th className="px-6 py-3 h-[48px] text-left" scope="col">
                Network Directory
              </th>
              <th
                className="px-6 py-3 h-[48px]"
                scope="col"
              >
                <div className="flex items-center gap-3">
                <p className="cursor-pointer" onClick={() => setSort(!sort)}>
                  Created On
                </p>
                <span aria-hidden>
                  {sort ? (
                    <IconArrowUp2 className="w-5 h-5 rotate-180" />
                    ) : (
                      <IconArrowUp2 className="w-5 h-5 " />
                      )}
                </span>
                      </div>
              </th>
              <th className="px-6 h-[48px] text-start py-3" scope="col">
                Status
              </th>
              <th className="py-3 h-[48px]" scope="col">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="rounded-lg text-xl">
            {networkList.map((network, index) => (
              <tr
                className={
                  index + 1 < networkList.length
                    ? "border-b-2 border-dark-700"
                    : ""
                }
                key={index}
              >
                <td className="px-6 h-[72px] break-all py-3">{network.name}</td>
                <td className="px-6 h-[72px] py-3 text-center">
                  {network.type}
                </td>
                <td className="px-6 h-[72px] break-all py-3">
                  {network.networkProvider}
                </td>
                <td className="px-6 h-[72px] break-all py-3">
                  {network.networkDirectory}
                </td>
                <td className="px-6 h-[72px] py-3 text-center">
                  {getFormattedLocalTime(network.createdAt)}
                </td>
                <td className="px-6 h-[72px] py-3 text-center">
                  <div className="flex items-center gap-2 capitalize">
                    {getStatusIcon(network.networkState)}
                    {network.networkState}
                  </div>
                </td>
                <td className="h-[72px]">
                  <div className="flex justify-center gap-3 m-3 items-center">
                    <IconButton
                      variant={"outline"}
                      icon={<IconEye className="text-md w-5 h-5" />}
                      className="border-white p-0 m-0 text-white"
                      onClick={() => {
                        const searchQuery = new URLSearchParams({
                          networkName: network.name,
                        });

                        navigate(`/executions/?${searchQuery.toString()}`);
                      }}
                      title="search executions with network name"
                    />
                    <IconButton
                      variant={"outline"}
                      icon={<IconDelete className="text-md" />}
                      className="border-larch-error p-0 m-0 text-larch-error"
                      onClick={() => onCreateModal(network.name)}
                      title="Delete"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {networkList.length === 0 && (
        <div className="w-full text-white text-center pt-5">
          <div>
            To get started, please create network from{" "}
            <Link to="/templates">
              <span className="text-center text-blue-500 cursor-pointer">
                Network Templates
              </span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
