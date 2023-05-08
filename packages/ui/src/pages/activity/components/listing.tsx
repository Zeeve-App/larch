import { useEffect, useState } from "react";
import ActivityListTable from "./table";
import PaginatedItems from "../../../components/pagination";
import { getUserActivityList } from "../../../utils/api";
import { notify } from "../../../utils/notifications";
import { purgeActivityRecord } from "src/utils/api";
import Loader from "../../../components/loader";
import { Filter } from "src/components/Filter/Filter";
import { Button, IconButton } from "src/components/Button";
import { FilterItem } from "src/components/Filter/type";
import { ReactComponent as IconRefresh } from "src/assets/Refresh.svg";
import { ReactComponent as IconCross } from "src/assets/Cross.svg";
import { FilterInput } from "src/components/Filter/FilterInput";

type ListingProps = {
  updateList: boolean;
  setUpdateList: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Listing({ updateList, setUpdateList }: ListingProps) {
  const [activityList, setActivityList] = useState<any[]>([]);
  const [meta, setMeta] = useState<{ total: number }>({ total: 0 });
  const [itemPerPage] = useState(5);
  const [pageNum, setPageNum] = useState(1);
  const [sort, setSort] = useState<boolean>(true);
  const [isShowLoader, setIsShowLoader] = useState<boolean>(false);
  const [filters, setFilters] = useState<FilterItem[]>([
    {
      label: "Activity ID",
      key: "id",
      checked: false,
      isOpen: false,
      type: "searchable",
      value: "",
    },
    {
      label: "Operation Details",
      key: "operationDetail",
      checked: false,
      isOpen: false,
      type: "searchable",
      value: "",
    },
    {
      label: "Date",
      key: "createdAt",
      checked: false,
      isOpen: false,
      type: "date",
      value: "",
    },
    {
      label: "Operation",
      key: "operation",
      checked: false,
      isOpen: false,
      type: "searchable",
      value: "",
    },
  ]);

  const onPageChange = (pageNumOnChange: number) => {
    setPageNum(pageNumOnChange);
  };

  const fetchActivities = () => {
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
    getUserActivityList(payload)
      .then((response) => {
        setActivityList(response.result);
        setMeta(response.meta);
        setIsShowLoader(false);
      })
      .catch(() => {
        setIsShowLoader(false);
        notify("error", "Failed to fetch activity list");
      });
  };

  const purgeRecord = () => {
    purgeActivityRecord()
      .then(() => {
        setUpdateList(!updateList);
        notify("success", "Records purged successfully !!");
      })
      .catch(() => {
        notify("error", "Failed to Purge Record");
      });
  };
  useEffect(() => {
    fetchActivities();
  }, [pageNum, sort, updateList]);

  useEffect(() => {
    fetchActivities();
  }, []);

  useEffect(() => {
    if (!filters.some((filter) => filter.checked))
      fetchActivities(); //call the api when every filter is removed
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
      {isShowLoader && <Loader />}
      <div className="flex flex-wrap justify-between items-center gap-5">
        <div className="flex flex-wrap gap-5">
          <Filter filters={filters} setFilters={setFilters} />
          {filters.some((filter) => filter.checked) && (
            <>
              <Button className="bg-larch-pink gap-2" onClick={fetchActivities}>
                Apply Filter
              </Button>
              <Button
                iconLeft={<IconCross className="w-6 h-6" />}
                className="bg-larch-dark_3 gap-1"
                onClick={() => {
                  clearFilter();
                  // filterData();
                }}
              >
                Clear
              </Button>
            </>
          )}
        </div>
        <div className="flex flex-wrap gap-5">
          <Button
            iconLeft={<IconRefresh className="w-5 h-5" />}
            className="bg-larch-dark_2 border-2 border-dark-700 gap-2"
            onClick={() => {
              fetchActivities();
            }}
          >
            Refresh
          </Button>
          <Button className="bg-larch-dark_2 border-2 border-dark-700 gap-2" onClick={purgeRecord}>
            Purge Record Activities
          </Button>
        </div>
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
        <ActivityListTable
          activityList={activityList}
          setSort={setSort}
          sort={sort}
        />
        {activityList.length > 0 && (
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
