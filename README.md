# WhereWent

複数の写真のEXIF（位置情報・撮影時刻）から、移動の軌跡を地図上にプロットするWebアプリです。

## 特徴

- 写真をドラッグ＆ドロップ、またはファイル選択でアップロード
- PNG / JPEG / HEIC / HEIF に対応（HEICはブラウザ表示用に自動変換）
- GPS座標と撮影時刻をEXIFから抽出し、時系列で地図上に軌跡（ポリライン）を描画
- 下部のタイムラインから写真をクリックすると、地図・ポップアップが連動
- 総移動距離・撮影期間などの統計を表示
- 位置情報や日時が取得できない写真はエラー理由付きで一覧表示

## 技術スタック

- React 19 + TypeScript
- Vite
- react-leaflet / Leaflet（地図）
- exifr（EXIF解析）
- heic2any（HEIC→JPEG変換）
- zustand（状態管理）
- pnpm

## セットアップ

```bash
pnpm install
pnpm dev
```

## ビルド

```bash
pnpm build          # 通常ビルド
pnpm build:github   # GitHub Pages用ビルド（/WhereWent/ をベースパスに設定）
```

## GitHub Pagesへのデプロイ

`main` ブランチへのpushで `.github/workflows/deploy.yml` が自動的に `pnpm run build:github` を実行し、GitHub Pagesへデプロイします。

リポジトリの Settings → Pages → Source を **GitHub Actions** に設定してください。

手動でデプロイする場合:

```bash
pnpm run build:github
pnpm run deploy
```
