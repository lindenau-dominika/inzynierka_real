import psycopg2
from flask import Flask, jsonify

app = Flask(__name__)


def get_side_stats(cur, match_id, side):
    cur.execute(f'''
                SELECT CAST(ms.player_id AS VARCHAR(255)) AS steam_id, u.username, ms.team, u.avatar, ms.kills, ms.deaths, ms.total_damage,
                CAST(ROUND((ms.kills * 1.0 / CASE WHEN ms.deaths > 0 THEN ms.deaths ELSE 1 END),2) AS FLOAT) AS kd,
                ms.rating, ms.rounds_won
                FROM matches_stats ms
                JOIN users u ON u.steam_ID = ms.player_ID
                WHERE ms.match_ID = {match_id} and ms.side = {side}
                ORDER BY ms.team ASC, steam_id ASC;
                ''')
    match_side_stats = cur.fetchall()
    headers = ['steam_id', 'username', 'team', 'avatar', 'kills', 'deaths', 'total_damage', 'kd', 'rating', 'rounds won']
    match_side_stats_list = []
    for row in match_side_stats:
        match_side_stats_list.append(dict(zip(headers, row)))
    return match_side_stats_list


def get_overall_stats(cur, match_id):
    cur.execute(f'''
                    SELECT
                        CAST(ms.player_id AS VARCHAR(255)) AS steam_id, ms.team, u.avatar, u.username, SUM(ms.kills) as kills, SUM(ms.deaths) as deaths, SUM(total_damage) as total_damage,
                        CAST(ROUND((SUM(ms.kills) * 1.0 / CASE WHEN SUM(ms.deaths)>0 THEN SUM(ms.deaths) ELSE 1 END),2) AS FLOAT) AS kd,
                        (
                            SUM(CASE WHEN ms.side = 2 THEN ms.rating * (ms.deaths + ms.rounds_survived) ELSE 0 END) +
                            SUM(CASE WHEN ms.side = 3 THEN ms.rating * (ms.deaths + ms.rounds_survived) ELSE 0 END)
                        ) / (CASE WHEN (SUM(ms.deaths) + SUM(ms.rounds_survived)) > 0 THEN (SUM(ms.deaths) + SUM(ms.rounds_survived)) ELSE 1 END) AS rating_overall
                    FROM matches_stats ms
                    JOIN users u ON u.steam_ID = ms.player_ID
                    WHERE ms.match_ID = {match_id}
                    GROUP BY ms.match_ID, u.username, ms.team, u.avatar, ms.player_id
                    ORDER BY ms.team ASC, rating_overall DESC;
                    ''')
    row = cur.fetchall()
    headers = ['steam_id', 'team', 'avatar', 'username', 'kills', 'deaths', 'total_damage', 'kd', 'rating']
    match_stats_list = []
    for row in row:
        match_stats_list.append(dict(zip(headers, row)))
    return match_stats_list


def get_match_info(cur, match_id):
    columns = 'created_at, score, score2, map, platform'
    cur.execute(f'SELECT {columns} FROM matches WHERE match_id={match_id};')
    matches = cur.fetchall()
    keys = columns.replace('\n', '').split(', ')
    match_info = [
        dict(zip(keys, row))
        for row in matches
    ]
    return match_info


