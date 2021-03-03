export default function getDate() {
    const months: string[] = [
        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"
    ];

    const d: Date = new Date();
    const date: string = String(d.getDate());
    return `${d.getDate()}${date[date.length - 1] === "1" ? "st" : (date[date.length - 1] === "2" ? "nd" : "th")} ${months[d.getMonth()]}, ${d.getFullYear()}`
}