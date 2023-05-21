import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectResultById } from "./resultsApiSlice";

const Result = ({ resultId }) => {
  const result = useSelector((state) => selectResultById(state, resultId));

  const navigate = useNavigate();

  if (result) {
    const handleEdit = () => navigate(`/dash/results/${resultId}`);

    const resultRolesString = result.roles.toString().replaceAll(",", ", ");

    const cellStatus = result.active ? "" : "table__cell--inactive";

    return (
      <tr className="table__row result">
        <td className={`table__cell ${cellStatus}`}>{result.username}</td>
        <td className={`table__cell ${cellStatus}`}>{resultRolesString}</td>
        <td className={`table__cell ${cellStatus}`}>
          <button className="icon-button table__button" onClick={handleEdit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
      </tr>
    );
  } else return null;
};
export default Result;
