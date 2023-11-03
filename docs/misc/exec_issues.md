# Execution Issues

- Podman on Ubuntu 22.04
  - Network plugin compatibility:
    - `curl -OL http://archive.ubuntu.com/ubuntu/pool/universe/g/golang-github-containernetworking-plugins/containernetworking-plugins_1.1.1+ds1-3build1_amd64.deb`
    - `sudo dpkg -i containernetworking-plugins_1.1.1+ds1-3build1_amd64.deb`
  - Not responding (can cause network deletion issue)
    - `killall podman`
    - `podman pod rm -fa`
    - them delete the network from the Larch application also
  - Error in prometheus: `ts=2023-11-02T15:21:30.100Z caller=file.go:244 level=error component="discovery manager scrape" discovery=file config=dynamic msg="Error adding file watcher" err="too many open files"`
    - Solution is to increase the max watch limit:
      - `sudo sysctl -w fs.inotify.max_user_instances = 5000`
      - `sudo sysctl -w fs.inotify.max_user_watches = 655360`
