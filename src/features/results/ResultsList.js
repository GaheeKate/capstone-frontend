import { useGetResultsQuery } from "./resultsApiSlice";
import Result from "./Result";

const ResultsList = () => {
  const {
    data: results,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetResultsQuery();

  let content;

  if (isLoading) content = <p>Loading...</p>;

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids } = results;

    const tableContent = ids?.length
      ? ids.map((resultId) => <Result key={resultId} resultId={resultId} />)
      : null;

    content = (
      <table className="table table--results">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="table__th result__status">
              Sign_name
            </th>
            <th scope="col" className="table__th result__created">
              Created
            </th>
            <th scope="col" className="table__th result__updated">
              Updated
            </th>
            <th scope="col" className="table__th result__title">
              Desc
            </th>
            <th scope="col" className="table__th result__username">
              ResultValue
            </th>
            <th scope="col" className="table__th result__edit">
              Edit
            </th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    );
  }

  return content;
};
export default ResultsList;
