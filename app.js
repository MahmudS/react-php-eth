let helper = require('./helper');

// if (process.platform === "win32") {
//     let rl = require("readline").createInterface({
//         input: process.stdin,
//         output: process.stdout
//     });
//     rl.on("SIGINT", function () {
//         process.emit("SIGINT");
//     });
// }

// process.on("SIGINT", function () {
//     helper.setStop(true);
//     console.log('Stop command called');
//     helper.savePrivateKeyToFile('exit');
// });


function start()
{
    helper.setStop(false);
    helper.setLimit(256000);
    helper.initConsoleLog();

    let promise = helper.getPromise();

    return promise.then(
        () => {
            return helper.readWalletList();
        }
    ).then(
        (count) => {
            return new Promise((resolve, reject) => {
                if (!count) {
                    reject(401, {err: 'count is empty'});
                    return
                }
                resolve(count);
            });
        }
    ).then(
        (count) => {
            let currentThread = helper.getThreadNumber();
            let totalThreads = helper.getTotalThreads();
            console.log('Started from random value, thread ' + currentThread + ' from ' + totalThreads);
            helper.setRandom(true);
            return helper.callMainFunction();
        }
    ).catch(
        (json) => {
            console.log(json);
        }
    );
}

start();