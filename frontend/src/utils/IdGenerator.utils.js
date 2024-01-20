export default function IdGenerator() {
    const timestamp = new Date().getTime();
    const randomPart = Math.random().toString(36).substring(2, 10);
    let uniqueId = `${timestamp}${randomPart.toUpperCase()}`;
    uniqueId = uniqueId.split("");
    const n = uniqueId.length;
    for(let i = n - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const tmp = uniqueId[i];
        uniqueId[i] = uniqueId[j];
        uniqueId[j] = tmp;
    }
    uniqueId = uniqueId.join("").slice(0, 10);
    return uniqueId;
}