### Create a temporary working directory to make your package in. Follow the same naming convention we have seen before. For example:
- `mkdir larch_1.0.0_amd64`
### Put your program files where they should be installed to on the target system. For example, suppose you want your program to be installed to /usr/local/bin:
- `mkdir -p larch_1.0.0_amd64/usr/local/bin`
### Then copy the executable file in there:
- `cp ~/$(LARCH_BINARY_LOCATION) larch_1.0.0_amd64/usr/local/bin/`
### Let's create the DEBIAN folder first:
- `mkdir larch_1.0.0_arm64/DEBIAN`
### And then create the empty control file:
- `touch larch_1.0.0_amd64/DEBIAN/control`


### The control file is just a list of data fields. For binary packages there is a minimum set of mandatory ones:

```
Package: larch
Version: 1.0.0
Architecture: amd64
Maintainer: Antar Basu <antar.basu@zeeve.io>, Jasti Sri Radhe Shyam <radheshyam.jasti@zeeve.io>
Description: In this guilde you will know about the usage of the Larch-Cli.
 The Larch-Cli is for managing polkadot parachain configuration API only mode and UI only mode.

```

### This is the last step. Invoke dpkg-deb as following:
- `dpkg-deb --build --root-owner-group <package-dir>`
### So in our case:
- `dpkg-deb --build --root-owner-group larch_1.0.0_amd64`

Your deb package is created, you can find more information from the reference.

## Reference

- [deb-package-creation](https://www.internalpointers.com/post/build-binary-deb-package-practical-guide)