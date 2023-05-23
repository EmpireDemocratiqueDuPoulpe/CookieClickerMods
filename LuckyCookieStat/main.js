// Object instantiation
if (LuckyCookieStat === undefined) var LuckyCookieStat = {};
LuckyCookieStat.id = "LuckyCookieStat";
LuckyCookieStat.name = "Lucky Cookie Stat";
LuckyCookieStat.version = "1.4";
LuckyCookieStat.gameVersion = "2.052";
LuckyCookieStat.gameLanguage = null;
LuckyCookieStat.isLoaded = false;

// Fetch CCSE if not installed
if (typeof CCSE == "undefined") Game.LoadMod("https://klattmose.github.io/CookieClicker/CCSE.js");

// Mod definition
LuckyCookieStat.launch = function () {
	LuckyCookieStat.init = function () {
		// Get game language
		try { LuckyCookieStat.gameLanguage = window.localStorage.getItem("CookieClickerLang"); }
		catch { LuckyCookieStat.gameLanguage = "EN"; }

		// Set the mod CSS
		LuckyCookieStat.styles = `
			#lucky-cookie-stat-box {
				position: absolute;
				right: 0;
				bottom: 0;
				left: 0;
				text-align: center;
				font-size: 0.8em;
				background: rgba(0, 0, 0, 0.2);
				border: 1px rgba(0, 0, 0, 0.5) solid;
				color: white;
				z-index: 5;
			}
			
			#lucky-cookie-stat-bar {
				position: absolute;
				top: 0;
				bottom: 0;
				left: 0;
				width: 0;
				background: #008000;
				z-index: -1;
			}
			
			#lucky-cookie-stat-bar-indicator {
				position: absolute;
				top: 0;
				bottom: 0;
				left: 0;
				width: 60%;
				border-right: 1px #E24848 solid;
			}
			
			#lucky-cookie-stat-bar {
				position: absolute;
				top: 0;
				bottom: 0;
				left: 0;
				width: 0;
				background: #008000;
				z-index: -1;
			}
			
			#lucky-cookie-stat-bar-indicator {
				position: absolute;
				top: 0;
				bottom: 0;
				left: 0;
				width: 60%;
				border-right: 1px #E24848 solid;
			}
		`;
		CCSE.AddStyles(LuckyCookieStat.styles);

		// Create the HTML components
		const stats = document.createElement("div");
		stats.setAttribute("id", "lucky-cookie-stat-box");

		const statsBar = document.createElement("div");
		statsBar.setAttribute("id", "lucky-cookie-stat-bar");

		const statsBarIndicator = document.createElement("div");
		statsBarIndicator.setAttribute("id", "lucky-cookie-stat-bar-indicator");

		const statsText = document.createElement("span");
		statsText.setAttribute("id", "lucky-cookie-stat-text");

		stats.append(statsBar);
		stats.append(statsBarIndicator);
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
					l("lucky-cookie-stat-text").innerHTML = `x${Math.round(ratio).toLocaleString(LuckyCookieStat.gameLanguage)}`;

					l("lucky-cookie-stat-bar").style.width = `${Math.min(Math.round(ratio / 100), 100)}%`;
					l("lucky-cookie-stat-bar").style.background = (LuckyCookieStat.optimalRatio <= LuckyCookieStat.computedValue) ? "#008000" : "#800000";
				}
			}
		};

		// Hooks
		Game.registerHook("logic", LuckyCookieStat.update);

		// Add the mod version to the Stats page
		Game.customStatsMenu.push(function() {
			CCSE.AppendStatsVersionNumber(LuckyCookieStat.name, LuckyCookieStat.version);
		});

		// End of initialization
		LuckyCookieStat.isLoaded = true;
		console.log(`${LuckyCookieStat.name} isLoaded!`);
	};

	// Register the mod
	if (CCSE.ConfirmGameVersion(LuckyCookieStat.name, LuckyCookieStat.version, LuckyCookieStat.gameVersion)) {
		Game.registerMod(LuckyCookieStat.id, LuckyCookieStat);
	}
};

// Load up everything
if (!LuckyCookieStat.isLoaded) {
	if (CCSE && CCSE.isLoaded) {
		LuckyCookieStat.launch();
	} else {
		if (!CCSE) var CCSE = {};
		if (!CCSE.postLoadHooks) CCSE.postLoadHooks = [];

		CCSE.postLoadHooks.push(LuckyCookieStat.launch);
	}
}
