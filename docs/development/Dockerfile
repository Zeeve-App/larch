FROM docker.io/library/ubuntu:22.04

RUN apt update && apt install apt-utils podman curl git -y
RUN useradd larch --user-group -m
USER larch