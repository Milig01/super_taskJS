

export function add(...args) {
    let result = 0n;

    for (let n of args) {
        result = BigInt(result) + BigInt(n);
    }

    return String(result);
}

export function multiply(...args) {
    let result = 1n;

    for (let n of args) {
        result = BigInt(result) * BigInt(n);
    }

    return String(result);
}

export function divide(a, b) {
    return String( BigInt(a) / BigInt(b) );
}

export function subtract(a, b) {
    return String( BigInt(a) - BigInt(b) );
}