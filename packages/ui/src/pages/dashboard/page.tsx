/* eslint-disable max-len */
import { useEffect, useState } from "react";
import { ReactComponent as IconNetwork } from "src/assets/MyNetwork.svg";
import { ReactComponent as IconTemplate } from "src/assets/Template.svg";
import { ReactComponent as IconActivity } from "src/assets/Activity.svg";
import { ReactComponent as IconEdit } from "src/assets/UserEditor.svg";
import Card from "./components/card";
import {
  getNetworkList,
  getRunList,
  getTemplateList,
  getUserActivityList,
} from "../../utils/api";

export default function Dashboard() {
  const [networkRecords, setNetworkRecords] = useState("NA");
  const [templateRecords, setTemplateRecords] = useState("NA");
  const [runListRecords, setRunListRecords] = useState("NA");
  const [activityRecords, setActivityRecords] = useState("NA");

  useEffect(() => {
    const networkRecordsRes = getNetworkList({ meta: { numOfRec: 0 } }).then(
      (data) => data.meta.total
    );
    const templateRecordsRes = getTemplateList({ meta: { numOfRec: 0 } }).then(
      (data) => data.meta.total
    );
    const runListRecordsRes = getRunList({ meta: { numOfRec: 0 } }).then(
      (data) => data.meta.total
    );
    const activityRecordsRes = getUserActivityList({
      meta: { numOfRec: 0 },
    }).then((data) => data.meta.total);
    Promise.allSettled([
      networkRecordsRes,
      templateRecordsRes,
      runListRecordsRes,
      activityRecordsRes,
    ]).then((values) => {
      setNetworkRecords(
        values[0].status === "fulfilled" ? values[0].value.toString(10) : "NA"
      );
      setTemplateRecords(
        values[1].status === "fulfilled" ? values[1].value.toString(10) : "NA"
      );
      setRunListRecords(
        values[2].status === "fulfilled" ? values[2].value.toString(10) : "NA"
      );
      setActivityRecords(
        values[3].status === "fulfilled" ? values[3].value.toString(10) : "NA"
      );
    });
  }, []);
  return (
    <div className="h-full w-full bg-dark p-6 relative">
      <div className="flex flex-col gap-6 rounded-2xl border-solid box-border">
        <h3 className="text-white font-rubik text-4xl font-semibold text-left">
          Explore Dashboard
        </h3>
        <div className="w-full grid lg:grid-cols-4 md:grid-cols-2 gap-6">
          <Card
            cardTitle="Networks"
            cardLink="/network"
            cardIcon={<IconNetwork className="text-white w-8 h-8" />}
            cardDescription=" Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus
            beatae modi voluptas molestiae"
            records={networkRecords}
          />
          <Card
            cardTitle="Templates"
            cardLink="/templates"
            cardIcon={<IconTemplate className="text-white w-8 h-8" />}
            cardDescription=" Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus
          beatae modi voluptas molestiae"
            records={templateRecords}
          />
          <Card
            cardTitle="Executions"
            cardLink="/executions"
            cardIcon={<IconEdit className="text-white w-8 h-8" />}
            cardDescription=" Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus
            beatae modi voluptas molestiae"
            records={runListRecords}
          />
          <Card
            cardTitle="Activity"
            cardLink="/activity"
            cardIcon={<IconActivity className="text-white w-8 h-8" />}
            cardDescription=" Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus
            beatae modi voluptas molestiae"
            records={activityRecords}
          />
        </div>
      </div>
    </div>
  );
}
