// Object instantiation
if (BipBoop === undefined) var BipBoop = {};
BipBoop.id = "BipBoop";
BipBoop.name = "Bip Boop";
BipBoop.version = "1.2";
BipBoop.gameVersion = "2.052";
BipBoop.soundsList = [ "metal_pipe", "aeugh" ];
BipBoop.sounds = {};
BipBoop.isLoaded = false;

// Fetch CCSE if not installed
if (typeof CCSE == "undefined") Game.LoadMod("https://klattmose.github.io/CookieClicker/CCSE.js");

// Mod definition
BipBoop.launch = function () {
	BipBoop.toReadableName = function (soundName) {
		var name = soundName.replaceAll("_", " ");
		name = name.charAt(0).toUpperCase() + name.slice(1);

		return name;
	};

	BipBoop.init = function () {
		// Add the new sounds to the game
		var basePath = CCSE.Steam
				? `${CCSE.GetModPath(BipBoop.id)}/assets`
				: "https://empiredemocratiquedupoulpe.github.io/CookieClickerMods/BipBoop/assets";

		for (var idx = 0; idx < BipBoop.soundsList.length; idx++) {
			// Get the paths
			var soundName = BipBoop.soundsList[idx];
			BipBoop.sounds[soundName] = { icon_path: `${basePath}/images/${soundName}.png`, sound_path: `${basePath}/sounds/${soundName}.mp3` };

			// Add the sound
			CCSE.NewShimmerSoundSelection(
					BipBoop.toReadableName(soundName),
					[0, 0, BipBoop.sounds[soundName].icon_path],
					BipBoop.sounds[soundName].sound_path
			);
		}

		// Add the mod version to the Stats page
		Game.customStatsMenu.push(function() {
			CCSE.AppendStatsVersionNumber(BipBoop.name, BipBoop.version);
		});

		// End of initialization
		BipBoop.isLoaded = true;
		console.log(`${BipBoop.name} isLoaded!`);
	};

	// Register the mod
	if (CCSE.ConfirmGameVersion(BipBoop.name, BipBoop.version, BipBoop.gameVersion)) {
		Game.registerMod(BipBoop.id, BipBoop);
	}
};

// Load up everything
if (!BipBoop.isLoaded) {
	if (CCSE && CCSE.isLoaded) {
		BipBoop.launch();
	} else {
		if (!CCSE) var CCSE = {};
		if (!CCSE.postLoadHooks) CCSE.postLoadHooks = [];

		CCSE.postLoadHooks.push(BipBoop.launch);
	}
}
