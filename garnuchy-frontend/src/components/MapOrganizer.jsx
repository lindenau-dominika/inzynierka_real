import de_ancient from "../assets/de_ancient.png";
import de_anubis from '../assets/de_anubis.png';
import de_mirage from '../assets/de_mirage.png';
import de_vertigo from '../assets/de_vertigo.png';
import de_nuke from '../assets/de_nuke.png';
import de_overpass from '../assets/de_overpass.png';
import de_dust2 from '../assets/de_dust2.png' 
import de_inferno from '../assets/de_inferno.png' 
import kitty from '../assets/de_nuke.png'


export const mapNames = (originalMapName) => {
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

export const mapImages = {
    'de_ancient': de_ancient,
    'de_anubis': de_anubis,
    'de_mirage': de_mirage,
    'de_vertigo': de_vertigo,
    'de_nuke': de_nuke,
    'de_overpass': de_overpass,
    'de_dust2': de_dust2,
    'de_inferno': de_inferno,
};

export default { mapNames, mapImages }