def get_match_details_general(cur, match_id):
    cur.execute(f'''
                SELECT
                CAST(ms.player_id AS VARCHAR(255)) AS steam_id, ms.team, u.avatar, u.username, SUM(ms.kills) as kills, SUM(ms.assists) as assists,
                SUM(ms.deaths) as deaths, SUM(total_damage) as total_damage, SUM(ms.rounds_survived) AS rounds_survived, 
                CAST(ROUND((SUM(ms.headshot_kills) * 1.0 /CASE WHEN SUM(ms.kills) > 0 THEN SUM(ms.kills) ELSE 1 END),2) AS FLOAT) AS hs_kill_percent,
                CAST(ROUND((SUM(ms.kills) * 1.0 / CASE WHEN SUM(ms.deaths)>0 THEN SUM(ms.deaths) ELSE 1 END),2) AS FLOAT) AS kd,
                (
                SUM(CASE WHEN ms.side = 2 THEN ms.rating * (ms.deaths + ms.rounds_survived) ELSE 0 END) +
                SUM(CASE WHEN ms.side = 3 THEN ms.rating * (ms.deaths + ms.rounds_survived) ELSE 0 END)
                ) / (CASE WHEN (SUM(ms.deaths) + SUM(ms.rounds_survived)) > 0 THEN (SUM(ms.deaths) + SUM(ms.rounds_survived)) ELSE 1 END) AS rating_overall
                FROM matches_stats ms
                JOIN users u ON u.steam_ID = ms.player_ID
                WHERE ms.match_ID = {match_id}
                GROUP BY ms.match_ID, u.username, ms.team, u.avatar, ms.player_id
                ORDER BY ms.team ASC, rating_overall DESC, steam_id ASC;
                ''')
    row = cur.fetchall()
    headers = ['steam_id', 'team', 'avatar', 'username', 'kills', 'assists', 'deaths', 'total_damage', 'rounds_survived', 'hs_kill_percent', 'kd', 'rating']
    match_details_general = []
    for row in row:
        match_details_general.append(dict(zip(headers, row)))
    return match_details_general


def get_match_details_general_side(cur, match_id, side):
    cur.execute(f'''
                SELECT CAST(ms.player_id AS VARCHAR(255)) AS steam_id, u.username, ms.team, u.avatar, ms.kills, ms.assists, ms.deaths,
                ms.total_damage, ms.rounds_survived, 
                CAST(ROUND((ms.headshot_kills * 1.0 /CASE WHEN ms.kills > 0 THEN ms.kills ELSE 1 END),2) AS FLOAT) AS hs_kill_percent,
                CAST(ROUND((ms.kills * 1.0 / CASE WHEN ms.deaths > 0 THEN ms.deaths ELSE 1 END),2) AS FLOAT) AS kd,
                ms.rating
                FROM matches_stats ms
                JOIN users u ON u.steam_ID = ms.player_ID
                WHERE ms.match_ID = {match_id} and ms.side = {side}
                ORDER BY ms.team ASC, ms.rating DESC, steam_id ASC;
                ''')
    row = cur.fetchall()
    headers = ['steam_id', 'team', 'avatar', 'username', 'kills', 'assists', 'deaths', 'total_damage', 'rounds_survived', 'hs_kill_percent', 'kd', 'rating']
    match_details_general = []
    for row in row:
        match_details_general.append(dict(zip(headers, row)))
    return match_details_general


def get_match_details_clutches(cur, match_id):
    cur.execute(f'''
                SELECT
                CAST(ms.player_id AS VARCHAR(255)) AS steam_id, ms.team, u.avatar, u.username, 
                SUM(ms._2k) as _2k, SUM(ms._3k) as _3k, SUM(ms._4k) as _4k, SUM(ms._5k) as _5k,
                SUM(ms._1v1) as _1v1, SUM(ms._1v2) as _1v2, SUM(ms._1v3) as _1v3, SUM(ms._1v4) as _1v4, SUM(ms._1v5) as _1v5,
                SUM(ms._1v1_won) as _1v1_won, SUM(ms._1v2_won) as _1v2_won, SUM(ms._1v3_won) as _1v3_won, SUM(ms._1v4_won) as _1v4_won, SUM(ms._1v5_won) as _1v5_won
                FROM matches_stats ms
                JOIN users u ON u.steam_ID = ms.player_ID
                WHERE ms.match_ID = {match_id}
                GROUP BY ms.match_ID, u.username, ms.team, u.avatar, ms.player_id
                ORDER BY ms.team ASC, steam_id ASC;
                ''')
    row = cur.fetchall()
    headers = ['steam_id', 'team', 'avatar', 'username', '_2k', '_3k', '_4k', '_5k',
               '_1v1', '_1v2', '_1v3', '_1v4', '_1v5', '_1v1_won', '_1v2_won', '_1v3_won', '_1v4_won', '_1v5_won']
    match_details_clutches = []
    for row in row:
        match_details_clutches.append(dict(zip(headers, row)))
    return match_details_clutches


