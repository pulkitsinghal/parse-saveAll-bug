parse-saveAll-bug
=================

To reproduce the bug:

1) `git clone https://github.com/pulkitsinghal/parse-saveAll-bug`

2) `cd parse-saveAll-bug/cloud-code/cloud/config` and add a `global.json` file with the keys for deploying to your parse instance

3) `cd parse-saveAll-bug/cloud-code/` and deploy with `parse deploy` ... this will put the afterSave code which helps simulate the buggy handling of errors by saveAll() into your parse instance

4) Our goal now is to run a testcase which will yield the stacktrace demonstrating the problem

5) `cd parse-saveAll-bug/client-code/`

6) `sudo npm install`

7) `export NODE_ENV=development` assuming you have created a development.json file with the keys pointing to your parse instance as shown in `development.json.sample`

8) Run the test `node bug.js` and you should see this stacktrace

```
/Users/username/dev/parse-saveAll-bug/client-code/node_modules/parse/build/parse-latest.js:6056
              if (response[i].success) {
                             ^
TypeError: Cannot read property 'success' of undefined
    at /Users/username/dev/parse-saveAll-bug/client-code/node_modules/parse/build/parse-latest.js:6056:30
    at Array.forEach (native)
    at Object._.each._.forEach [as _arrayEach] (/Users/username/dev/parse-saveAll-bug/client-code/node_modules/parse/build/parse-latest.js:95:11)
    at /Users/username/dev/parse-saveAll-bug/client-code/node_modules/parse/build/parse-latest.js:6055:19
    at wrappedResolvedCallback (/Users/username/dev/parse-saveAll-bug/client-code/node_modules/parse/build/parse-latest.js:3762:38)
    at /Users/username/dev/parse-saveAll-bug/client-code/node_modules/parse/build/parse-latest.js:3713:26
    at Array.forEach (native)
    at Object._.each._.forEach [as _arrayEach] (/Users/username/dev/parse-saveAll-bug/client-code/node_modules/parse/build/parse-latest.js:95:11)
    at _.extend.resolve (/Users/username/dev/parse-saveAll-bug/client-code/node_modules/parse/build/parse-latest.js:3712:13)
    at wrappedResolvedCallback (/Users/username/dev/parse-saveAll-bug/client-code/node_modules/parse/build/parse-latest.js:3771:27)
```

9) The suggested fix (you may/should remove the log statements) for error handling this cornercase can be found here: https://gist.github.com/pulkitsinghal/e82825671928fb09c596
