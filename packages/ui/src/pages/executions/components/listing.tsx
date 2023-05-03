import { useEffect, useState } from "react";
import RunListTable from "./table";
import PaginatedItems from "../../../components/pagination";
import { getRunList } from "../../../utils/api";
import { notify } from "../../../utils/notifications";
import CommandModal from "./commandModal";
import StandardOutputModal from "./standardOutputModal";
import Loader from "../../../components/loader";
import { Filter } from "src/components/Filter/Filter";
import { Button, IconButton } from "src/components/Button";
import { FilterItem } from "src/components/Filter/type";
import { ReactComponent as IconRefresh } from "src/assets/Refresh.svg";
import { ReactComponent as IconCross } from "src/assets/Cross.svg";
import { FilterInput } from "src/components/Filter/FilterInput";
import { useSearchParams } from "react-router-dom";

export default function Listing() {
  const [runList, setRunList] = useState<any[]>([]);
  const [meta, setMeta] = useState<{ total: number }>({ total: 0 });
  const [itemPerPage] = useState(5);
  const [pageNum, setPageNum] = useState(1);
  const [sort, setSort] = useState<boolean>(true);
  const [isShowLoader, setIsShowLoader] = useState<boolean>(false);
  const [query] = useSearchParams();

  const id = query.get("id");
  const opearation = query.get("intention");
  const networkName = query.get("networkName");
  const statusCode = query.get("statusCode");
  const date = query.get("createdAt");

  const [filters, setFilters] = useState<FilterItem[]>([
    {
      label: "ID",
      key: "id",
      checked: id ? true : false,
      isOpen: false,
      type: "searchable",
      value: id || "",
    },
    {
      label: "Operation",
      key: "intention",
      checked: opearation ? true : false,
      isOpen: false,
      type: "searchable",
      value: opearation || "",
    },
    {
      label: "Network Name",
      key: "relatedId",
      checked: networkName ? true : false,
      isOpen: false,
      type: "searchable",
      value: networkName || "",
    },
    {
      label: "Status Code",
      key: "statusCode",
      checked: statusCode ? true : false,
      isOpen: false,
      type: "searchable",
      value: statusCode || "",
    },
    {
      label: "Date",
      key: "createdAt",
      checked: date ? true : false,
      isOpen: false,
      type: "date",
      value: date || "",
    },
  ]);

  const defaultModalView = {
    command: false,
    standardOutput: false,
    standardError: false,
  };
  const [isOpen, setIsOpen] = useState(defaultModalView);
  const [runId, setRunId] = useState("");

  const onPageChange = (pageNumOnChange: number) => {
    setPageNum(pageNumOnChange);
  };

  const setModalViewStatus = (modalSlug: string, status: boolean) => {
    setIsOpen({ ...defaultModalView, [modalSlug]: status });
  };

  const onViewCommand = (id: string) => {
    setRunId(id);
    setModalViewStatus("command", true);
  };

  const onStandardOutput = (id: string) => {
    setRunId(id);
    setModalViewStatus("standardOutput", true);
  };

  const fetchRunList = () => {
    setIsShowLoader(true);
    const payload = {
      meta: {
        pageNum,
        numOfRec: itemPerPage,
      },
    };
    getRunList(payload)
      .then((response) => {
        setRunList(response.result);
        setMeta(response.meta);
        setIsShowLoader(false);
      })
      .catch(() => {
        setIsShowLoader(false);
        notify("error", "Failed to fetch activity list");
      });
  };

  const filterData = () => {
    const filter: { [name: string]: string } = {};
    filters.forEach((item) => {
      if (item.value) filter[item.key] = item.value;
    });

    if (
      filter &&
      Object.keys(filter).length === 0 &&
      Object.getPrototypeOf(filter) === Object.prototype
    )
      return;

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
    getRunList(payload)
      .then((response) => {
        setRunList(response.result);
        setMeta(response.meta);
        setIsShowLoader(false);
      })
      .catch(() => {
        setIsShowLoader(false);
        notify("error", "Failed to fetch activity list");
      });
  };
  useEffect(() => {
    filterData();
  }, [pageNum, sort]);

  useEffect(() => {
    if (filters.some((filter) => filter.checked)) filterData();
    else fetchRunList();
  }, []);

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
      {isShowLoader && <Loader />}
      <div className="flex flex-wrap justify-between items-center gap-5">
        <div className="flex flex-wrap gap-5">
          <Filter filters={filters} setFilters={setFilters} />
          {filters.some((filter) => filter.checked) && (
            <>
              <Button className="bg-larch-pink gap-2" onClick={filterData}>
                Apply Filter
              </Button>
              <Button
                iconLeft={<IconCross className="w-6 h-6" />}
                className="bg-larch-dark_3 gap-1"
                onClick={() => {
                  clearFilter();
                  fetchRunList();
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
            clearFilter();
            fetchRunList();
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
        <RunListTable
          onViewCommand={onViewCommand}
          onViewStandardOutput={onStandardOutput}
          runList={runList}
          setSort={setSort}
          sort={sort}
        />
        {runList.length > 0 && (
          <div className="right-2 bottom-0 flex flex-row justify-end">
            <PaginatedItems
              itemsPerPage={itemPerPage}
              totalRecords={meta.total}
              onPageChange={onPageChange}
            />
          </div>
        )}
      </div>
      {isOpen.command && (
        <CommandModal
          isOpen={isOpen.command}
          setIsOpen={(status) => {
            setModalViewStatus("command", status);
          }}
          runId={runId}
        />
      )}
      {isOpen.standardOutput && (
        <StandardOutputModal
          isOpen={isOpen.standardOutput}
          setIsOpen={(status) => {
            setModalViewStatus("standardOutput", status);
          }}
          runId={runId}
        />
      )}
    </>
  );
}