def get_match_details_clutches_side(cur, match_id, side):
    cur.execute(f'''
                SELECT
                CAST(ms.player_id AS VARCHAR(255)) AS steam_id, ms.team, u.avatar, u.username, 
                ms._2k, ms._3k, ms._4k, ms._5k,
                ms._1v1, ms._1v2, ms._1v3, ms._1v4, ms._1v5,
                ms._1v1_won, ms._1v2_won, ms._1v3_won, ms._1v4_won, ms._1v5_won
                FROM matches_stats ms
                JOIN users u ON u.steam_ID = ms.player_ID
                WHERE ms.match_ID = {match_id} and ms.side = {side}
                ORDER BY ms.team ASC, steam_id ASC;
                ''')
    row = cur.fetchall()
    headers = ['steam_id', 'team', 'avatar', 'username', '_2k', '_3k', '_4k', '_5k',
               '_1v1', '_1v2', '_1v3', '_1v4', '_1v5', '_1v1_won', '_1v2_won', '_1v3_won', '_1v4_won', '_1v5_won']
    match_details_clutches = []
    for row in row:
        match_details_clutches.append(dict(zip(headers, row)))
    return match_details_clutches


def get_match_details_clutches_info(cur, match_id):
    cur.execute(f'''
                SELECT DISTINCT CAST(rc.player_id AS VARCHAR(255)) AS steam_id, ms.team, u.avatar, u.username,
                rc.round_ID, rc.side, rc.round_result, rc.players_number, rc.kills, r.score, r.score2
                FROM rounds_clutches rc
                JOIN rounds r ON rc.round_ID = r.round_ID
                JOIN matches_stats ms ON rc.player_ID = ms.player_ID AND r.match_ID = ms.match_ID
                JOIN users u ON rc.player_ID = u.steam_ID
                WHERE r.match_ID = {match_id}
                ORDER BY rc.round_id;
                ''')
    rows = cur.fetchall()
    headers = ['steam_id', 'team', 'avatar', 'username', 'round_ID', 'side',
               'round_result', 'players_number', 'kills', 'score', 'score2']
    match_details_clutches_info = []
    for row in rows:
        match_details_clutches_info.append(dict(zip(headers, row)))
    return match_details_clutches_info


def get_match_details_clutches_side_info(cur, match_id, side):
    cur.execute(f'''
                SELECT DISTINCT CAST(rc.player_id AS VARCHAR(255)) AS steam_id, ms.team, u.avatar, u.username,
                rc.round_ID, rc.side, rc.round_result, rc.players_number, rc.kills, r.score, r.score2
                FROM rounds_clutches rc
                JOIN rounds r ON rc.round_ID = r.round_ID
                JOIN matches_stats ms ON rc.player_ID = ms.player_ID AND r.match_ID = ms.match_ID
                JOIN users u ON rc.player_ID = u.steam_ID
                WHERE r.match_ID = {match_id} and rc.side = {side}
                ORDER BY rc.round_id;
                ''')
    row = cur.fetchall()
    headers = ['steam_id', 'team', 'avatar', 'username', 'round_ID', 'side',
               'round_result', 'players_number', 'kills', 'score', 'score2']
    match_details_clutches = []
    for row in row:
        match_details_clutches.append(dict(zip(headers, row)))
    return match_details_clutches


def get_match_details_utility(cur, match_id):
    cur.execute(f'''
                SELECT
                CAST(ms.player_id AS VARCHAR(255)) AS steam_id, ms.team, u.avatar, u.username,
                SUM(ms.enemies_flashed) as enemies_flashed, SUM(ms.flash_assists) as flash_assists, SUM(ms.friends_flashed) as friends_flashed, SUM(ms.self_flashed) as self_flashed,
                SUM(ms.HE_damage) as HE_damage, SUM(ms.molotov_damage) as molotov_damage, 
                SUM(ms.blind_time)/CASE WHEN SUM(ms.flashes_thrown) > 0 THEN SUM(ms.flashes_thrown) ELSE 1 END AS avg_blind_time,
                ROUND(SUM(ms.unused_util_value) * 1.0/CASE WHEN SUM(ms.deaths) > 0 THEN SUM(ms.deaths) ELSE 1 END, 2) AS avg_unused_util_value,
                SUM(ms.HEs_thrown) as HEs_thrown, SUM(ms.decoys_thrown) as decoys_thrown, SUM(ms.flashes_thrown) as flashes_thrown,
                SUM(ms.smokes_thrown) as smokes_thrown, SUM(ms.molos_thrown) as molos_thrown
                FROM matches_stats ms
                JOIN users u ON u.steam_ID = ms.player_ID
                WHERE ms.match_ID = {match_id}
                GROUP BY ms.match_ID, u.username, ms.team, u.avatar, ms.player_id
                ORDER BY ms.team ASC, steam_id ASC;
                ''')
    rows = cur.fetchall()
    headers = ['steam_id', 'team', 'avatar', 'username', 'enemies_flashed', 'flash_assists', 'friends_flashed', 'self_flashed',
               'HE_damage', 'molotov_damage', 'avg_blind_time', 'avg_unused_util_value', 'HEs_thrown', 'decoys_thrown',
               'flashes_thrown', 'smokes_thrown', 'molos_thrown']
    match_details_utility = []
    for row in rows:
        match_details_utility.append(dict(zip(headers, row)))
    return match_details_utility


