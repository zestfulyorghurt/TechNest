import { cacheExchange, Client, fetchExchange } from "urql";

// ✅ 终极修复：显式禁用 GET，并使用函数形式的 fetchOptions
export const client = new Client({
    url: 'http://localhost:8080/graphql',
    exchanges: [cacheExchange, fetchExchange],
    // 1. 显式禁止使用 GET 方法 (关键)
    preferGetMethod: false,
    // 2. 使用函数形式，确保每次请求都强制应用 POST
    fetchOptions: () => ({
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    }),
});