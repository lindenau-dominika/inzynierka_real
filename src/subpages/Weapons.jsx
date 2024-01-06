// W funkcji handleWeapons, zwracaj dane broni
export const handleWeapons = async (selectedSteamId, setWeapons, setSelectedPlayerWeapons, matchId) => {
    try {
        const response = await fetch(`/xd/matches/${matchId}/details/aim?steam_id=${selectedSteamId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            const data = await response.json();
            const weapon_details = data.match_details_aim_weapon_details || [];
            setWeapons(weapon_details);
            return weapon_details;
        }
    } catch (error) {
        console.error(error);
    }
    return ['er']; 
};