def get_match_details_utility_side(cur, match_id, side):
    cur.execute(f'''
                SELECT
                CAST(ms.player_id AS VARCHAR(255)) AS steam_id, ms.team, u.avatar, u.username, 
                ms.enemies_flashed, ms.flash_assists, ms.friends_flashed, ms.self_flashed, ms.HE_damage, ms.molotov_damage,
                ms.blind_time/CASE WHEN ms.flashes_thrown > 0 THEN ms.flashes_thrown ELSE 1 END AS avg_blind_time,
                ROUND(ms.unused_util_value * 1.0/CASE WHEN ms.deaths > 0 THEN ms.deaths ELSE 1 END, 2) AS avg_unused_util_value,
                ms.HEs_thrown, ms.decoys_thrown, ms.flashes_thrown, ms.smokes_thrown, ms.molos_thrown
                FROM matches_stats ms
                JOIN users u ON u.steam_ID = ms.player_ID
                WHERE ms.match_ID = {match_id} and ms.side = {side}
                ORDER BY ms.team ASC, steam_id ASC;
                ''')
    rows = cur.fetchall()
    headers = ['steam_id', 'team', 'avatar', 'username', 'enemies_flashed', 'flash_assists', 'friends_flashed',
               'self_flashed',
               'HE_damage', 'molotov_damage', 'avg_blind_time', 'avg_unused_util_value', 'HEs_thrown', 'decoys_thrown',
               'flashes_thrown', 'smokes_thrown', 'molos_thrown']
    match_details_utility = []
    for row in rows:
        match_details_utility.append(dict(zip(headers, row)))
    return match_details_utility


def get_match_details_openingkills(cur, match_id):
    cur.execute(f'''
                SELECT
                CAST(ms.player_id AS VARCHAR(255)) AS steam_id, ms.team, u.avatar, u.username,
                SUM(ms.trade_kill_attempts) as trade_kill_attempts, SUM(ms.trade_kill_success) as trade_kill_success,
                SUM(ms.traded_death_attempts) as traded_death_attempts, SUM(ms.traded_death_success) as traded_death_success,
                SUM(ms.opening_attempts) as opening_attempts, SUM(ms.opening_success) as opening_success, SUM(ms.opening_traded) as opening_traded
                FROM matches_stats ms
                JOIN users u ON u.steam_ID = ms.player_ID
                WHERE ms.match_ID = {match_id}
                GROUP BY ms.match_ID, u.username, ms.team, u.avatar, ms.player_id
                ORDER BY ms.team ASC, steam_id ASC;
                ''')
    rows = cur.fetchall()
    headers = ['steam_id', 'team', 'avatar', 'username', 'trade_kill_attempts', 'trade_kill_success', 'traded_death_attempts',
               'traded_death_success', 'opening_attempts', 'opening_success', 'opening_traded']
    match_details_openingkills = []
    for row in rows:
        match_details_openingkills.append(dict(zip(headers, row)))
    return match_details_openingkills


