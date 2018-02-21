from flask import Flask, request, redirect, render_template, url_for


app = Flask(__name__)


@app.route('/')
def start_screen():
    no_level_selected = 0
    return render_template('start_screen.html', no_level_selected = no_level_selected)

@app.route('/play', methods=['GET', 'POST'])
def gameplay():
    game_mode = request.form.to_dict()
    if game_mode:
        game_mode = int(game_mode['pairs_selected'])
        return render_template('game_screen.html', game_mode = game_mode)
    if not game_mode:
        no_level_selected = 1
        return render_template('start_screen.html', no_level_selected = no_level_selected)

if __name__ == '__main__':
    app.run(
        host='0.0.0.0',
        port=5005,
        debug='True'
    )

#dragula nem eszik meg HTMLcollectiont, úgyhogy át kell alakítani array-é