import { useState } from "react";
import NavBar from "./components/Navbar";
import { useNavigate } from "react-router-dom";

import Step01 from "./components/steps/Step01";
import Step02 from "./components/steps/Step02";
import Step03 from "./components/steps/Step03";
import Step04 from "./components/steps/Step04";
import Step05 from "./components/steps/Step05";

export default function Page() {
    const [pageSlug, setPageSlug] = useState<
        | "settings"
        | "relaychain_config"
        | "parachain_config"
        | "hrmp"
        | "test_config"
    >("settings");

    const navigate = useNavigate();

    return (
        <div className="my-2">
            <NavBar pageSlug={pageSlug} setSlug={setPageSlug} />
            <>
                {pageSlug === "settings" && (
                    <Step01
                        onNextStep={() => setPageSlug("relaychain_config")}
                        onPreviousStep={() => {
                            navigate("/network");
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
