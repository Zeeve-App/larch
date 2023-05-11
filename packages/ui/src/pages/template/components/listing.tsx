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

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TemplateListTable from "./table";
import PaginatedItems from "../../../components/pagination";
import {
  getTemplateList,
  deleteTemplate,
  duplicateTemplate,
  getTemplateData,
  createNetwork,
  testNetwork,
} from "../../../utils/api";
import { notify } from "../../../utils/notifications";
import PopUpBox from "./modal";
import DeletePopUpBox from "./deleteTemplateModal";
import DuplicateTempPopUpBox from "./duplicateTemplateModal";
import { Filter } from "src/components/Filter/Filter";
import { NetworkType, TemplateDelete } from "../types";
import Loader from "../../../components/loader";
import { Button, IconButton } from "src/components/Button";
import { FilterItem } from "src/components/Filter/type";
import { ReactComponent as IconRefresh } from "src/assets/Refresh.svg";
import { ReactComponent as IconCross } from "src/assets/Cross.svg";
import { FilterInput } from "src/components/Filter/FilterInput";

export default function Listing() {
  const [templateList, setTemplateList] = useState<any[]>([]);
  const [meta, setMeta] = useState<{ total: number }>({ total: 0 });
  const [itemPerPage] = useState(5);
  const [pageNum, setPageNum] = useState(1);
  const [pageToggle, setPageToggle] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [createNetTemplateId, setCreateNetTemplateId] = useState("");
  const [networkType, setNetworkType] = useState<NetworkType>("evaluation");
  const [sort, setSort] = useState<boolean>(true);
  const [deleteTemplateObj, setDeleteTemplateObj] = useState({
    isOpen: false,
    templateId: "",
    templateName: "",
  } as TemplateDelete);
  const [duplicateTemplateObj, setDuplicateTemplateObj] = useState({
    isOpen: false,
    templateId: "",
    templateName: "",
  } as TemplateDelete);
  const [isShowLoader, setIsShowLoader] = useState<boolean>(false);
  const [filters, setFilters] = useState<FilterItem[]>([
    {
      label: "ID",
      key: "id",
      checked: false,
      isOpen: false,
      type: "searchable",
      value: "",
    },
    {
      label: "Template Name",
      key: "name",
      checked: false,
      isOpen: false,
      type: "searchable",
      value: "",
    },
    {
      label: "Provider",
      key: "provider",
      checked: false,
      isOpen: false,
      type: "searchable",
      value: "",
    },
    {
      label: "Created On",
      key: "createdAt",
      checked: false,
      isOpen: false,
      type: "date",
      value: "",
    },
  ]);

  const navigate = useNavigate();
  const updateListing = () => {
    setPageToggle((prev) => !prev);
  };
  const onCreateModal = (templateId: string, type: NetworkType) => {
    setNetworkType(type);
    setCreateNetTemplateId(templateId);
    setIsOpen(true);
  };

  const editNetwork = (templateId: string) => {
    console.log("templateId", templateId);
    navigate("/templates/createNetwork", { state: { templateId } });
  };

  const onNetworkCreate = (name: string, type: NetworkType) => {
    setIsOpen(false);
    setIsShowLoader(true);
    getTemplateData(createNetTemplateId)
      .then((response) => ({
        ...response.result,
        name,
        id: undefined,
        createdAt: undefined,
        updatedAt: undefined,
      }))
      .then(type === "evaluation" ? createNetwork : testNetwork)
      .then(() => {
        notify("success", "Network created successfully");
        navigate("/network")
      })
      .catch(() => {
        notify("error", "Failed to create network");
      })
      .finally(() => {
        setIsShowLoader(false);
      })
  };

  const fetchTemplates = () => {
    const filter: { [name: string]: string } = {};
    filters.forEach((item) => {
      if (item.value) filter[item.key] = item.value;
    });

    setIsShowLoader(true);
    const payload = {
      filter,
      sort: [
        {
          field: "createdAt",
          direction: sort ? "asc" : "desc",
        },
      ],
      meta: {
        pageNum,
        numOfRec: itemPerPage,
      },
    };
    getTemplateList(payload)
      .then((response) => {
        setTemplateList(response.result);
        setMeta(response.meta);
        setIsShowLoader(false);
      })
      .catch(() => {
        setIsShowLoader(false);
        notify("error", "Failed to fetch activity list");
      });
  };

  useEffect(() => {
    fetchTemplates();
  }, [pageNum, sort, pageToggle]);


  const onPageChange = (pageNumOnChange: number) => {
    setPageNum(pageNumOnChange);
  };
  const onTemplateDelete = (templateId: string) => {
    setDeleteTemplateObj({
      isOpen: false,
      templateId: "",
      templateName: "",
    });
    setIsShowLoader(true);
    deleteTemplate(templateId)
      .then(() => {
        updateListing();
        notify("success", "Template deleted successfully");
      })
      .catch(() => {
        notify("error", "Failed to delete template");
      })
      .finally(() => {
        setIsShowLoader(false);
      })
  };

  const onTemplateDuplicate = () => {
    setIsShowLoader(true);
    duplicateTemplate(duplicateTemplateObj.templateId, {
      name: duplicateTemplateObj.templateName,
    })
      .then(() => {
        updateListing();
        notify("success", "Template duplicated successfully");
        setDuplicateTemplateObj({
          isOpen: false,
          templateId: "",
          templateName: "",
        });
        setIsShowLoader(false);
      })
      .catch(() => {
        setIsShowLoader(false);
        notify("error", "Failed to duplicate template");
      });
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  useEffect(() => {
    if (!filters.some((filter) => filter.checked))
      fetchTemplates(); //call the api when every filter is removed
  }, [filters])

  const clearFilter = () => {
    setFilters((_filters) => {
      return _filters.map((_filter) => {
        return {
          ..._filter,
          checked: false,
          isOpen: false,
          value: "",
        };
      });
    });
  };

  const handleInput = (option: FilterItem, value: string) => {
    setFilters((_filter) => {
      return _filter.map((item) => {
        if (item.key === option.key) return { ...item, value };
        else return item;
      });
    });
  };

  const resetFilter = (option: FilterItem) => {
    setFilters((_filter) => {
      return _filter.map((item) => {
        if (item.key === option.key) {
          return {
            ...item,
            isOpen: false,
            checked: false,
            value: "",
          };
        } else return item;
      });
    });
  };

  const openInput = (option: FilterItem) => {
    setFilters((_filter) => {
      return _filter.map((item) => {
        if (item.key === option.key) {
          return {
            ...item,
            isOpen: true,
          };
        } else
          return {
            ...item,
            isOpen: false,
          };
      });
    });
  };

  const closeInput = (option: FilterItem) => {
    setFilters((_filter) => {
      return _filter.map((item) => {
        if (item.key === option.key) {
          return {
            ...option,
            isOpen: false,
          };
        } else return item;
      });
    });
  };

  return (
    <>
      {isShowLoader && <Loader text={""} />}
      <div className="flex flex-wrap justify-between items-center gap-5">
        <div className="flex flex-wrap gap-5">
          <Filter filters={filters} setFilters={setFilters} />
          {filters.some((filter) => filter.checked) && (
            <>
              <Button className="bg-larch-pink gap-2" onClick={fetchTemplates}>
                Apply Filter
              </Button>
              <Button
                iconLeft={<IconCross className="w-6 h-6" />}
                className="bg-larch-dark_3 gap-1"
                onClick={() => {
                  clearFilter();
                  fetchTemplates();
                }}
              >
                Clear
              </Button>
            </>
          )}
        </div>
        <Button
          iconLeft={<IconRefresh className="w-5 h-5" />}
          className="bg-larch-dark_2 border-2 border-dark-700 gap-2"
          onClick={() => {
            fetchTemplates();
          }}
        >
          Refresh
        </Button>
      </div>
      {filters.some((filter) => filter.checked) && (
        <div className="flex flex-wrap items-center gap-5 text-white">
          {filters.map((option, index) => {
            if (option.checked)
              return (
                <div
                  className="flex relative rounded-2xl border border-dark-700 bg-larch-dark_2 ps-3 pe-2 py-1 items-center gap-2"
                  key={index}
                >
                  <strong
                    className="cursor-pointer"
                    onClick={() => {
                      openInput(option);
                    }}
                  >
                    {option.label}
                  </strong>
                  <IconButton
                    className="p-0 m-0 w-5 h-5 rounded-full bg-white"
                    icon={
                      <IconCross className="w-full text-black h-full p-0 m-0" />
                    }
                    onClick={() => resetFilter(option)}
                  />
                  {option.isOpen && (
                    <FilterInput
                      item={option}
                      handler={(value) => handleInput(option, value)}
                      close={() => closeInput(option)}
                    />
                  )}
                </div>
              );
          })}
        </div>
      )}
      <div className="flex flex-col justify-between">
        <TemplateListTable
          templateList={templateList}
          setDuplicateTemplateObj={setDuplicateTemplateObj}
          onCreateModal={onCreateModal}
          editNetwork={editNetwork}
          setSort={setSort}
          sort={sort}
          setDeleteTemplateObj={setDeleteTemplateObj}
        />
        <PopUpBox
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onConfirm={onNetworkCreate}
          templateId={createNetTemplateId}
          type={networkType}
        />
        <DeletePopUpBox
          setIsOpen={setDeleteTemplateObj}
          onConfirm={onTemplateDelete}
          deleteTemplateObj={deleteTemplateObj}
        />
        <DuplicateTempPopUpBox
          onConfirm={onTemplateDuplicate}
          duplicateTemplateObj={duplicateTemplateObj}
          setDuplicateTemplateObj={setDuplicateTemplateObj}
        />
        {templateList.length > 0 && (
          <div className="flex flex-row justify-end">
            <PaginatedItems
              itemsPerPage={itemPerPage}
              totalRecords={meta.total}
              onPageChange={onPageChange}
            />
          </div>
        )}
      </div>
    </>
  );
}
