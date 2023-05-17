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
export default function Documentation() {
  return (
    <div className="flex flex-row-reverse justify-between text-white h-full">
      <div className="w-[674px] border-l-2 border-dark-700 p-6">
        <ol className="pl-5 flex flex-col gap-3 list-decimal">
          <li>
            <a href="#about">About</a>
          </li>
          <li className="gap-3">
            <a href="#usage">Usage</a>
            <ol className="gap-3 no-underline list-[lower-alpha] list-inside">
              <li>
                <a href="#create-template">Create Template</a>
              </li>
              <li>
                <a href="#create-network">Create Network</a>
              </li>
              <li>
                <a href="#network-management">Network Management</a>
              </li>
            </ol>
          </li>
          <li className="gap-3">
            <a href="#components">Components</a>
            <ol className="gap-3 no-underline list-[lower-alpha] list-inside">
              <li>
                <a href="#dashboard">Dashboard</a>
              </li>
              <li>
                <a href="#networks">Networks</a>
              </li>
              <li>
                <a href="#template">Template</a>
              </li>
              <li>
                <a href="#executions">Executions</a>
              </li>
              <li>
                <a href="#activity">Activity</a>
              </li>
            </ol>
          </li>
        </ol>
      </div>
      <article
        className="doc overflow-auto p-6 flex flex-col gap-6"
      >
        <div className="bg-larch-dark_2 border-4 border-larch-dark_3 p-6 rounded-lg">
          <h1 className="text-[48px] mb-3">Larch Documentation</h1>
          <p className="text-[18px] leading-8">
            Zombienet's GUI companion
          </p>
        </div>
        <section className="bg-larch-dark_2 grid gap-5  border-4 border-larch-dark_3 p-6 rounded-lg">
          <h2 id="about" className="text-[32px]">
            About
          </h2>
          <ul className="list-circle grid gap-3 pl-3 text-[18px]">
            <li>Larch is a UI component for Zombienet CLI.</li>
            <li>
              With Larch as a Zombienet's UI, one can create network and test
              configuration with assistance and ease.
            </li>
            <li>
              Larch also provide Network management and logs view capabilities.
            </li>
          </ul>
        </section>

        <section className="bg-larch-dark_2 grid gap-6  border-4 border-larch-dark_3 p-6 rounded-lg">
          <h2 id="usage" className="text-[32px]">
            Usage
          </h2>
          <div className="grid gap-5">
            <div className="grid gap-6 p-6 rounded-xl border-4 border-larch-dark_3">
              <div className="grid gap-1">
                <h3 id="create-template" className="text-[24px]">Create Template</h3>
                <p className="text-[18px] leading-8">
                  Larch manages Zombienet based network configuration as
                  templates, which can be used to deploy the networks.
                </p>
              </div>
              <div className="grid gap-3">
                <p className="text-[18px] leading-8">
                  The Template creation consists of five sections :
                </p>
                <ul className="list-circle grid gap-3 pl-6 text-[18px]">
                  <li>Settings</li>
                  <li>Relaychain</li>
                  <li>Parachain</li>
                  <li>HRMP Channels</li>
                  <li>Test Configuration</li>
                </ul>
                <p className="text-[18px] leading-8">
                  The combination of these configuration is used to create
                  Zombienet Network & Testing configuration.
                </p>
              </div>
            </div>
            <div className="grid gap-6 p-6 rounded-xl border-4 border-larch-dark_3">
              <div className="grid gap-1">
                <h3 id="create-network" className="text-[24px]">
                  Create Network (Evaluation & Testing)
                </h3>
              </div>
              <div className="grid gap-3">
                <p className="text-[18px] leading-8">
                  Network's can be created for both Evaluation & Testing.
                </p>
                <ul className="list-circle grid gap-3 pl-6 text-[18px]">
                  <li>
                    Evaluation network is a network used for do manual
                    transactions and additional evaluations of the network as
                    required.
                  </li>
                  <li>
                    Testing network is a network which will create network based
                    on network configuration and then do specified operations in
                    testing configuration and then deletes the network once the
                    network is tested.
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid gap-6 p-6 rounded-xl border-4 border-larch-dark_3">
              <div className="grid gap-1">
                <h3 id="network-management" className="text-[24px]">Network Management</h3>
                <p className="text-[18px] leading-8">
                  Once a network is created for either evaluating or testing the network, a certain
                  operations can be performed on the network and these are:
                  <ul className="list-circle grid gap-3 pl-6 text-[18px]">
                    <li>Delete Network</li>
                    <li>View Command</li>
                    <li>View Output</li>
                  </ul> 
                </p>
                <h4 id="network-management" className="text-[18px]">Delete Network</h4>
                <p className="text-[18px] leading-8">
                  Deletion of network can be done at any stage of network lifecycle (creation, running, etc.).<br/>
                  Deletion can be performed by navigating to My Network page and then click on delete icon under Action column present against the network record,
                  then confirmation dialog box will appear, click on confirm to initiate deletion process.
                </p>
                <h4 id="network-management" className="text-[18px]">View Command</h4>
                <p className="text-[18px] leading-8">
                  Zombienet command can be viewed for which it was issued to create the network<br/>
                  To view the command navigate to network page, and click on eye icon under action column present against the network record, this will navigate to executions page with network filtered.<br/>
                  In the execution record under Operation column click on the command button, this will open command details.
                </p>
                <h4 id="network-management" className="text-[18px]">View Output</h4>
                <p className="text-[18px] leading-8">
                  Zombienet CLI output can be viewed for a created the network<br/>
                  To view the output, navigate to network page, and click on eye icon under action column present against the network record, this will navigate to executions page with the network filtered.<br/>
                  In the execution record under Operation column click on the output button, this will open output for the Zombienet. The Output window contains both Standard output and Standard Error streams.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-larch-dark_2 grid gap-6  border-4 border-larch-dark_3 p-6 rounded-lg">
          <h2 id="components" className="text-[32px]">
            Components
          </h2>
          <div className="grid gap-5">
            <div className="grid gap-6 p-6 rounded-xl border-4 border-larch-dark_3">
              <div className="grid gap-1">
                <h3 id="dashboard" className="text-[24px]">Dashboard</h3>
                <p className="text-[18px] leading-8">
                  Dashboard contains the stats and version info of the Larch
                  application.
                </p>
              </div>
            </div>
            <div className="grid gap-6 p-6 rounded-xl border-4 border-larch-dark_3">
              <div className="grid gap-1">
                <h3 id="networks" className="text-[24px]">Networks</h3>
                <p className="text-[18px] leading-8">
                  Network page contains the listing of created networks for
                  either Evaluation or Testing.
                </p>
              </div>
              <div className="grid gap-3">
                <p className="text-[18px] leading-8">Features</p>
                <ul className="list-circle grid gap-3 pl-6 text-[18px]">
                  <li>Listing of Networks</li>
                  <li>Delete network, View Logs & Invocation Command</li>
                </ul>
              </div>
            </div>
            <div className="grid gap-6 p-6 rounded-xl border-4 border-larch-dark_3">
              <div className="grid gap-1">
                <h3 id="template" className="text-[24px]">Template</h3>
                <p className="text-[18px] leading-8">
                  List Network templates and manage them.
                </p>
              </div>
              <div className="grid gap-3">
                <p className="text-[18px] leading-8">Features</p>
                <ul className="list-circle grid gap-3 pl-6 text-[18px]">
                  <li>Listing of Network Templates</li>
                  <li>
                    Edit, Delete, Create Network (Evaluation), Create Test
                    Network (For Test Network), Duplicate Template Network
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid gap-6 p-6 rounded-xl border-4 border-larch-dark_3">
              <div className="grid gap-1">
                <h3 id="executions" className="text-[24px]">Executions</h3>
                <p className="text-[18px] leading-8">
                  List Network execution's command and output.
                </p>
              </div>
              <div className="grid gap-3">
                <p className="text-[18px] leading-8">Features</p>
                <ul className="list-circle grid gap-3 pl-6 text-[18px]">
                  <li>View command used to initiate the network creation</li>
                  <li>View network execution output (both Standard output and standard error streams)</li>
                </ul>
              </div>
            </div>
            <div className="grid gap-6 p-6 rounded-xl border-4 border-larch-dark_3">
              <div className="grid gap-1">
                <h3 id="activity" className="text-[24px]">Activity</h3>
                <p className="text-[18px] leading-8">
                  List of activities performed by the user.
                </p>
              </div>
              <div className="grid gap-3">
                <p className="text-[18px] leading-8">Features</p>
                <ul className="list-circle grid gap-3 pl-6 text-[18px]">
                  <li>Listing of activities performed by the user using Larch</li>
                  <li>Purge activities records</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}
