// Object instantiation
if(LuckyCookieStat === undefined) var LuckyCookieStat = {};
LuckyCookieStat.id = "LuckyCookieStat";
LuckyCookieStat.name = "Lucky Cookie Stat";
LuckyCookieStat.version = "1.0";
LuckyCookieStat.gameVersion = "2.048";
LuckyCookieStat.loaded = false;

// Mod definition
LuckyCookieStat.launch = function () {
	LuckyCookieStat.init = function () {
		// Set the mod CSS
		LuckyCookieStat.styles = `
			#lucky-cookie-stat-box {
				position: absolute;
				top: 5px;
				right: 5px;
				color: gray;
				z-index: 999999;
			}
		`;
		CCSE.AddStyles(LuckyCookieStat.styles);

		// Create the HTML components
		const stats = document.createElement("div");
		stats.setAttribute("id", "lucky-cookie-stat-box");

		const statsText = document.createElement("span");
		statsText.setAttribute("id", "lucky-cookie-stat-text");

		stats.append(statsText);
		l("sectionLeft").append(stats);

		// Initialize internal values
		LuckyCookieStat.computedValue = -1;
		LuckyCookieStat.optimalRatio = 6000;

		// Set the update function
		LuckyCookieStat.update = function () {
			const wallet = Game.cookies || 0;
			const CpS = Game.cookiesPs || 0;

			if (CpS > 0) {
				const ratio = wallet / CpS;
				if (ratio !== LuckyCookieStat.computedValue) {
					LuckyCookieStat.computedValue = ratio;
					l("lucky-cookie-stat-text").innerHTML = `x${Math.round(ratio)}`;
					l("lucky-cookie-stat-text").style.color = (LuckyCookieStat.optimalRatio <= LuckyCookieStat.computedValue) ? "green" : "inherit";
				}
			}
		};

		// Hooks
		Game.registerHook("logic", LuckyCookieStat.update);

		// End of initialization
		LuckyCookieStat.loaded = true;
		const loadMessage = `${LuckyCookieStat.name} loaded!`;
		if (Game.prefs.popups) Game.Popup(loadMessage);
		else Game.Notify(loadMessage, "", "", 1, 1);
		console.log(loadMessage);
	};

	// Register the mod
	if (CCSE.ConfirmGameVersion(LuckyCookieStat.name, LuckyCookieStat.version, LuckyCookieStat.gameVersion)) {
		Game.registerMod(LuckyCookieStat.id, LuckyCookieStat);
	}
};


if (!LuckyCookieStat.loaded) {
	if (CCSE && CCSE.isLoaded) {
		LuckyCookieStat.launch();
	} else {
		if (!CCSE) var CCSE = {};
		if (!CCSE.postLoadHooks) CCSE.postLoadHooks = [];

		CCSE.postLoadHooks.push(LuckyCookieStat.launch);
	}
}
