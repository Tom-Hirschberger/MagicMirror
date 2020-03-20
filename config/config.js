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
			position: "top_left"
		},
		{
			module: 'MMM-ViewNotifications',
			position: 'bottom_left',
			header: 'Notifications',
			config: {
				timeout: 0,
				format: '{time}: "{module}" sent "{notification}" with {payloadData}', // See below for configurable options
				excludeModules: ["clock"]
			}
		},
		{ 
			module: 'MMM-GPIO-Notifications',
			config: {
			  '17': {
				gpio_state: 1, 
				gpio_debounce: 0,
				notifications: [
				  { 
					notification: 'USER_PRESENCE',
					payload: true
				  },
				  { 
					notification: 'SCREEN_ON', 
					payload: { 'forced': false }
				  }
				]
			  }
			}
		},
		{                   
			module: 'MMM-Screen-Powersave-Notification',
			config: {                 
			  delay: 3200
			}
		},
		{
			module: 'MMM-Serial-Notifications',
			config: {
				devices: {
					'/dev/ard_mega': {
						messages: {
							'In_Distance (1)': [
								{
									notification: 'SCREEN_TOGGLE',
									payload: {
										forced: true
									}
								},
								{
									notification: 'USER_PRESENCE',
									payload: true
								}
							],
							'In_Distance (2)': [
								{
									notification: 'VOLUME_TOGGLE',
									payload: {
										faded: true,
										upDownScale: 8
									}
								},
								{
									notification: 'USER_PRESENCE',
									payload: true
								}
							],
						}
					},
					'/dev/ard_uno': {
						messages: {
							'Gesture: UP': [
								{
									notification: 'VOLUME_UP',
									payload: {
										upDownScale: 5
									}
								},
								{
									notification: 'USER_PRESENCE',
									payload: true
								}
							],
							'Gesture: DOWN': [
								{
									notification: 'VOLUME_DOWN',
									payload: {
										upDownScale: 8
									}
								},
								{
									notification: 'USER_PRESENCE',
									payload: true
								}
							]
						}
					}
				}
			}
		},
		{
			module: "MMM-Volume",
			position: "top_left", // It is meaningless. but you should set.
			config: {
			  usePresetScript: "HIFIBERRY-DAC",
			  // When set to `null`, `getVolumeScript` and `setVolumeScript` will be used directly. See the experts section.
			  // For available presetScript, See `presetScript{}`
		  
			  upDownScale: 5,
			  // for VOLUME_UP or VOLUME_DOWN.
		  
			  volumeOnStart: 10,
			  // If you set this, this volume will be applied on start of MagicMirror
		  
			  volumeText: "Vol: #VOLUME#%",
			  // Showing volume.
		  
			  hideDelay: 2000,
			  // After X milliseconds from showing, volume gain-meter will be disappeared.
		  
			  fadeDelay: 200,
			  // If the volume is restored with a fade effect this time in milliseconds will be waited between to scales
			  // volume control scripts for Other systems. If you set null to `usePresetScript`, these fields will be used instead.
		  
			   presetScript: {
				"HIFIBERRY-DAC": {
				  getVolumeScript: `amixer sget 'Digital' | grep -E -o '[[:digit:]]+%' | head -n 1| sed 's/%//g'`, // get 0~100
				  setVolumeScript: `amixer sset -M 'Digital' #VOLUME#%`, // set 0~100
				},
			  },
			}
		  },
	]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