def get_match_details_openingkills_side(cur, match_id, side):
    cur.execute(f'''
                SELECT
                CAST(ms.player_id AS VARCHAR(255)) AS steam_id, ms.team, u.avatar, u.username, 
                ms.trade_kill_attempts, ms.trade_kill_success, ms.traded_death_attempts, ms.traded_death_success, ms.opening_attempts,
                ms.opening_success, ms.opening_traded
                FROM matches_stats ms
                JOIN users u ON u.steam_ID = ms.player_ID
                WHERE ms.match_ID = {match_id} and ms.side = {side}
                ORDER BY ms.team ASC, steam_id ASC;
                ''')
    rows = cur.fetchall()
    headers = ['steam_id', 'team', 'avatar', 'username', 'trade_kill_attempts', 'trade_kill_success',
               'traded_death_attempts',
               'traded_death_success', 'opening_attempts', 'opening_success', 'opening_traded']
    match_details_openingkills = []
    for row in rows:
        match_details_openingkills.append(dict(zip(headers, row)))
    return match_details_openingkills


def get_match_details_other(cur, match_id):
    cur.execute(f'''
                SELECT
                CAST(ms.player_id AS VARCHAR(255)) AS steam_id, ms.team, u.avatar, u.username,
                SUM(ms.money_spent) as money_spent, SUM(ms.plants) as plants, SUM(ms.defuses) as defuses,
                SUM(ms.suicides) as suicides, SUM(ms.team_kills) as team_kills, SUM(ms.total_team_damage) as total_team_damage,
                SUM(ms.footsteps) as footsteps, SUM(ms.jumps) as jumps
                FROM matches_stats ms
                JOIN users u ON u.steam_ID = ms.player_ID
                WHERE ms.match_ID = {match_id}
                GROUP BY ms.match_ID, u.username, ms.team, u.avatar, ms.player_id
                ORDER BY ms.team ASC, steam_id ASC;
                ''')
    rows = cur.fetchall()
    headers = ['steam_id', 'team', 'avatar', 'username', 'money_spent', 'plants', 'defuses', 'suicides', 'team_kills',
               'total_team_damage', 'footsteps', 'jumps']
    match_details_other = []
    for row in rows:
        match_details_other.append(dict(zip(headers, row)))
    return match_details_other


def get_match_details_other_side(cur, match_id, side):
    cur.execute(f'''
                SELECT
                CAST(ms.player_id AS VARCHAR(255)) AS steam_id, ms.team, u.avatar, u.username, 
                ms.money_spent, ms.plants, ms.defuses, ms.suicides, ms.team_kills,
                ms.total_team_damage, ms.footsteps, ms.jumps
                FROM matches_stats ms
                JOIN users u ON u.steam_ID = ms.player_ID
                WHERE ms.match_ID = {match_id} and ms.side = {side}
                ORDER BY ms.team ASC, steam_id ASC;
                ''')
    rows = cur.fetchall()
    headers = ['steam_id', 'team', 'avatar', 'username', 'money_spent', 'plants', 'defuses', 'suicides', 'team_kills',
               'total_team_damage', 'footsteps', 'jumps']
    match_details_other = []
    for row in rows:
        match_details_other.append(dict(zip(headers, row)))
    return match_details_other


def get_match_details_aim_ovarall(cur, match_id):
    cur.execute(f'''
                SELECT
                CAST(ms.player_id AS VARCHAR(255)) AS steam_id, ms.team, u.avatar, u.username, 
                SUM(ms.kills) AS kills, SUM(ms.total_damage) AS total_damage,
                CAST(ROUND((SUM(ms.headshot_kills) * 1.0 /CASE WHEN SUM(ms.kills) > 0 THEN SUM(ms.kills) ELSE 1 END),2) AS FLOAT) AS hs_kill_percent,
                CAST(ROUND((SUM(ms.hits) * 1.0 /CASE WHEN SUM(ms.shots_fired) > 0 THEN SUM(ms.shots_fired) ELSE 1 END),2) AS FLOAT) AS accuracy_percent,
                CAST(ROUND((SUM(ms.head_hits) * 1.0 /CASE WHEN SUM(ms.hits) > 0 THEN SUM(ms.hits) ELSE 1 END),2) AS FLOAT) AS head_hit_percent,
                SUM(ms.shots_fired) AS shots_fired
                FROM matches_stats ms
                JOIN users u ON u.steam_ID = ms.player_ID
                WHERE ms.match_ID = {match_id}
                GROUP BY ms.match_ID, u.username, ms.team, u.avatar, ms.player_id
                ORDER BY ms.team ASC, steam_id ASC;
                ''')
    rows = cur.fetchall()
    headers = ['steam_id', 'team', 'avatar', 'username', 'kills', 'total_damage',
               'hs_kill_percent', 'accuracy_percent', 'head_hit_percent', 'shots_fired']
    match_details_aim_overall = []
    for row in rows:
        match_details_aim_overall.append(dict(zip(headers, row)))
    return match_details_aim_overall


