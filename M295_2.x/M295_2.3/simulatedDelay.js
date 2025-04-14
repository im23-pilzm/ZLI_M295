
async function simuliereVerzoegerung(ms){
    let msPromise = new Promise((resolve) => {
        setTimeout(function () {resolve(ms);}, ms);
    });
    let time = await msPromise
    console.log(time)
}

simuliereVerzoegerung(2000)
let sum = 0

async function addiereNachVerzoegerung(a, b, ms){
    let addPromise = new Promise((resolve) => {
        setTimeout(function () {resolve(sum = a + b);}, ms)
    })
    sum = await addPromise
    console.log(sum)
}

addiereNachVerzoegerung(5, 8, 5000)