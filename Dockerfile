# Node.jsのイメージをベースとする
FROM node:latest

# アプリケーションのディレクトリを設定
WORKDIR /usr/src

# アプリケーションの依存関係をインストールするためにpackage.jsonとpackage-lock.jsonをコピー
COPY package*.json ./

# npm installを実行して依存関係をインストール
RUN npm install

# アプリケーションのソースをバンドルする
COPY . .

# アプリケーションがリッスンするポートを設定
EXPOSE 28080

# アプリケーションを起動
CMD ["node","server.js"]
