// export async function fetchChangelogs(apiKey: string) {
//     const res = await fetch(`https://mutatio.vercel.app/api/public/${apiKey}`, {
//         cache: "force-cache",
//     });
//     const data = await res.json();
//     return data.data;
// }

export async function getData() {
    const response = await fetch(`https://mutatio.vercel.app/api/public/${process.env.NEXT_PUBLIC_MUTATIO_API_KEY}`, {
        cache: "force-cache",
    });
    const data = await response.json();
    return data.data;
}