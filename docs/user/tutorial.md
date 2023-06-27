# Tutorial

This tutorial will consist of creating template and network from the created template

1. Download the larch binary from releases: https://github.com/Zeeve-App/larch/releases
2. Install Podman on the system to orchestrate the Zombienet networks.
3. Give execute permissions to larch binary: `chmod 755 larch`, Run the larch binary by doing: `./larch`
4. Open `http://localhost:9000` in the browser
5. Click on `Network Template +` button, present at the top of page
6. Name the template: `sample-template`, leave other options as it is and click `next` at the bottom of the page
7. We are in `Relaychain Configuration` section, Some of the fields are prefilled, now in the `Nodes` sub sections, 
    - add value `alice` in the `name` field, select `validator` option, click `+` icon button present inside the `Nodes` sub section, this will add new node input section.
    - In the new node box, add value `bob` in the `name` field, select `validator` option, and again click on `+` icon button
    - Basically we added two nodes with validator enabled, now click next
8. Now we are in `Parachain Configuration` section
    - click on `+` icon button to add new parachain config.
    - set Parachain ID as `100`, (it can be any number)
    - set collator name as `collator01` and collator command: `polkadot-parachain`
    - now click on next
9. We can skip HRMP for this tutorial so we select next
10. Now we are in Test configuration section
    - the configuration will have description and network field prefilled (from network name)
    - append the given configuration below the existing config.
11. Click on save to save the template
12. Now template will be visible in Templates page, now click on create button to create network for evaluation
    - A dialog box will open, in this add network name and click confirm to start the network orchestration process.
    - Loader will start once the process is started application will redirect to networks page, and it would be in creating state
13. To view the command and execution logs, click on eye icon, this will redirect to executions page with network name filtered
    - To view command, click on command button this will open a modal with the command and other metadata
    - To view logs/output, click on output button this will open a modal with the standard and error stream output along with other metadata
14. The preceding step conclude the network creation.


```
Creds: config

# Tracing
# alice: trace with traceID 94c1501a78a0d83c498cc92deec264d9 contains ["answer-chunk-request", "answer-chunk-request"]

# metrics
alice: reports node_roles is 4
alice: reports sub_libp2p_is_major_syncing is 0

# histogram
alice: reports histogram polkadot_pvf_execution_time has at least 2 samples in buckets ["0.1", "0.25", "0.5", "+Inf"] within 100 seconds

# logs
bob: log line matches glob "*rted #1*" within 10 seconds
bob: log line matches "Imported #[0-9]+" within 10 seconds

# system events
bob: system event contains "A candidate was included" within 20 seconds
alice: system event matches glob "*was backed*" within 10 seconds

#parachain tests
alice: parachain 100 is registered within 225 seconds
alice: parachain 100 block height is at least 10 within 200 seconds
```