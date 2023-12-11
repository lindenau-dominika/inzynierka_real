import psycopg2
from flask import Flask, jsonify

app = Flask(__name__)


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
    columns = 'match_ID, demo_ID, faceit_match_id, created_at, finished_at, score, score2, map, platform'
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
    columns = 'match_ID, player_ID, side, money_spent, defuses, plants, footsteps, jumps, kills, team_kills, assists, deaths, suicides, _2k, _3k, _4k, _5k, shots_fired, head_hits, hits, headshot_kills, flash_assists, enemies_flashed, friends_flashed, self_flashed, blind_time, unused_util_value, total_damage, total_team_damage, he_damage, molotov_damage, rounds_survived, trade_kill_attempts, trade_kill_success, traded_death_attempts, traded_death_success, opening_attempts, opening_success, opening_traded, rating, decoys_thrown, molos_thrown, flashes_thrown, smokes_thrown, HEs_thrown, _1v1, _1v1_won, _1v2, _1v2_won, _1v3, _1v3_won, _1v4, _1v4_won, _1v5, _1v5_won, rounds_won'
    cur.execute(f'SELECT {columns} FROM matches_stats WHERE match_id={match_id}')
    match_stats = cur.fetchall()
    keys = columns.replace('\n', '').split(', ')
    match_stats_list = [
        dict(zip(keys, row))
        for row in match_stats
    ]
    columns = 'steam_ID, username, avatar'
    cur.execute(
        f'''
        SELECT u.steam_ID, u.username, u.avatar
        FROM users u
        JOIN matches_participants mp ON u.steam_ID = mp.player_id
        WHERE mp.match_id = {match_id};
        '''
    )
    users_data = cur.fetchall()
    keys = columns.replace('\n', '').split(', ')
    users_data_list = [
        dict(zip(keys, row))
        for row in users_data
    ]

    cur.close()
    return jsonify(match_stats=match_stats_list, users_data=users_data_list)