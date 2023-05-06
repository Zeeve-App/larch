import { useEffect, useState } from "react";
import NetworkListTable from "./table";
import PaginatedItems from "../../../components/pagination";
import { deleteNetwork, getNetworkList } from "../../../utils/api";
import { notify } from "../../../utils/notifications";
import DeletePopUpBox from "./modaldelete";
import Loader from "../../../components/loader";
import { Filter } from "src/components/Filter/Filter";
import { Button, IconButton } from "src/components/Button";
import { FilterItem } from "src/components/Filter/type";
import { ReactComponent as IconRefresh } from "src/assets/Refresh.svg";
import { ReactComponent as IconCross } from "src/assets/Cross.svg";
import { FilterInput } from "src/components/Filter/FilterInput";

export default function Listing() {
  const [networkList, setNetworkList] = useState<any[]>([]);
  const [meta, setMeta] = useState<{ total: number }>({ total: 0 });
  const [itemPerPage] = useState(5);
  const [pageNum, setPageNum] = useState(1);
  const [sort, setSort] = useState<boolean>(true);
  const [deleteNetworkName, setDeleteNetwork] = useState("");
  const [isShowLoader, setIsShowLoader] = useState<boolean>(false);
  const [updateList, setUpdateList] = useState(true);

  const defaultModalView = {
    test: false,
    delete: false,
  };
  const [isOpen, setIsOpen] = useState(defaultModalView);

  const [filters, setFilters] = useState<FilterItem[]>([
    {
      label: "Network Name",
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
      label: "Network Directory",
      key: "networkDirectory",
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
    {
      label: "Status",
      key: "status",
      checked: false,
      isOpen: false,
      type: "searchable",
      value: new Date().toISOString().split("T")[0],
    },
  ]);

  const setModalViewStatus = (modalSlug: string, status: boolean) => {
    setIsOpen({ ...defaultModalView, [modalSlug]: status });
  };

  const onPageChange = (pageNumOnChange: number) => {
    setPageNum(pageNumOnChange);
  };

  const onCreateModal = (name: string) => {
    setDeleteNetwork(name);
    setModalViewStatus("delete", true);
  };

  const onNetworkDelete = (networkName: string) => {
    setModalViewStatus("delete", false);
    setIsShowLoader(true);
    deleteNetwork(networkName)
      .then(() => {
        notify("success", `Deleted the network ("${networkName}")`);
      })
      .catch(() => {
        notify("error", `Failed delete the network ("${networkName}")`);
      })
      .finally(() => {
        fetchNetworkList();
        setIsShowLoader(false);
      });
  };

  const fetchNetworkList = () => {
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
    getNetworkList(payload)
      .then((response) => {
        setNetworkList(response.result);
        setMeta(response.meta);
        setIsShowLoader(false);
      })
      .catch(() => {
        setIsShowLoader(false);
        notify("error", "Failed to fetch activity list");
      });
  };
  useEffect(() => {
    fetchNetworkList();
  }, []);

  useEffect(() => {
    fetchNetworkList();
  }, [pageNum, sort, updateList]);

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
    setUpdateList((prev) => !prev);
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
              <Button className="bg-larch-pink gap-2" onClick={fetchNetworkList}>
                Apply Filter
              </Button>
              <Button
                iconLeft={<IconCross className="w-6 h-6" />}

                className="bg-larch-dark_3 gap-1"
                onClick={() => {
                  clearFilter();
                  fetchNetworkList();
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
            fetchNetworkList();
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
        <NetworkListTable
          networkList={networkList}
          setSort={setSort}
          sort={sort}
          onCreateModal={onCreateModal}
        />
        <DeletePopUpBox
          isOpen={isOpen.delete}
          setIsOpen={(status) => {
            setModalViewStatus("delete", status);
          }}
          onConfirm={onNetworkDelete}
          name={deleteNetworkName}
        />
        {networkList.length > 0 && (
          <div className="right-2 bottom-0 flex flex-row justify-end">
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
