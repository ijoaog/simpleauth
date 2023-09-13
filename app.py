from flask import Flask, render_template
import os

app = Flask(__name__)

@app.route('/')
def login_page():
    return render_template('login.html')

if __name__ == '__main__':
    # Obtém o número da porta do ambiente, ou usa 5000 como padrão
    port = int(os.environ.get("PORT", 5000))
    
    app.run(host='0.0.0.0', port=port)
