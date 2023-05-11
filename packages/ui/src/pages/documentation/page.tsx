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
        <ul className="flex flex-col gap-3">
          <li>
            <a href="#about">1. About</a>
          </li>
          <li className="grid gap-3">
            <a href="#usage">2. Usage</a>
            <ul className="pl-3 grid- gap-3 no-underline">
              <li>
                <a href="#create-template">1. Create Template</a>
              </li>
              <li>
                <a href="#create-network">2. Create Network</a>
              </li>
              <li>
                <a href="#network-management">3. Network Management</a>
              </li>
            </ul>
          </li>
          <li className="grid gap-3">
            <a href="#components">3. Components</a>
            <ul className="pl-3 grid gap-3 no-underline">
              <li>
                <a href="#dashboard">1. Dashbord</a>
              </li>
              <li>
                <a href="#networks">2. Networks</a>
              </li>
              <li>
                <a href="#template">3. Template</a>
              </li>
              <li>
                <a href="#activity">4. Activity</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <article
        className="doc overflow-auto p-6 flex flex-col gap-6"
      >
        <div className="bg-larch-dark_2 border-4 border-larch-dark_3 p-6 rounded-lg">
          <h1 className="text-[48px] mb-3">Larch Documentation</h1>
          <p className="text-[18px] leading-8">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus
            beatae modi voluptas molestiae magnam pariatur eum repudiandae?
            Omnis cumque natus, nam harum, repellat blanditiis sed quidem
            perferendis non eos maiores? Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Delectus beatae modi voluptas molestiae magnam
            pariatur eum repudiandae? Omnis cumque natus, nam harum, repellat
            blanditiis sed quidem perferendis non eos maiores?
          </p>
        </div>
        <section className="bg-larch-dark_2 grid gap-5  border-4 border-larch-dark_3 p-6 rounded-lg">
          <h2 id="about" className="text-[32px]">
            About
          </h2>
          <ul className="list-circle grid gap-3 pl-3 text-[18px]">
            <li>Larch is a UI component for Zombienet CLI.</li>
            <li>
              With Larch as a Zombient’s UI, one can create network and test
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
                  Network’s can be created for both Evaluation & Testing.
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
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Id
                  error laborum consequuntur dolorem quaerat accusantium quia
                  aliquid ad quo ex quibusdam totam cupiditate, ducimus facere
                  rem, consectetur iste fuga dolore.
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
                <h3 id="activity" className="text-[24px]">Activity</h3>
                <p className="text-[18px] leading-8">
                  List of activities performed by the user.
                </p>
              </div>
              <div className="grid gap-3">
                <p className="text-[18px] leading-8">Features</p>
                <ul className="list-circle grid gap-3 pl-6 text-[18px]">
                  <li>Listing of activities</li>
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
