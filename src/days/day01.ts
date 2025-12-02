export function part1(input: string) {
    const _lines = input.trim().split("\n");
    let sum = 50;
    let count = 0;
    for (const line of _lines) {
        const [dir, strNumber] = [line[0], line.slice(1)];
        const number = parseInt(strNumber);

        sum += dir === "L" ? -number : number;
        sum %= 100;

        if (sum === 0) {
            count++;
        }
    }
    return count;
}

export function part2(input: string) {
    const _lines = input.trim().split("\n");
    let sum = 50;
    let count = 0;
    for (const line of _lines) {
        const countAdd = sum === 0 ? 0 : 1;
        const [dir, strNumber] = [line[0], line.slice(1)];

        const number = parseInt(strNumber);

        const fullTurns = Math.abs(number / 100) | 0;
        count += fullTurns;

        const toAdd = number % 100;

        sum += dir === "L" ? -toAdd : toAdd;

        if (sum > 99) {
            sum -= 100;
            count += countAdd;
        } else if (sum < 0) {
            sum += 100;
            count += countAdd;
        } else if (sum === 0) {
            count += countAdd;
        }
    }
    return count;
}

export default function (input: string) {
    return {
        part1: part1(input),
        part2: part2(input),
    };
}
