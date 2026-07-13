function ResultsTable({ results }) {

    if (!results) return null;

    const { columns, rows } = results;

    return (

        <div className="mt-5 overflow-x-auto">

            <table className="min-w-full border border-gray-200 rounded-xl overflow-hidden">

                <thead className="bg-blue-600 text-white">

                    <tr>

                        {columns.map((column) => (

                            <th
                                key={column}
                                className="px-4 py-3 text-left"
                            >
                                {column}
                            </th>

                        ))}

                    </tr>

                </thead>

                <tbody>

                    {rows.map((row, index) => (

                        <tr
                            key={index}
                            className="border-b hover:bg-gray-50"
                        >

                            {row.map((cell, i) => (

                                <td
                                    key={i}
                                    className="px-4 py-3"
                                >
                                    {cell}
                                </td>

                            ))}

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default ResultsTable;