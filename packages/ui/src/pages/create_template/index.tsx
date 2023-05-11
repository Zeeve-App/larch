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
import NavBar from "./components/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { useCreateTemplate } from "src/store/CreateTemplate";

import Step01 from "./components/steps/Step01";
import Step02 from "./components/steps/Step02";
import Step03 from "./components/steps/Step03";
import Step04 from "./components/steps/Step04";
import Step05 from "./components/steps/Step05";
import Loader from "src/components/loader";

export default function Page() {
  const [pageSlug, setPageSlug] = useState<
    | "settings"
    | "relaychain_config"
    | "parachain_config"
    | "hrmp"
    | "test_config"
  >("settings");
  const [isShowLoader, setIsShowLoader] = useState<boolean>(false);

  const navigate = useNavigate();
  const { state } = useLocation();
  const {
    templateId,
    updateTemplateFromSource,
    resetTemplate,
  } = useCreateTemplate();

  useEffect(() => {
    if (state && state.templateId) {
      setIsShowLoader(true);
      updateTemplateFromSource(state.templateId)
        .catch(() => {
          navigate("/templates");
        })
        .finally(() => {
          setIsShowLoader(false);
        })
    } else if (templateId === null) {
      resetTemplate();
    }
  }, [state]);

  return (
    <div className="h-full flex flex-col">
      {isShowLoader && <Loader />}
      <NavBar pageSlug={pageSlug} setSlug={setPageSlug} />
      <>
        {pageSlug === "settings" && (
          <Step01
            onNextStep={() => setPageSlug("relaychain_config")}
            onPreviousStep={() => {
              navigate("/templates");
            }}
          />
        )}
      </>
      <>
        {pageSlug === "relaychain_config" && (
          <Step02
            onNextStep={() => setPageSlug("parachain_config")}
            onPreviousStep={() => {
              setPageSlug("settings");
            }}
          />
        )}
      </>
      <>
        {pageSlug === "parachain_config" && (
          <Step03
            onNextStep={() => setPageSlug("hrmp")}
            onPreviousStep={() => {
              setPageSlug("relaychain_config");
            }}
          />
        )}
      </>
      <>
        {pageSlug === "hrmp" && (
          <Step04
            onNextStep={() => setPageSlug("test_config")}
            onPreviousStep={() => {
              setPageSlug("parachain_config");
            }}
          />
        )}
      </>
      <>
        {pageSlug === "test_config" && (
          <Step05
            onNextStep={() => { }}
            onPreviousStep={() => {
              setPageSlug("hrmp");
            }}
          />
        )}
      </>
    </div>
  );
}