def get_match_details_aim_ovarall_side(cur, match_id, side):
    cur.execute(f'''
                SELECT
                CAST(ms.player_id AS VARCHAR(255)) AS steam_id, ms.team, u.avatar, u.username, 
                ms.kills, ms.total_damage,
                CAST(ROUND((ms.headshot_kills * 1.0 /CASE WHEN ms.kills > 0 THEN ms.kills ELSE 1 END), 2) AS FLOAT) AS hs_kill_percent,
                CAST(ROUND((ms.hits * 1.0 /CASE WHEN ms.shots_fired > 0 THEN ms.shots_fired ELSE 1 END), 2) AS FLOAT) AS accuracy_percent,
                CAST(ROUND((ms.head_hits * 1.0 /CASE WHEN ms.hits > 0 THEN ms.hits ELSE 1 END), 2) AS FLOAT) AS head_hit_percent
                FROM matches_stats ms
                JOIN users u ON u.steam_ID = ms.player_ID
                WHERE ms.match_ID = {match_id} and ms.side = {side}
                ORDER BY ms.team ASC, steam_id ASC;
                ''')
    rows = cur.fetchall()
    headers = ['steam_id', 'team', 'avatar', 'username', 'kills', 'total_damage',
               'hs_kill_percent', 'accuracy_percent', 'head_hit_percent', 'shots_fired']
    match_details_aim_overall_side = []
    for row in rows:
        match_details_aim_overall_side.append(dict(zip(headers, row)))
    return match_details_aim_overall_side


def get_db_connection():
    database_server = "garnuchy.pl"
    database_name = "xcs"
    database_user = "farfalle"
    database_password = "cynaB@n38"
    database_port = 30042
    # database_server = "localhost"
    # database_name = "postgres"
    # database_user = "postgres"
    # database_password = "admin"
    # database_port = 5432

    connection_string = f"dbname='{database_name}' user='{database_user}' password='{database_password}' host='{database_server}' port='{database_port}'"
    connection = psycopg2.connect(connection_string)
    return connection


def get_cursor():
    return get_db_connection().cursor()


conn = get_db_connection()


@app.before_request
def before_request():
    try:
        # Attempt to execute a simple query to check the connection status
        with get_cursor() as cur:
            cur.execute("SELECT 1;")
    except psycopg2.OperationalError:
        # Reconnect if there's an OperationalError
        app.logger.warning("Database connection lost. Reconnecting...")
        globals()['conn'] = get_db_connection()


@app.route('/matches')
def matches():
    cur = conn.cursor()
    columns = 'match_id, created_at, score, score2, map, platform'
    cur.execute(f'SELECT {columns} FROM matches;')
    matches = cur.fetchall()
    keys = columns.replace('\n', '').split(', ')
    matches_list = [
        dict(zip(keys, row))
        for row in matches
    ]
    cur.close()
    return jsonify(matches=matches_list)


@app.route('/matches/<int:match_id>')
def match_stats(match_id):
    cur = conn.cursor()
    match_overall_stats = get_overall_stats(cur, match_id)
    match_ct_stats = get_side_stats(cur, match_id, 3)
    match_tt_stats = get_side_stats(cur, match_id, 2)
    match_info = get_match_info(cur, match_id)
    cur.close()
    return jsonify(match_overall_stats=match_overall_stats, match_ct_stats=match_ct_stats, match_tt_stats=match_tt_stats, match_info=match_info)


@app.route('/matches/<int:match_id>/details/general')
def match_details_general(match_id):
    cur = conn.cursor()
    match_details_general_stats = get_match_details_general(cur, match_id)
    match_details_general_ct_stats = get_match_details_general_side(cur, match_id, 3)
    match_details_general_tt_stats = get_match_details_general_side(cur, match_id, 2)
    match_info = get_match_info(cur, match_id)
    cur.close()
    return jsonify(match_details_general_stats=match_details_general_stats,
                   match_details_general_ct_stats=match_details_general_ct_stats,
                   match_details_general_tt_stats=match_details_general_tt_stats,
                   match_info=match_info)


