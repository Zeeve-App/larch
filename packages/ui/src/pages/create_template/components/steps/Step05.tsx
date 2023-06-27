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

import { FC, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { Button } from "src/components/Button";
import { useCreateTemplate } from "src/store/CreateTemplate";
import Theme from "../Theme";
import PopUpBox from "../Modal";
import Loader from "src/components/loader";

const updateTestContent = (testContent: string, filename: string): string => {
  let content = testContent;
  if (content.search("Description:") === -1) {
    content = `Description: Sample network test\n${content}`;
  }
  const networkLine = `Network: ./${filename}`;
  if (content.search("Network:") === -1) {
    const contentSplit = content.split('\n');
    const index = contentSplit.findIndex((line)=> line.includes('Description:'))
    contentSplit.splice(index+1, 0, networkLine)
    content = contentSplit.join('\n');
  } else {
    content = content.replace(/^.*Network:.*$/gm, networkLine);
  }
  return content.trim();
};

export interface Step05Props {
  onNextStep: () => void;
  onPreviousStep: () => void;
}

const Step05: FC<Step05Props> = ({ onNextStep, onPreviousStep }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isShowLoader, setIsShowLoader] = useState<boolean>(false);

  const {
    testConfig,
    setTestConfig,
    settings,
    updateTemplateOnSource,
  } = useCreateTemplate();

  const onChange = useCallback((value: any) => {
    setTestConfig({ ...testConfig, editorValue: value });
  }, []);

  const onNetworkCreate = () => {
    setIsOpen(false);
    setIsShowLoader(true);
    updateTemplateOnSource()
      .then(() => {
        navigate("/templates");
      })
      .finally(() => {
        setIsShowLoader(false);
      });
  };

  useEffect(() => {
    setTestConfig({
      ...testConfig,
      editorValue: updateTestContent(
        testConfig.editorValue,
        `${settings.networkName}-config.json`
      ),
    });
  }, []);

  return (
    <div className="flex flex-col h-full">
      {isShowLoader && <Loader />}
      <div className="flex-grow overflow-auto p-6">
        <div className="border-dark-700 border-4 rounded-lg">
          <CodeMirror
            value={updateTestContent(
              testConfig.editorValue,
              `${settings.networkName}-config.json`
            )}
            className="p-2 text-lg"
            height="600px"
            theme={Theme}
            placeholder="Enter here you text..."
            extensions={[javascript({ jsx: true })]}
            onChange={onChange}
          />
          <div className="border-t-4 border-dark-700 px-2">
            {" "}
            <div className="flex justify-end py-2">
              <Button
                className="bg-larch-dark_3"
                onClick={() => {
                  setTestConfig({ ...testConfig, editorValue: "" });
                }}
              >
                Reset
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b-2 border-dark-700 mt-5" />
      <div className="flex justify-end p-5 gap-4">
        <Button
          className="bg-larch-dark_2 hover:bg-larch-dark_3"
          onClick={onPreviousStep}
        >
          Back
        </Button>
        <Button className="bg-larch-pink" onClick={() => setIsOpen(true)}>
          Save
        </Button>
      </div>
      <PopUpBox
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onConfirm={onNetworkCreate}
      />
    </div>
  );
};

export default Step05;
