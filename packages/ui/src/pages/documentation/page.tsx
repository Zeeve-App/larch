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
                <a href="#tutorial">Tutorial</a>
              </li>
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
            <li>Larch is a UI component for the <a href="https://github.com/paritytech/zombienet" target="_blank">Zombienet CLI.</a></li>
            <li>
              With Larch Zombienet's UI, users can create network and test
              configurations with assistance and ease.
            </li>
            <li>
              Larch also provides network management and logs view capabilities.
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
                <h3 id="tutorial" className="text-[24px]">Tutorial</h3>
                <p className="text-[18px] leading-8">
                  The following link contains the Larch tutorial : <a className="text-blue-600 visited:text-purple-600" href="https://github.com/Zeeve-App/larch/blob/main/docs/user/tutorial.md" target="_blank" rel="noopener noreferrer">Larch Tutorial</a>
                </p>
              </div>
            </div>
            <div className="grid gap-6 p-6 rounded-xl border-4 border-larch-dark_3">
              <div className="grid gap-1">
                <h3 id="create-template" className="text-[24px]">Create Template</h3>
                <p className="text-[18px] leading-8">
                  Larch manages Zombienet-based network configurations as
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
                  The combination of these configurations is used to create
                  Zombienet networks & test configurations.
                </p>
              </div>
            </div>
            <div className="grid gap-6 p-6 rounded-xl border-4 border-larch-dark_3">
              <div className="grid gap-1">
                <h3 id="create-network" className="text-[24px]">
                  Create a Network (Evaluation & Testing)
                </h3>
              </div>
              <div className="grid gap-3">
                <p className="text-[18px] leading-8">
                  Networks can be created for both Evaluation & Testing.
                </p>
                <ul className="list-circle grid gap-3 pl-6 text-[18px]">
                  <li>
                    An evaluation network is a network used for dispatching manual
                    transactions and conducting additional evaluations of the network as
                    required.
                  </li>
                  <li>
                    A testing network is a network that's based on a network configuration
                    and does specified operations according to the testing configuration
                    and finally deletes the network once it's is tested.
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid gap-6 p-6 rounded-xl border-4 border-larch-dark_3">
              <div className="grid gap-1">
                <h3 id="network-management" className="text-[24px]">Network Management</h3>
                <p className="text-[18px] leading-8">
                  Once a network is created for the purpose of either evaluating or testing it,
                  certain operations can be performed on the network:
                  <ul className="list-circle grid gap-3 pl-6 text-[18px]">
                    <li>Monitor Network</li>
                    <li>Delete Network</li>
                    <li>View Command</li>
                    <li>View Output</li>
                  </ul>
                </p>
                <h4 id="network-management" className="text-[18px]">Monitor Network</h4>
                <p className="text-[18px] leading-8">
                  Monitoring of a network can be done when it's in <b>running state</b>.<br />
                  Monitoring can be performed by navigating to the <i>My Network</i> page, clicking on the monitoring icon under <i>Action</i> column present against the network record.
                  It'll open  new web page where you can login and click on the dashboard option available on the left navigation bar. Under dashboard section, click on the General
                  folder to open it. The General folder contains dashboards that provide a general overview of the network.
                </p>
                <h4 id="network-management" className="text-[18px]">Delete Network</h4>
                <p className="text-[18px] leading-8">
                  Deletion of a network can be done at any stage of its lifecycle (creation, running, etc.).<br />
                  Deletion can be performed by navigating to the <i>My Network</i> page, clicking on the delete icon under <i>Action</i> column present against the network record and finally
                  clicking on <i>confirm</i> in the confirmation dialog to initiate the deletion process.
                </p>
                <h4 id="network-management" className="text-[18px]">View Command</h4>
                <p className="text-[18px] leading-8">
                  Zombienet command can be viewed for which it was issued to create the network.<br />
                  To view the command navigate to the network page, and click on the eye icon in the <i>action</i> column present against the network record - this will navigate to the <i>executions</i> page with the network filtered.<br />
                  In the execution record in the <i>Operation</i> column click on the command button, this will open the command details.
                </p>
                <h4 id="network-management" className="text-[18px]">View Output</h4>
                <p className="text-[18px] leading-8">
                  The Zombienet CLI output can be viewed for a created the network<br />
                  To view the output, navigate to network page, and click on eye icon under action column present against the network record, this will navigate to the <i>executions</i> page with the network filtered.<br />
                  In the execution record in the <i>Operation</i> column click on the output button, this will open the output for the Zombienet. The Output window contains both Standard output and Standard Error streams.
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
                  The Dashboard contains the stats and version info of the Larch
                  application.
                </p>
              </div>
            </div>
            <div className="grid gap-6 p-6 rounded-xl border-4 border-larch-dark_3">
              <div className="grid gap-1">
                <h3 id="networks" className="text-[24px]">Networks</h3>
                <p className="text-[18px] leading-8">
                  The Network page contains the listing of created networks for
                  either Evaluation or Testing.
                </p>
              </div>
              <div className="grid gap-3">
                <p className="text-[18px] leading-8">Features</p>
                <ul className="list-circle grid gap-3 pl-6 text-[18px]">
                  <li>List networks</li>
                  <li>Monitor network</li>
                  <li>Delete networks, view logs & invoke commands</li>
                </ul>
              </div>
            </div>
            <div className="grid gap-6 p-6 rounded-xl border-4 border-larch-dark_3">
              <div className="grid gap-1">
                <h3 id="template" className="text-[24px]">Template</h3>
                <p className="text-[18px] leading-8">
                  List network templates and manage them.
                </p>
              </div>
              <div className="grid gap-3">
                <p className="text-[18px] leading-8">Features</p>
                <ul className="list-circle grid gap-3 pl-6 text-[18px]">
                  <li>List Network Templates</li>
                  <li>
                    Edit, Delete, Create Networks (Evaluations), Create Test
                    Networks (to test networks), Duplicate Template Network
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
