import psycopg2
from flask import Flask, render_template, jsonify

app = Flask(__name__)

def get_db_connection():
    database_server = "garnuchy.pl"
    database_name = "xcs"
    database_user = "farfalle"
    database_password = "cynaB@n38"
    database_port = 30042

    connection_string = f"dbname='{database_name}' user='{database_user}' password='{database_password}' host='{database_server}' port='{database_port}'"
    connection = psycopg2.connect(connection_string)
    return connection


@app.route('/matches')
def matches():
    cur = conn.cursor()
    cur.execute('SELECT * FROM matches;')
    matches = cur.fetchall()
    matches_list = [
        {
            'match_ID': row[0],
            'date': row[1].isoformat(),
            'score': row[2],
            'score2': row[3],
            'map': row[4],
            'platform': row[5],
            'type': row[6]
        }
        for row in matches
    ]
    cur.close()
    # conn.close()
    return jsonify(matches=matches_list)

@app.route('/matches/<int:match_id>')
def match_stats(match_id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(f'SELECT * FROM matches_stats WHERE match_id={match_id}')

    match_stats = cur.fetchall()
    match_stats_list = [
        {
            'match_ID': row[0],
            'player_ID': row[1],
            'side': row[2],
            'money_spent': row[3],
            'defuses': row[4],
            'plants': row[5],
            'footsteps': row[6],
            'jumps': row[7],
            'kills': row[8],
            'team_kills': row[9],
            'assists': row[10],
            'deaths': row[11],
            'suicides': row[12],
            'kd': row[13],
            'adr': row[14],
            '_2k': row[15],
            '_3k': row[16],
            '_4k': row[17],
            '_5k': row[18],
            'HLTV_rating': row[19],
            'KAST': row[20],
            'head_accuracy': row[21],
            'hs_kill_percent': row[22],
            'spray_accuracy': row[23],
            'counter_strafing': row[24],
            'accuracy_all': row[25],
            'flash_assists': row[26],
            'enemies_flashed': row[27],
            'friends_flashed': row[28],
            'self_flashed': row[29],
            'avg_blind_time': row[30],
            'avg_HE_damage': row[31],
            'avg_he_team_damage': row[32],
            'avg_unused_util': row[33],
            'total_damage': row[34],
            'total_team_damage': row[35],
            'he_damage': row[36],
            'molotov_damage': row[37],
            'rounds_survived': row[38],
            'trade_kill_attempts': row[39],
            'trade_kill_success': row[40],
            'traded_death_attempts': row[41],
            'traded_death_success': row[42],
            'opening_attempts': row[43],
            'opening_success': row[44],
            'opening_traded': row[45],
            'rating': row[46],
            'decoys_thrown': row[47],
            'molos_thrown': row[48],
            'flashes_thrown': row[49],
            'smokes_thrown': row[50],
            'HEs_thrown': row[51],
            '_1v1': row[52],
            '_1v1_won': row[53],
            '_1v2': row[54],
            '_1v2_won': row[55],
            '_1v3': row[56],
            '_1v3_won': row[57],
            '_1v4': row[58],
            '_1v4_won': row[59],
            '_1v5': row[60],
            '_1v5_won': row[61],
            'rounds_win_rate': row[62]
        }
        for row in match_stats
    ]
    cur.close()
    # conn.close()
    return jsonify(match_stats=match_stats_list)

conn = get_db_connection()
