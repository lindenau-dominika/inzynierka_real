// import { format } from 'path';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ListTemplate = ({ listData, colNames, title, onSort}) => {
  const navigate = useNavigate();

  const mapNames = (originalMapName) => {
    const mapNamesMap = {
      'de_anubis': 'Anubis',
      'de_inferno': 'Inferno',
      'de_mirage': 'Mirage',
      'de_nuke': 'Nuke',
      'de_overpass': 'Overpass',
      'de_ancient': 'Ancient',
      'de_vertigo': 'Vertigo',
      'de_dust2': 'Dust 2',
      'cs_italy': 'Italy',
      'cs_office': 'Office',
    };
    return mapNamesMap[originalMapName] || originalMapName;
  };

  const formatDate = (dateString) => {
    const now = new Date();
    const matchDate = new Date(dateString);
    const diffTime = Math.abs(now - matchDate);

    if (diffTime < 24 * 60 * 60 * 1000) {
        const diffHours = diffTime / (1000 * 60 * 60);
        if (diffHours < 1) {
            const diffMinutes = Math.ceil(diffTime / (1000 * 60));
            return diffMinutes > 1 ? `${diffMinutes} min ago` : `${diffMinutes} min ago`;
        }
        return Math.ceil(diffHours) > 1 ? `${Math.ceil(diffHours)} hours ago` : `${Math.ceil(diffHours)} hour ago`;
    }

    const options = {
        // weekday: 'long',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    };
    return new Intl.DateTimeFormat('en-US', options).format(matchDate);
}

const handleRowClick = (matchId) => {
  navigate(`/matches/${matchId}/general`);
};

return (
  <div className='content'>
    {title !== null && (
      <thead style={{ width: '100%', borderRadius: '5px' }}>
        <h3 style={{ margin: '5px 0px 5px 0px' }}>{title}</h3>
      </thead>
    )}
    <table>
      <thead>
        <tr>
          {colNames.map((colName, index) => (
            <th key={index}>{colName}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {listData.map((item) => (
          <tr key={item.match_id} onClick={() => handleRowClick(item.match_id)}>
            <td>{mapNames(item.map)}</td>
            <td>{item.score[0]}:{item.score[1]}</td>
            <td>{item.platform}</td>
            <td>{formatDate(item.created_at)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
};

export default ListTemplate;
