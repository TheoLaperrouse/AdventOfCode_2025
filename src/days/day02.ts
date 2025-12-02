const invalidNumberPart1 = (value: string): number => {
    const len = value.length;
    if (len % 2 !== 0) {
        return 0;
    }
    const half = len / 2;
    return value.slice(0, half) === value.slice(half) ? Number(value) : 0;
};

export function part1(input: string) {
    let sum = 0;

    for (const idRange of input.trim().split(",")) {
        const [start, end] = idRange.split("-").map(Number);

        for (let value = start; value <= end; value++) {
            sum += invalidNumberPart1(String(value));
        }
    }

    return sum;
}

const invalidNumberPart2 = (value: string): number => {
    const len = value.length;
    for (let size = 1; size <= len / 2; size++) {
        if (len % size !== 0) {
            continue;
        }

        const pattern = value.slice(0, size);
        const repeatedPattern = pattern.repeat(len / size);

        if (repeatedPattern === value) {
            return Number(value);
        }
    }

    return 0;
};

export function part2(input: string) {
    let sum = 0;

    for (const idRange of input.trim().split(",")) {
        const [start, end] = idRange.split("-").map(Number);

        for (let value = start; value <= end; value++) {
            sum += invalidNumberPart2(String(value));
        }
    }

    return sum;
}

export default function (input: string) {
    return {
        part1: part1(input),
        part2: part2(input),
    };
}
