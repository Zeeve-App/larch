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
import { Link } from "react-router-dom";
import { getFormattedLocalTime } from "src/utils/time";
import { NetworkType, TemplateDelete } from "../types";
import { ReactComponent as IconThreeDots } from "src/assets/ThreeDots.svg";
import { ReactComponent as IconEdit } from "src/assets/Edit.svg";
import { ReactComponent as IconArrowUp2 } from "src/assets/ArrowUp2.svg";
import { ReactComponent as IconDuplicate } from "src/assets/Template.svg";
import { ReactComponent as IconDelete } from "src/assets/Trash.svg";
import { ReactComponent as IconMyNetwork } from "src/assets/MyNetwork.svg";
import { useToggle } from "src/hooks";
import {
  DropdownMenu,
  DropdownMenuButton,
  DropdownMenuList,
  DropdownMenuItem,
} from "src/components/DropdownMenu";
import { Button } from "src/components/Button";
import { useState } from "react";

/* eslint-disable react/button-has-type */
type TemplateInfo = {
  id: string;
  name: string;
  networkProvider: string;
  createdAt: string;
  operation: string;
};
type TemplateListTableProps = {
  templateList: TemplateInfo[];
  setDeleteTemplateObj: ({
    isOpen,
    templateId,
    templateName,
  }: TemplateDelete) => void;
  setDuplicateTemplateObj: ({
    isOpen,
    templateId,
    templateName,
  }: TemplateDelete) => void;
  onCreateModal: (templateId: string, type: NetworkType) => void;
  editNetwork: (templateId: string) => void;
  setSort: (value: boolean) => void;
  sort: boolean;
};
export default function TemplateListTable({
  templateList,
  setDeleteTemplateObj,
  setDuplicateTemplateObj,
  onCreateModal,
  setSort,
  editNetwork,
  sort,
}: TemplateListTableProps) {
  const { isOpen, handleToggle, handleClose } = useToggle();
  const [actionIdx, setActionIdx] = useState<number | null>(null);
  return (
    <>
      <div className="rounded-xl border-2 border-dark-700 p-1">
        <table className="text-white w-full text-xl">
          <thead className="rounded-xl bg-larch-dark_2">
            <tr className="border-b-2 border-dark-700">
              <th className="px-6 py-3 h-[48px] text-left" scope="col">
                Template ID
              </th>
              <th className="px-6 py-3 h-[48px] text-left" scope="col">
                Template Name
              </th>
              <th className="px-6 py-3 h-[48px] text-left" scope="col">
                Provider
              </th>
              <th
                className="px-6 py-3 h-[48px] flex gap-2 justify-center items-center"
                scope="col"
              >
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
              </th>
              <th className="px-6 py-3 h-[48px]" scope="col">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="text-xl">
            {templateList.map((template, index) => (
              <tr
                className={
                  index + 1 < templateList.length
                    ? "border-b-2 border-dark-700"
                    : ""
                }
              >
                <td className="px-6 h-[72px] py-3">{template.id}</td>
                <td className="px-6 h-[72px] py-3">{template.name}</td>
                <td className="px-6 h-[72px] py-3">
                  {template.networkProvider}
                </td>
                <td className="px-6 h-[72px] py-3 text-center">
                  {getFormattedLocalTime(template.createdAt)}
                </td>
                <td className="flex justify-center items-center h-[72px] py-3 gap-3 px-6">
                  <Button
                    className="bg-larch-dark_2 border-2 border-dark-700 rounded-md px-3 gap-3 hover:bg-brand-gradient"
                    onClick={() => {
                      onCreateModal(template.id, "evaluation");
                    }}
                    iconLeft={<IconMyNetwork className="w-5 h-5" />}
                    title="Create network for evaluation."
                  >
                    Create
                  </Button>
                  <Button
                    className="border-dark-700 border-2 rounded-md px-3 gap-3 bg-larch-dark_2 hover:bg-brand-gradient"
                    onClick={() => {
                      onCreateModal(template.id, "testing");
                    }}
                    iconLeft={<IconMyNetwork className="w-5 h-5" />}
                    title="Create network for testing."
                  >
                    Test
                  </Button>
                  <DropdownMenu
                    onClose={handleClose}
                    onClick={() => setActionIdx(index)}
                  >
                    <DropdownMenuButton
                      as={Button}
                      className=" p-0 w-[48px] rounded-md bg-larch-dark_2 border-2 border-dark-700 hover:bg-brand-gradient"
                      colorScheme="dark"
                      iconRight={
                        <IconThreeDots className="text-md w-6 h-6 font-bold" />
                      }
                      onClick={handleToggle}
                    ></DropdownMenuButton>
                    {actionIdx === index && (
                      <DropdownMenuList
                        direction="right"
                        isOpen={isOpen}
                        className="z-[501] bg-larch-dark_2 border-4 border-dark-700 text-white"
                      >
                        <DropdownMenuItem
                          onClick={() => {
                            setDuplicateTemplateObj({
                              isOpen: true,
                              templateId: template.id,
                              templateName: `${template.name}-copy`,
                            });
                          }}
                          iconLeft={
                            <IconDuplicate className="text-md w-5 h-5" />
                          }
                          className="text-white hover:bg-larch-dark_3"
                        >
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            editNetwork(template.id);
                          }}
                          iconLeft={<IconEdit className="text-md w-4 h-4" />}
                          className="text-white hover:bg-larch-dark_3"
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setDeleteTemplateObj({
                              isOpen: true,
                              templateId: template.id,
                              templateName: template.name,
                            });
                          }}
                          iconLeft={<IconDelete className="text-md w-5 h-5" />}
                          className="text-white hover:bg-larch-dark_3 hover:text-larch-error"
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuList>
                    )}
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {templateList.length === 0 && (
        <div className="w-full text-white text-center pt-5">
          <div>
            To get started, please{" "}
            <Link to="/templates/createNetwork">
              <span className="text-center text-blue-500 cursor-pointer">
                create network template
              </span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
