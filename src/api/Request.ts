async function myRequest(duongDan: string) {
    const response = await fetch(duongDan);

    if (!response.ok) {
        throw new Error(`không thể truy cập ${duongDan}`);

    }
    return response.json();
}
export default myRequest