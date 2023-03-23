#!/bin/bash

podman_container="zombinet-podman-testing-env"
# buildah rm "${podman_container}" 2> /dev/null
layer_1=${podman_container}_1
buildah from --name "${layer_1}" docker.io/library/ubuntu:22.04
buildah containers
# buildah images
buildah run $layer_1 -- sh -c 'apt update && apt install apt-utils podman curl git -y'
layer_2=${podman_container}_2
buildah commit ${layer_1} ${layer_1} 
# buildah run $podman_container -- sh -c 'mount --make-rshared /'
buildah rm "${layer_2}" 2> /dev/null
buildah from --name "${layer_2}" localhost/${layer_1}
buildah run $layer_2 -- sh -c 'useradd larch --user-group -m'
buildah run $layer_2 -- sh -c 'echo larch:90000:5000 > /etc/subuid;'
buildah run $layer_2 -- sh -c 'echo larch:90000:5000 > /etc/subgid;'
buildah run $layer_2 -- sh -c 'usermod --password rootpass root'
buildah config --user larch:larch $layer_2
buildah config --workingdir /home/larch $layer_2
buildah config --created-by "jastisriradheshyam"  $layer_2
buildah config --author "Jasti Sri Radhe Shyam at zeeve.io @jastisriradheshyam" --label name=zombinet-podman-testing-env $podman_container
buildah unmount $layer_2
buildah commit $layer_2 zombinet-podman-testing-env
# podman image prune -f