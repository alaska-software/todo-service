# Setting up iOS Development Environment on macOS

This guide provides step-by-step instructions for setting up and running the mobile 
application on iOS devices using macOS. It covers the installation of required tools, 
project setup, building the app in both debug and release modes, 
and deploying to iOS simulators or physical devices.

## Prerequisites

1. Install Xcode from App Store
2. Install Homebrew
3. Install SVN client
```bash
brew install subversion
``````
4. Install Node.js
```bash
brew install node
```

5. Install Quasar CLI
```bash
npm install -g @quasar/cli
```

6. Install Cordova
```bash
npm install -g cordova
```

7. Enable Xcode command-line tools for Cordova
```bash
xcode-select --install
```

8. Install deployment tools
```bash
brew install ios-deploy
brew install cocoapods
```

9. Install CocoaPods tools (needed to build iOS apps)
```bash
xcode-select --install
```

## Project

1. Check out or update the project
```bash
cd /path/to/your/project/frontend
svn checkout --username <username> http://<path to repository>/frontend
# or
svn update
```

2. Install project dependencies
```bash
npm ci
```

3. Check cordova requirements
```bash
cd src-cordova
cordova requirements
```

4. Add ios platform
```bash
cd src-cordova
cordova platform add ios
```

## Add iOS simulators

To add iOS simulators for testing the app:

1. Open Xcode
2. Go to **Window** > **Devices and Simulators**
3. Click the **Simulators** tab
4. Click the **+** button in the bottom left corner
5. Select the desired iOS version and device type (e.g., iPhone 14, iPad Pro)
6. Click **Create**

Alternatively, you can list available simulators using:
```bash
xcrun simctl list devices
```

## Build for iOS
### In Debug mode
```bash
cordova build ios --buildFlag="DEVELOPMENT_TEAM=<TeamID>"
```

\<TeamID\> is your Apple Developer Team ID.

### In Release mode
```bash
cordova build ios --buildFlag="DEVELOPMENT_TEAM=<TeamID>" --buildFlag='PACKAGE_TYPE=<packageType>'
```

## Run on an iOS emulator
```bash
cordova run --emulator ios --buildFlag="DEVELOPMENT_TEAM=<TeamID>"
```

## Run on an iOS device
```bash
cordova run --device ios --buildFlag="DEVELOPMENT_TEAM=<TeamID>"
```

## build.json

The `build.json` file is an alternative to the `--buildFlag` option. 
It allows you to specify build configurations for iOS without passing them 
as command-line arguments each time. Create this file in the `src-cordova` directory:

```json
{
  "ios": {
    "debug": {
      "buildFlag": [
        "DEVELOPMENT_TEAM=<TeamID>"
      ]
    },
    "release": {
      "buildFlag": [
        "DEVELOPMENT_TEAM=<TeamID>",
        "PACKAGE_TYPE=<packageType>"
      ]
    }
  }
}
```

Replace `<TeamID>` with your Apple Developer Team ID and `<packageType>` with your desired package type (e.g., `app-store`, `ad-hoc`, `enterprise`, or `development`).

With this file in place, you can run simplified commands:
```bash
cordova build ios --debug
cordova build ios --release
```
