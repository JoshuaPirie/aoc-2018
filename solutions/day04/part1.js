const input = require("fs")
    .readFileSync(require("path")
        .resolve(__dirname, "input"), "utf8");

const objToKVArr = (obj, keyName = "key", valueName = "value") =>
    Object.keys(obj).map(key => ({
        [keyName]: key,
        [valueName]: obj[key]
    }));

const res = objToKVArr(
    input.split("\n")
        .slice(0, -1)
        .map(x => x.match(/^\[(\d+)-(\d+)-(\d+) (\d+):(\d+)\] (Guard #(\d+) begins shift|falls asleep|wakes up)$/))
        .map(x => ({
            date: new Date(...(x.slice(1, 6).map(x => parseInt(x)))),
            action: x[6],
            guardId: x[7]
        }))
        .sort((a, b) => a.date - b.date)
        .reduce((acc, curr) => {
            if (isNaN(curr.guardId)) {
                acc[acc.length - 1].actions.push({
                    minute: curr.date.getMinutes(),
                    action: curr.action
                });
            }
            else {
                acc.push({
                    date: curr.date,
                    guardId: curr.guardId,
                    actions: []
                });
            }
            return acc;
        }, [])
        .map(x => ({
            date: x.date,
            guardId: x.guardId,
            sleepTimes: x.actions.reduce((acc, curr) => {
                if (curr.action === "falls asleep")
                    acc.lastSleep = curr.minute
                else if (curr.action === "wakes up")
                    for (let i = acc.lastSleep; i < curr.minute; i++)
                        acc.times[i] = true;
                return acc;
            }, {
                lastSleep: -1,
                times: Array(60).fill(false)
            }).times
        }))
        .reduce((acc, curr) => {
            if (!(curr.guardId in acc))
                acc[curr.guardId] = []
            acc[curr.guardId].push({
                date: curr.date,
                sleepTimes: curr.sleepTimes,
            });
            return acc;
        }, {})
    , "guardId", "dates")
    .map(x => {
        x.totalSleepMins = x.dates.reduce((acc, curr) =>
            acc + curr.sleepTimes.filter(x => x).length, 0);
        x.maxSleepMin = x.dates
            .reduce((acc, curr) =>
                acc.map((x, i) =>
                    x + curr.sleepTimes[i]), Array(60).fill(0))
            .reduce((acc, curr, i, a) =>
                curr > a[acc] ? i : acc, 0);
        return x;
    })
    .reduce((acc, curr) =>
        curr.totalSleepMins > acc.totalSleepMins ? curr : acc);

console.log(parseInt(res.guardId) * res.maxSleepMin);
