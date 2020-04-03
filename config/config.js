/* Magic Mirror Config Sample
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 *
 * For more information how you can configurate this file
 * See https://github.com/MichMich/MagicMirror#configuration
 *
 */

var config = {
	address: "0.0.0.0", // Address to listen on, can be:
	                      // - "localhost", "127.0.0.1", "::1" to listen on loopback interface
	                      // - another specific IPv4/6 to listen on a specific interface
	                      // - "", "0.0.0.0", "::" to listen on any interface
	                      // Default, when address config is left out, is "localhost"
	port: 8080,
	ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1", "10.84.86.0/24"], // Set [] to allow all IP addresses
	                                                       // or add a specific IPv4 of 192.168.1.5 :
	                                                       // ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
	                                                       // or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
	                                                       // ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

	language: "de",
	timeFormat: 24,
	units: "metric",
	// serverOnly:  true/false/"local" ,
			     // local for armv6l processors, default
			     //   starts serveronly and then starts chrome browser
			     // false, default for all  NON-armv6l devices
			     // true, force serveronly mode, because you want to.. no UI on this device

	modules: [
		{
			module: "MMM-Remote-Control",
		},
		{
			module: "clock",
			position: "top_left",
			classes: "pageOneEveryone pageOneTom pageTwoEveryone pageTwoTom"
		},
		{
			module: "MMM-DWD-Pollen",
			position: "bottom_right",
			header: "Pollenwarnung",
			config: {
				updateInterval: 1 * 60 * 60 * 1000, // every 1 hour1
				DWD_region: 121, // Rhein Main
				icon: true // Show icons or not
			},
			classes: "pageOneEveryone pageOneTom"
		},
		{
			module: "MMM-NOAA3",
			position: "top_right",
   			config: {
       			provider: "openweather", // From list above
      			apiKey: "e782f6f4b335b6eb9be6d381f0f32fdf", // From one of the providers listed above
       			airKey: "cda20bb9-fa31-499b-80be-c33cf1da088e",
       			css: "NOAA3", // THIS MUST CONTAIN A CSS STYLE NAME
   				userlat: "47.874074", //MUST HAVE BOTH
       			userlon: "11.465156", //MUST HAVE BOTH
			},
			classes: "pageOneEveryone pageOneTom"
		},
		{
			module: "MMM-Spotify",
			position: "top_center",
			config: {
			  style: "default", // "default" or "mini" available
			  control: "default", //"default", "hidden" available
			  updateInterval: 2000,
			  onStart: null, // disable onStart feature with `null`
			},
			classes: "pageTwoEveryone"
		},
		{
			module: "MMM-CalendarExt2",
			config: {
				calendars : [
					{
						name: "c_hirschhubers",
						className: "c_hirschhubers",
						url: "https://calendar.google.com/calendar/ical/hirschhubers%40gmail.com/private-79c4d0ea4d543f4868c34addd5990f69/basic.ics",
					},
					{
						name: "c_tom",
						className: "c_tom",
						url: "https://calendar.google.com/calendar/ical/wishmaster270%40gmail.com/private-998b105b96a8744b07ea07280e14477d/basic.ics",
					},
			  	],
				views: [
					{
						name: "v_upcoming_hirschhubers",
						mode: "upcoming",
						hideOverflow: false,
						maxItems: 15,
						useEventTimeRelative: false,
						positionOrder: 2,
						position: "top_center",
						calendars: ["c_hirschhubers"],
					},
					{
						name: "v_upcoming_both",
						mode: "upcoming",
						hideOverflow: false,
						maxItems: 15,
						useEventTimeRelative: false,
						positionOrder: 2,
						position: "top_center",
						calendars: ["c_hirschhubers", "c_tom"],
					},
					{
						name: "v_month_hirschhubers",
						mode: "month",
						hideOverflow: false,
						slotMaxHeight: "130px",
						slotCount: 5,
						position: "top_bar",
						calendars: ["c_hirschhubers"],
					},
					{
						name: "v_month_both",
						mode: "month",
						hideOverflow: false,
						slotMaxHeight: "130px",
						slotCount: 5,
						position: "top_bar",
						calendars: ["c_hirschhubers", "c_tom"],
					},
			  	],
			  	scenes: [
					{
						name: "pageOneEveryone",
						views: ["v_upcoming_hirschhubers"],
					},
					{
						name: "pageOneTom",
						views: ["v_upcoming_both"],
					},
					{
						name: "pageThreeEveryone",
						views: ["v_month_hirschhubers"],
					},
					{
						name: "pageThreeTom",
						views: ["v_month_both"],
					},
				],
				notifications: {
					"CHANGED_PROFILE" : {
					  exec: "changeSceneByName",
					  payload: (payload) => {return payload.to}
					}
				},
			},
			classes: "pageOneEveryone pageOneTom pageThreeEveryone pageThreeTom"
		},
		{
			module: "MMM-Volume",
			position: "top_left", // It is meaningless. but you should set.
			config: {
			  usePresetScript: "HIFIBERRY-DAC",
			  volumeOnStart: null,
			}
		},
		{
			module: "MMM-ViewNotifications",
			position: "bottom_bar",
			header: "Notifications",
			config: {
				timeout: 0,
				format: "{time}: \"{module}\" sent \"{notification}\" with {payloadData}", // See below for configurable options
				includeModules: ["MMM-CalendarExt2"]
			},
			classes: "pageTwoTom",
		},
		{
			module: "MMM-Screen-Powersave-Notification",
			config: {
			  delay: 300
			}
		},
		{
			module: "MMM-GPIO-Notifications",
			config: {
			  "23": {
					gpio_state: 1,
					delay: 5000,
					gpio_debounce: 100,
					notifications: [
				  {
							notification: "USER_PRESENCE",
							payload: true
				  },
				  {
							notification: "SCREEN_ON",
							payload: { "forced": false }
				  }
					]
			  },
			  "24": {
					gpio_state: 1,
					delay: 5000,
					gpio_debounce: 100,
					notifications: [
				  {
							notification: "USER_PRESENCE",
							payload: true
				  },
				  {
							notification: "SCREEN_ON",
							payload: { "forced": false }
				  }
					]
			  },
			  "25": {
					gpio_state: 1,
					delay: 5000,
					gpio_debounce: 100,
					notifications: [
				  {
							notification: "USER_PRESENCE",
							payload: true
				  },
				  {
							notification: "SCREEN_ON",
							payload: { "forced": false }
				  }
					]
			  }
			},
		},
		{
			module: "MMM-Serial-Notifications",
			config: {
				devices: {
					"/dev/ard_nano_1": {
						//APDS-9960 and three VL53L1X
						//Gesture: UP
						//VL53L1X0: HIT
						//AmbientLight: 1234
						messages: {
							"Gesture: LEFT": [
								{
									notification: "PROFILE_DECREMENT_HORIZONTAL",
								}
							],
							"Gesture: RIGHT": [
								{
									notification: "PROFILE_INCREMENT_HORIZONTAL",
								}
							],
							"Gesture: UP": [
								{
									notification: "PROFILE_DECREMENT_VERTICAL",
								}
							],
							"Gesture: DOWN": [
								{
									notification: "PROFILE_INCREMENT_VERTICAL",
								}
							],
							"VL53L1X2": [
								{
									notification: "SCREEN_TOGGLE",
									payload: { forced: true },
								}
							],
						}
					},
					"/dev/ard_nano_2": {
						//APDS-9960 and five VL53L0X
						//Gesture: UP
						//VL53L0X0: HIT
						//AmbientLight: 1234
						messages: {
							"Gesture: LEFT": [
								{
									notification: "VOLUME_UP",
									payload: {
										upDownScale: 5
									}
								},
								{
									notification: "USER_PRESENCE",
									payload: true
								}
							],
							"Gesture: RIGHT": [
								{
									notification: "VOLUME_DOWN",
									payload: {
										upDownScale: 8,
									}
								},
								{
									notification: "USER_PRESENCE",
									payload: true,
								},
							],
							"Gesture: UP": [
								{
									notification: "VOLUME_TOGGLE",
									payload: {
										faded: true,
									},
								},
							],
							"Gesture: DOWN": [
								{
									notification: "VOLUME_TOGGLE",
									payload: {
										faded: false,
									},
								},
							],
							"VL53L0X0": [
								{
									notification: "SPOTIFY_PREVIOUS",
								}
							],
							"VL53L0X1": [
								{
									notification: "SPOTIFY_TOGGLE",
								}
							],
							"VL53L0X2": [
								{
									notification: "SPOTIFY_NEXT",
								}
							],
							"VL53L0X3": [
								{
									notification: "SPOTIFY_SHUFFLE",
								}
							],
							"VL53L0X4": [
								{
									notification: "SPOTIFY_REPEAT",
								}
							],
						}
					},
				}
			}
		},
		{
			module: "MMM-ProfileControl",
			position: "bottom_bar",
			config: {
				profiles: [
					["pageOneEveryone", "pageOneTom"],
					["pageTwoEveryone", "pageTwoTom"],
					["pageThreeEveryone", "pageThreeTom"],
				],
			}
		},
		{
			module: "MMM-ProfileSwitcher",
			config: {
				defaultClass: "pageOneEveryone",
				ignoreModules: [
					"MMM-Remote-Control",
					"MMM-Screen-Powersave-Notification",
					"MMM-GPIO-Notifications",
					"MMM-Serial-Notifications",
					"MMM-Volume",
					"MMM-ProfileControl"
				],
			}
		},
	]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
