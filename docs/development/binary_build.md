# Binary development docs
Nexe is a command-line utility that compiles Node.js application into a single executable file.
In our project we are using nexe to build the larch binary.

## install nexe globally
`npm i nexe -g`
## building binary
`nexe packages/cli/dist/index.js --build --python=$(which python3) --verbose`
## giving permission to execute 
`chmod +x larch`
## run the binary 
`./larch `

## Reference 
-[nexe](https://www.npmjs.com/package/nexe)