@app.route('/matches/<int:match_id>/details/clutches')
def match_details_mkc(match_id): #  mkc - multi kills and clutches
    cur = conn.cursor()
    match_details_clutches_stats = get_match_details_clutches(cur, match_id)
    match_details_clutches_ct_stats = get_match_details_clutches_side(cur, match_id, 3)
    match_details_clutches_tt_stats = get_match_details_clutches_side(cur, match_id, 2)
    match_details_clutches_info = get_match_details_clutches_info(cur, match_id)
    match_details_clutches_ct_info = get_match_details_clutches_side_info(cur, match_id, 3)
    match_details_clutches_tt_info = get_match_details_clutches_side_info(cur, match_id, 2)
    match_info = get_match_info(cur, match_id)
    cur.close()
    return jsonify(match_details_clutches_stats=match_details_clutches_stats,
                   match_details_clutches_ct_stats=match_details_clutches_ct_stats,
                   match_details_clutches_tt_stats=match_details_clutches_tt_stats,
                   match_details_clutches_info=match_details_clutches_info,
                   match_details_clutches_ct_info=match_details_clutches_ct_info,
                   match_details_clutches_tt_info=match_details_clutches_tt_info,
                   match_info=match_info)


@app.route('/matches/<int:match_id>/details/utility')
def match_details_utility(match_id):
    cur = conn.cursor()
    match_details_utility_stats = get_match_details_utility(cur, match_id)
    match_details_utility_ct_stats = get_match_details_utility_side(cur, match_id, 3)
    match_details_utility_tt_stats = get_match_details_utility_side(cur, match_id, 2)
    match_info = get_match_info(cur, match_id)
    cur.close()
    return jsonify(match_details_utility_stats=match_details_utility_stats,
                   match_details_utility_ct_stats=match_details_utility_ct_stats,
                   match_details_utility_tt_stats=match_details_utility_tt_stats,
                   match_info=match_info)


@app.route('/matches/<int:match_id>/details/openingkills')
def match_details_tok(match_id):  #  tok - trades and opening kills
    cur = conn.cursor()
    match_details_openingkills_stats = get_match_details_openingkills(cur, match_id)
    match_details_openingkills_ct_stats = get_match_details_openingkills_side(cur, match_id, 3)
    match_details_openingkills_tt_stats = get_match_details_openingkills_side(cur, match_id, 2)
    match_info = get_match_info(cur, match_id)
    cur.close()
    return jsonify(match_details_openingkills_stats=match_details_openingkills_stats,
                   match_details_openingkills_ct_stats=match_details_openingkills_ct_stats,
                   match_details_openingkills_tt_stats=match_details_openingkills_tt_stats,
                   match_info=match_info)


@app.route('/matches/<int:match_id>/details/other')
def match_details_other(match_id):
    cur = conn.cursor()
    match_details_other_stats = get_match_details_other(cur, match_id)
    match_details_other_ct_stats = get_match_details_other_side(cur, match_id, 3)
    match_details_other_tt_stats = get_match_details_other_side(cur, match_id, 2)
    match_info = get_match_info(cur, match_id)
    cur.close()
    return jsonify(match_details_other_stats=match_details_other_stats,
                   match_details_other_ct_stats=match_details_other_ct_stats,
                   match_details_other_tt_stats=match_details_other_tt_stats,
                   match_info=match_info)


@app.route('/matches/<int:match_id>/details/aim')
def match_details_aim(match_id):
    cur = conn.cursor()
    match_details_aim_overall_stats = get_match_details_aim_ovarall(cur, match_id)
    match_details_aim_ct_overall_stats = get_match_details_aim_ovarall_side(cur, match_id, 3)
    match_details_aim_tt_overall_stats = get_match_details_aim_ovarall_side(cur, match_id, 2)
    match_info = get_match_info(cur, match_id)
    cur.close()
    return jsonify(match_details_aim_overall_stats=match_details_aim_overall_stats,
                   match_details_aim_ct_overall_stats=match_details_aim_ct_overall_stats,
                   match_details_aim_tt_overall_stats=match_details_aim_tt_overall_stats,
                   match_info=match_info)

