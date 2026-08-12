import { useCallback, useEffect, useState } from 'react'
import { useQuery } from 'urql'
import Button from '@mui/material/Button';
/*************************************
 * 调查graphql的demo画面
 * @date 2026-04-04 16:53
 * @author zhangyi
 *************************************/
function GraphqlDemoPage() {
    const [count, setCount] = useState(0)

    const [result, reexecuteQuery] = useQuery({
        query: TodosQuery,
        variables: {
            id: "book-1"
        }
    });

    const { data, fetching, error } = result;
    console.log('data', data)

    const submitEvent = useCallback(() => {
        setCount((prev) => prev + 1)
    }, [])

    // 在 App 组件内部或 useEffect 中添加
    useEffect(() => {
        const testPost = async () => {
            console.log('🧪 Testing direct POST fetch...');
            try {
                const response = await fetch('http://localhost:8080/graphql', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        query: '{ __typename }', // 最简单的查询
                    }),
                });
                const data = await response.json();
                console.log('✅ Direct POST success:', data);
            } catch (error) {
                console.error('❌ Direct POST failed:', error);
            }
        };
        testPost();
    }, []);

    if (fetching) return <p>Loading...</p>;
    if (error) return <p>Oh no... {error.message}</p>;

    return (
        <>
            {count}
            <div>zzzzz</div>
            <Button variant="contained">Hello world</Button>;
            <button onClick={submitEvent} title='zhang' />
   // ✅ 正确：使用驼峰 contentEditable
            <div contentEditable="true">
                这里可以编辑
            </div>
        </>
    )
}
const TodosQuery = `
query bookDetails($id: ID) {
    bookById(id: $id) {
        id
        name
        pageCount
        author {
            id
            firstName
            lastName
        }
    }
}
`;
export default GraphqlDemoPage
