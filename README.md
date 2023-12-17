<h1 align="center"> <img src="./assets/icon_48.png" /> F*ck Off </h1>

<div align="center">
<em>
A Firefox extension to hide blocked messages on Discord
</em>
</div>

## File structure

* All the code is located in [`./scripts/app.js`](./scripts/app.js)
* The API is used to distribute any changes Discord has made to their website in real time without including an updater of sorts. API related files are found under [`./api/constants.json`](./api/constants.json)

## Is it even working?

If you want to make sure the extension is working, do the following:

1. Refresh Discord web page
2. Open up Inspect Element
3. Head over to `Console` tab
4. Search for `[F_Off]` and there should be some text looking like the following:
![Load Image](repo/image.png)